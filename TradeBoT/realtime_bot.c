#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <windows.h>
#include <math.h>

#define MAX_ROWS 500
#define MAX_TICKERS 10
#define TICKER_LEN 10
#define TIMESTAMP_LEN 20
#define MIN_DATA_POINTS 26 // Minimum 26 bar for EMA26
#define WARMUP_PERIOD 50   // Ilk 50 bar dusuk guven (warm-up period)
#define BALANCE 10000.0    // Baslangic bakiyesi
#define RISK_PERCENT 0.01  // Hesabin %1'i risk

typedef struct
{
    char timestamp[TIMESTAMP_LEN];
    float prices[MAX_TICKERS];
} DataPoint;

typedef struct
{
    char name[TICKER_LEN];
    int index;
} Ticker;

// Renk kodlari
void setColor(int color)
{
    HANDLE hConsole = GetStdHandle(STD_OUTPUT_HANDLE);
    SetConsoleTextAttribute(hConsole, color);
}

// EMA hesaplama (Exponential Moving Average)
// Gercek EMA: history basindan hesapla
float calculateEMA(float prices[], int count, int period)
{
    if (count < period)
        return prices[count - 1];

    float k = 2.0f / (period + 1.0f);

    // Ilk EMA = ilk 'period' barın SMA'si
    float ema = 0;
    for (int i = 0; i < period; i++)
    {
        ema += prices[i];
    }
    ema /= period;

    // Sonra EMA iterasyonu: period'dan count'a kadar
    for (int i = period; i < count; i++)
    {
        ema = prices[i] * k + ema * (1 - k);
    }
    return ema;
}

// Pseudo-ATR hesaplama (sadece close data oldugu icin)
// Gercek ATR OHLC gerektirir, bu close-to-close abs change ortalamasidir
// Yine de volatilite proxy'si olarak SL/TP hesaplamada kullanilabilir
float calculateATR(float prices[], int count, int period)
{
    if (count < 2)
        return 0;

    float trSum = 0;
    int validCount = 0;

    // Negatif index riskini onle
    int start = count - period;
    if (start < 1)
        start = 1;

    for (int i = start; i < count; i++)
    {
        float tr = fabs(prices[i] - prices[i - 1]);
        trSum += tr;
        validCount++;
    }
    return validCount > 0 ? trSum / validCount : 0;
}

// RSI hesaplama (Relative Strength Index)
float calculateRSI(float prices[], int count, int period)
{
    if (count < period + 1)
        return 50.0;

    float gains = 0, losses = 0;

    for (int i = count - period; i < count; i++)
    {
        if (i < 1)
            continue;
        float change = prices[i] - prices[i - 1];
        if (change > 0)
            gains += change;
        else
            losses += fabs(change);
    }

    float avgGain = gains / period;
    float avgLoss = losses / period;

    if (avgLoss == 0)
        return 100.0;

    float rs = avgGain / avgLoss;
    return 100.0 - (100.0 / (1.0 + rs));
}

// Log return bazli volatilite
float calculateVolatility(float prices[], int count, int period)
{
    if (count < period || period < 2)
        return 0;

    // Buffer boyutu period ile sinirli (max 100)
    int bufferSize = period < 100 ? period : 100;
    float logReturns[100];
    int n = 0;

    for (int i = count - period; i < count && n < bufferSize; i++)
    {
        if (i < 1)
            continue;
        if (prices[i - 1] > 0)
        {
            logReturns[n++] = log(prices[i] / prices[i - 1]);
        }
    }

    if (n < 2)
        return 0;

    // Mean
    float mean = 0;
    for (int i = 0; i < n; i++)
        mean += logReturns[i];
    mean /= n;

    // Variance
    float variance = 0;
    for (int i = 0; i < n; i++)
    {
        float diff = logReturns[i] - mean;
        variance += diff * diff;
    }
    variance /= (n - 1);

    // Standard deviation (volatility)
    return sqrt(variance) * 100; // Yuzde cinsinden
}

// Breakout detection
int detectBreakout(float prices[], int count, int lookback)
{
    if (count < lookback + 1)
        return 0;

    float currentPrice = prices[count - 1];
    int start = count - lookback;
    float highest = prices[start];
    float lowest = prices[start];

    // Son lookback bar'daki en yuksek/dusuk (current haric)
    for (int i = start; i < count - 1; i++)
    {
        if (prices[i] > highest)
            highest = prices[i];
        if (prices[i] < lowest)
            lowest = prices[i];
    }

    if (currentPrice > highest * 1.001) // %0.1 uzerinde
        return 1;                       // Upward breakout
    if (currentPrice < lowest * 0.999)  // %0.1 altinda
        return -1;                      // Downward breakout

    return 0;
}

// Signal Score sistemi - Profesyonel bot beyni
float calculateSignalScore(float prices[], int count, float *ema12, float *ema26, float *rsi, float *atr, float *volatility)
{
    if (count < MIN_DATA_POINTS)
        return 0;

    *ema12 = calculateEMA(prices, count, 12);
    *ema26 = calculateEMA(prices, count, 26);
    *rsi = calculateRSI(prices, count, 14);
    *atr = calculateATR(prices, count, 14);
    *volatility = calculateVolatility(prices, count, 20);

    float score = 0;
    float currentPrice = prices[count - 1];

    // 1. Trend skoru (EMA crossover)
    if (*ema12 > *ema26 * 1.001) // %0.1 uzerinde
        score += 1.0;
    else if (*ema12 < *ema26 * 0.999) // %0.1 altinda
        score -= 1.0;

    // 2. Momentum skoru (RSI)
    if (*rsi < 30)
        score += 1.0; // Oversold - alim firsati
    else if (*rsi > 70)
        score -= 1.0; // Overbought - satim firsati
    else if (*rsi > 40 && *rsi < 60)
        score += 0.3; // Notr bolge - hafif pozitif

    // 3. Breakout skoru
    int breakout = detectBreakout(prices, count, 20);
    score += breakout * 0.8;

    // 4. Fiyat-EMA pozisyonu
    float priceToEMA12 = (currentPrice - *ema12) / *ema12 * 100;
    if (priceToEMA12 > 1.0)
        score += 0.5; // Fiyat EMA12'nin uzerinde
    else if (priceToEMA12 < -1.0)
        score -= 0.5;

    // 5. Volatilite cezasi
    if (*volatility > 3.0)      // Yuksek volatilite
        score *= 0.7;           // Skoru azalt
    else if (*volatility < 1.0) // Dusuk volatilite
        score *= 1.1;           // Skoru artir

    return score;
}

// Risk yonetimi - Stop Loss & Take Profit
// direction: 1 = LONG (alim), -1 = SHORT (satim)
void calculateRiskManagement(float entryPrice, float atr, float *stopLoss, float *takeProfit, float *positionSize, float riskRewardRatio, int direction)
{
    if (direction == 1) // LONG
    {
        // Stop Loss: entry - 2*ATR
        *stopLoss = entryPrice - (2.0 * atr);
        if (*stopLoss < 0)
            *stopLoss = entryPrice * 0.95; // En az %5 stop

        // Take Profit: entry + (riskRewardRatio * risk)
        float risk = entryPrice - *stopLoss;
        *takeProfit = entryPrice + (risk * riskRewardRatio);

        // Position size hesaplama
        if (risk > 0)
        {
            float riskAmount = BALANCE * RISK_PERCENT;
            *positionSize = riskAmount / risk;
        }
        else
        {
            *positionSize = 0;
        }
    }
    else // SHORT
    {
        // Stop Loss: entry + 2*ATR (yukarida)
        *stopLoss = entryPrice + (2.0 * atr);

        // Take Profit: entry - (riskRewardRatio * risk)
        float risk = *stopLoss - entryPrice;
        *takeProfit = entryPrice - (risk * riskRewardRatio);

        // TP guvenlik kontrolu: minimum %0.5 asagida olmali
        float minTP = entryPrice * 0.995; // %0.5 minimum
        if (*takeProfit > minTP)
            *takeProfit = minTP;

        // Position size hesaplama
        if (risk > 0)
        {
            float riskAmount = BALANCE * RISK_PERCENT;
            *positionSize = riskAmount / risk;
        }
        else
        {
            *positionSize = 0;
        }
    }
}

// Ana karar fonksiyonu
void giveTradeAdvice(float prices[], int count, char *advice, float *expectedProfit, float *stopLoss, float *takeProfit, float *positionSize, int *isLowConfidence, int *direction)
{
    // Guvenlik: parametreleri baslatma
    *isLowConfidence = 0;
    *direction = 0; // Default: no position

    if (count < MIN_DATA_POINTS)
    {
        sprintf(advice, "VERI BEKLENIYOR");
        *expectedProfit = 0;
        *stopLoss = 0;
        *takeProfit = 0;
        *positionSize = 0;
        return;
    }

    // Warm-up period: ilk 50 bar'da dusuk guven
    if (count < WARMUP_PERIOD)
    {
        *isLowConfidence = 1;
    }

    float ema12, ema26, rsi, atr, volatility;
    float score = calculateSignalScore(prices, count, &ema12, &ema26, &rsi, &atr, &volatility);

    float currentPrice = prices[count - 1];
    float riskRewardRatio = 1.5; // 1:1.5 risk/reward

    // Once advice belirle, sonra direction
    *direction = 0; // Default: BEKLE (no position)
    *expectedProfit = 0;
    *positionSize = 0;

    // Signal score'a gore karar ve direction belirleme
    if (score >= 2.5)
    {
        sprintf(advice, "GUCLU ALIM [^^^]");
        *direction = 1; // LONG
    }
    else if (score >= 1.5)
    {
        sprintf(advice, "ALIM [++]");
        *direction = 1; // LONG
    }
    else if (score >= 0.5)
    {
        sprintf(advice, "ZAYIF ALIM [+]");
        *direction = 1; // LONG
    }
    else if (score <= -2.5)
    {
        sprintf(advice, "GUCLU SATIM [vvv]");
        *direction = -1; // SHORT
    }
    else if (score <= -1.5)
    {
        sprintf(advice, "SATIM [--]");
        *direction = -1; // SHORT
    }
    else if (score <= -0.5)
    {
        sprintf(advice, "ZAYIF SATIM [-]");
        *direction = -1; // SHORT
    }
    else
    {
        sprintf(advice, "BEKLE [==]");
        *direction = 0; // NO POSITION
        *expectedProfit = 0;
        *positionSize = 0;
        return; // BEKLE durumunda risk hesaplamasina gerek yok
    }

    // Sadece islem varsa risk yonetimi hesapla
    calculateRiskManagement(currentPrice, atr, stopLoss, takeProfit, positionSize, riskRewardRatio, *direction);

    // Beklenen kar hesaplama
    if (*direction == 1) // LONG
    {
        if (*takeProfit > currentPrice)
        {
            *expectedProfit = ((*takeProfit - currentPrice) / currentPrice) * 100;
        }

        // Guven carpanlari
        if (score >= 2.5)
            *expectedProfit *= 1.2;
        else if (score >= 0.5 && score < 1.5)
            *expectedProfit *= 0.7;
    }
    else if (*direction == -1) // SHORT
    {
        if (*takeProfit < currentPrice)
        {
            *expectedProfit = ((currentPrice - *takeProfit) / currentPrice) * 100;
        }

        // Guven carpanlari
        if (score <= -2.5)
            *expectedProfit *= 1.2;
        else if (score <= -0.5 && score > -1.5)
            *expectedProfit *= 0.7;
    }
}

int main()
{
    FILE *file;
    char line[1024];
    DataPoint data[MAX_ROWS];
    Ticker tickers[MAX_TICKERS];
    int rowCount = 0;
    int tickerCount = 0;
    int selectedTicker;

    // CSV dosyasini ac
    file = fopen("fake_stocks_10tickers_10days_10min.csv", "r");
    if (file == NULL)
    {
        printf("CSV dosyasi bulunamadi!\n");
        return 1;
    }

    // Baslik satirini oku ve ticker isimlerini al
    if (!fgets(line, sizeof(line), file))
    {
        printf("CSV dosyasi bos!\n");
        fclose(file);
        return 1;
    }

    // Ilk token Timestamp header'i - atla
    char *token = strtok(line, ",");
    if (token == NULL)
    {
        printf("CSV format hatasi!\n");
        fclose(file);
        return 1;
    }

    // Simdi ticker isimlerini oku
    token = strtok(NULL, ","); // Ilk ticker (NCPR)

    while (token != NULL && tickerCount < MAX_TICKERS)
    {
        // Satir sonu karakterlerini temizle
        int len = strlen(token);
        while (len > 0 && (token[len - 1] == '\n' || token[len - 1] == '\r'))
        {
            token[len - 1] = '\0';
            len--;
        }
        strcpy(tickers[tickerCount].name, token);
        tickers[tickerCount].index = tickerCount;
        tickerCount++;
        token = strtok(NULL, ",");
    }

    if (tickerCount == 0)
    {
        printf("Hisse senedi bulunamadi!\n");
        fclose(file);
        return 1;
    }

    // Veri satirlarini oku
    while (fgets(line, sizeof(line), file) && rowCount < MAX_ROWS)
    {
        token = strtok(line, ",");
        if (token == NULL)
            continue;

        strcpy(data[rowCount].timestamp, token);

        int validRow = 1;
        for (int i = 0; i < tickerCount; i++)
        {
            token = strtok(NULL, ",");
            if (token == NULL)
            {
                validRow = 0;
                break;
            }
            data[rowCount].prices[i] = atof(token);

            // Gecersiz fiyat kontrolu
            if (data[rowCount].prices[i] <= 0)
            {
                validRow = 0;
                break;
            }
        }

        if (validRow)
            rowCount++;
    }
    fclose(file);

    if (rowCount == 0)
    {
        printf("Gecerli veri bulunamadi!\n");
        return 1;
    }

    // Hos geldin mesaji
    system("cls");
    setColor(11); // Acik mavi
    printf("======================================================\n");
    printf("     GERCEK ZAMANLI BORSA TRADING BOT v1.0\n");
    printf("======================================================\n\n");
    setColor(7); // Beyaz

    // YASAL UYARI / DISCLAIMER
    setColor(12); // Kirmizi
    printf("*** ONEMLI UYARI ***\n");
    setColor(14); // Sari
    printf("1. Bu program yalnizca EGITIM amaclidir.\n");
    printf("2. Kullanilan veriler SIMULASYON ve FAKE'tir (gercek degil).\n");
    printf("3. Bu sistem YATIRIM TAVSIYESI vermez.\n");
    printf("4. Gercek yatirim kararlari icin lisansli danismanlara basvurun.\n");
    printf("5. Mali kayiplardan program sorumlu degildir.\n");
    setColor(12);
    printf("\n[!] Devam ederek bu sartlari kabul ediyorsunuz.\n");
    setColor(7);
    printf("\n");
    system("pause");
    system("cls");

    setColor(11);
    printf("======================================================\n");
    printf("     GERCEK ZAMANLI BORSA TRADING BOT v1.0\n");
    printf("     [SIMULASYON MODU - FAKE DATA]\n");
    printf("======================================================\n\n");
    setColor(7);

    // Ticker listesi
    printf("Mevcut Hisse Senetleri:\n\n");
    for (int i = 0; i < tickerCount; i++)
    {
        setColor(10); // Yeşil
        printf("  [%d] %s\n", i + 1, tickers[i].name);
    }

    setColor(14); // Sari
    printf("\nAnaliz etmek istediginiz hisseyi secin: ");
    setColor(7);
    scanf("%d", &selectedTicker);

    if (selectedTicker < 1 || selectedTicker > tickerCount)
    {
        printf("Gecersiz secim!\n");
        return 1;
    }
    selectedTicker--; // 0-indexed

    system("cls");
    setColor(11);
    printf("======================================================\n");
    printf("     CANLI TRADING: %s [SIMULASYON]\n", tickers[selectedTicker].name);
    printf("======================================================\n");
    setColor(12);
    printf("[UYARI] FAKE DATA - YATIRIM TAVSIYESI DEGILDIR\n");
    setColor(7);
    printf("\n");

    printf("[TIME] Her 10 saniye = 10 dakikalik gercek veri\n");
    printf("[INFO] Ilk 260 saniye (26 veri) bekleniyor, sonra analiz basliyor...\n");
    printf("[WARM] Ilk %d veri noktasi 'LOW CONFIDENCE' olarak isaretlenir\n", WARMUP_PERIOD);
    printf("[RISK] Hesap bakiyesi: $%.2f | Risk/islem: $%.2f\n\n", BALANCE, BALANCE * RISK_PERCENT);
    Sleep(2000);

    // Gerçek zamanlı simülasyon
    float priceHistory[MAX_ROWS];
    int currentDataPoint = 0;

    for (int i = 0; i < rowCount; i++)
    {
        currentDataPoint++;
        priceHistory[i] = data[i].prices[selectedTicker];

        // Zaman ve fiyat bilgisi
        setColor(14); // Sari
        printf("[ZAMAN] %s\n", data[i].timestamp);
        setColor(15); // Parlak beyaz
        printf("[FIYAT] %.2f\n", priceHistory[i]);

        // Değişim yüzdesi
        if (i > 0)
        {
            float change = ((priceHistory[i] - priceHistory[i - 1]) / priceHistory[i - 1]) * 100;
            if (change > 0)
            {
                setColor(10); // Yesil
                printf("[UP] Degisim: +%.2f%%\n", change);
            }
            else if (change < 0)
            {
                setColor(12); // Kirmizi
                printf("[DOWN] Degisim: %.2f%%\n", change);
            }
            else
            {
                setColor(7);
                printf("[=] Degisim: %.2f%%\n", change);
            }
        }

        // Analiz ve tavsiye
        if (currentDataPoint >= MIN_DATA_POINTS)
        {
            char advice[50];
            float expectedProfit, stopLoss, takeProfit, positionSize;
            int isLowConfidence, direction;
            giveTradeAdvice(priceHistory, currentDataPoint, advice, &expectedProfit, &stopLoss, &takeProfit, &positionSize, &isLowConfidence, &direction);

            // Indikatörleri hesapla
            float ema12 = calculateEMA(priceHistory, currentDataPoint, 12);
            float ema26 = calculateEMA(priceHistory, currentDataPoint, 26);
            float rsi = calculateRSI(priceHistory, currentDataPoint, 14);
            float atr = calculateATR(priceHistory, currentDataPoint, 14);
            float volatility = calculateVolatility(priceHistory, currentDataPoint, 20);
            float score = calculateSignalScore(priceHistory, currentDataPoint, &ema12, &ema26, &rsi, &atr, &volatility);

            setColor(11); // Acik mavi
            printf("\n--- TEKNIK ANALIZ ---\n");
            setColor(7);
            printf("EMA(12): %.2f | EMA(26): %.2f\n", ema12, ema26);
            printf("RSI(14): %.2f | ATR(14): %.2f\n", rsi, atr);
            printf("Volatilite: %.2f%% | Signal Score: %.2f\n", volatility, score);

            setColor(13); // Magenta
            printf("\n[BOT] TAVSIYE (SIMULASYON): ");

            // Low confidence uyarisi
            if (isLowConfidence)
            {
                setColor(14);
                printf("[LOW CONFIDENCE] ");
            }

            if (strstr(advice, "GUCLU ALIM"))
            {
                setColor(10); // Yesil
            }
            else if (strstr(advice, "ALIM"))
            {
                setColor(11); // Açık mavi
            }
            else if (strstr(advice, "GUCLU SATIM"))
            {
                setColor(12); // Kirmizi
            }
            else if (strstr(advice, "SATIM"))
            {
                setColor(14); // Sarı
            }
            else
            {
                setColor(7); // Beyaz
            }
            printf("%s\n", advice);

            // Risk yonetimi bilgileri
            if (positionSize > 0)
            {
                setColor(11);
                printf("\n--- RISK YONETIMI ---\n");
                setColor(7);

                float entryPrice = priceHistory[currentDataPoint - 1];
                float riskPercent, targetPercent;

                // Long/Short'a gore risk hesaplama (direction flag'den)
                if (direction == 1) // LONG
                {
                    printf("Pozisyon: LONG (Alim)\n");
                    riskPercent = ((entryPrice - stopLoss) / entryPrice) * 100;
                    targetPercent = ((takeProfit - entryPrice) / entryPrice) * 100;
                }
                else // SHORT
                {
                    printf("Pozisyon: SHORT (Satim)\n");
                    riskPercent = ((stopLoss - entryPrice) / entryPrice) * 100;
                    targetPercent = ((entryPrice - takeProfit) / entryPrice) * 100;
                }

                printf("Giris Fiyati: %.2f\n", entryPrice);
                printf("Stop Loss: %.2f (Risk: %.2f%%)\n", stopLoss, riskPercent);
                printf("Take Profit: %.2f (Hedef: %.2f%%)\n", takeProfit, targetPercent);
                printf("Pozisyon Buyuklugu: %.2f lot\n", positionSize);

                if (expectedProfit > 0)
                {
                    setColor(10);
                    printf("[$] Beklenen Kar: +%.2f%%\n", expectedProfit);
                }
                else if (expectedProfit < 0)
                {
                    setColor(12);
                    printf("[$] Beklenen Kayip: %.2f%%\n", expectedProfit);
                }
                else
                {
                    setColor(7);
                    printf("[$] Notr pozisyon\n");
                }
            }
            else
            {
                setColor(14);
                printf("\n[!] Islem yapilmamali - bekle\n");
            }

            setColor(7);
        }
        else
        {
            setColor(14);
            printf("\n[WAIT] Analiz icin veri toplaniyor... (%d/%d)\n", currentDataPoint, MIN_DATA_POINTS);
        }

        setColor(8);
        printf("------------------------------------------------------\n");
        setColor(7);

        // 10 saniye bekle (gerçek zamanlı simülasyon)
        Sleep(10000);
    }

    // Ozet
    setColor(11);
    printf("\n\n======================================================\n");
    printf("              SIMULASYON TAMAMLANDI\n");
    printf("======================================================\n");
    setColor(7);
    printf("\nToplam %d veri noktasi analiz edildi.\n", rowCount);
    printf("Baslangic fiyati: %.2f\n", priceHistory[0]);
    printf("Son fiyat: %.2f\n", priceHistory[rowCount - 1]);
    float totalChange = ((priceHistory[rowCount - 1] - priceHistory[0]) / priceHistory[0]) * 100;
    if (totalChange > 0)
    {
        setColor(10);
        printf("Toplam degisim: +%.2f%%\n", totalChange);
    }
    else
    {
        setColor(12);
        printf("Toplam degisim: %.2f%%\n", totalChange);
    }
    setColor(7);

    printf("\n");
    setColor(14);
    printf("*** HATIRLATMA ***\n");
    setColor(7);
    printf("Bu sonuclar SIMULASYON verileriyle uretilmistir.\n");
    printf("Gercek piyasa kosullarinda farkli sonuclar olusabilir.\n");
    printf("Yatirim kararlari icin profesyonel danismanlik alin.\n");
    setColor(12);
    printf("\n[!] Bu program YATIRIM TAVSIYESI degildir!\n");
    setColor(7);

    return 0;
}
