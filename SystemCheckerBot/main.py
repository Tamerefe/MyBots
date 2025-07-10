import psutil
import speedtest
import wmi
import uuid
import os
import time
from rich.progress import Progress, SpinnerColumn, TextColumn
from rich import print

def check_battery():
    battery = psutil.sensors_battery()
    if battery is not None:
        print(f"Battery: {battery.percent}%")
        print(f"Plugged: {battery.power_plugged}")
        
        def convert_time(seconds):
            minutes, seconds = divmod(seconds, 60)
            hours, minutes = divmod(minutes, 60)
            return f"{hours} hours, {minutes} minutes, {seconds} seconds"
        
        if battery.secsleft == psutil.POWER_TIME_UNLIMITED:
            print("Left: Charging")
        elif battery.secsleft == psutil.POWER_TIME_UNKNOWN:
            print("Left: Unknown")
        else:
            print(f"Left: {convert_time(battery.secsleft)}")
    else:
        print("Battery not found")

def get_speed():
    try:
        speed = speedtest.Speedtest()

        with Progress(
            SpinnerColumn(),
            TextColumn("[bold cyan]{task.description}"),
            transient=True,
        ) as progress:
            task = progress.add_task("Finding best server...", total=None)
            speed.get_best_server()
            progress.update(task, description="Best server found!")
            time.sleep(0.5)  

            task = progress.add_task("Testing download speed...", total=None)
            download_speed = speed.download()
            progress.update(task, description="Download speed test completed!")
            time.sleep(0.5)

            task = progress.add_task("Testing upload speed...", total=None)
            upload_speed = speed.upload()
            progress.update(task, description="Upload speed test completed!")
            time.sleep(0.5)

        ping = speed.results.ping

        print("\n[bold green]--- Speed Test Results ---[/bold green]")
        print(f"🚀 Download Speed: {download_speed / 1_000_000:.2f} Mbps")
        print(f"📤 Upload Speed: {upload_speed / 1_000_000:.2f} Mbps")
        print(f"📡 Ping: {ping} ms")
    except speedtest.ConfigRetrievalError:
        print("[bold red]Error:[/bold red] HTTP Error 403: Forbidden")
    except Exception as e:
        print(f"[bold red]Error:[/bold red] {e}")

def get_system_info():
    c = wmi.WMI()
    for os in c.Win32_OperatingSystem():
        print(f"OS: {os.Caption}\nArchitecture: {os.OSArchitecture}\nVersion: {os.Version}")

def get_mac_address():
    mac = uuid.UUID(int=uuid.getnode()).hex[-12:]
    print(f"MAC Address: {':'.join([mac[i:i+2] for i in range(0, 12, 2)])}")

def list_files():
    path = os.path.dirname(os.path.abspath(__file__))
    file_count = sum(len(filenames) for _, _, filenames in os.walk(path))
    print(f"Total Files: {file_count}")

def list_processes():
    print(f"{'PID':<10} {'Name':<40} {'Status':<10}")
    print("="*60)
    for proc in psutil.process_iter(['pid', 'name', 'status']):
        print(f"{proc.info['pid']:<10} {proc.info['name']:<40} {proc.info['status']:<10}")

def calculate_download_time():
    try:
        size_input = input("Dosya boyutunu girin (örn: 100MB, 2GB, 5000000B): ").strip().upper()
        if size_input.endswith("GB"):
            file_size = float(size_input[:-2]) * 1024 * 1024 * 1024
            size_str = f"{float(size_input[:-2])} GB"
        elif size_input.endswith("MB"):
            file_size = float(size_input[:-2]) * 1024 * 1024
            size_str = f"{float(size_input[:-2])} MB"
        elif size_input.endswith("KB"):
            file_size = float(size_input[:-2]) * 1024
            size_str = f"{float(size_input[:-2])} KB"
        elif size_input.endswith("B"):
            file_size = float(size_input[:-1])
            size_str = f"{float(size_input[:-1])} B"
        else:
            file_size = float(size_input)
            size_str = f"{file_size} B"

        speed_input = input("İndirme hızını girin (örn: 50Mbps, 100Kbps, 1Gbps): ").strip().upper()
        if speed_input.endswith("GBPS"):
            download_speed = float(speed_input[:-4]) * 1_000_000_000
            speed_unit = "Gbps"
        elif speed_input.endswith("MBPS"):
            download_speed = float(speed_input[:-4]) * 1_000_000
            speed_unit = "Mbps"
        elif speed_input.endswith("KBPS"):
            download_speed = float(speed_input[:-4]) * 1_000
            speed_unit = "Kbps"
        elif speed_input.endswith("BPS"):
            download_speed = float(speed_input[:-3])
            speed_unit = "bps"
        else:
            print("[bold red]Hız birimini doğru formatta girin! (ör: 50Mbps, 100Kbps, 1Gbps)[/bold red]")
            return

        # Doğru formül: Süre(saniye) = Dosya Boyutu (Bayt) * 8 / İndirme hızı (bit/saniye)
        seconds = file_size * 8 / download_speed
        minutes, sec = divmod(seconds, 60)
        hours, minutes = divmod(minutes, 60)
        
        print(f"\n[bold green]--- İndirme Süresi Hesabı ---[/bold green]")
        print(f"Dosya Boyutu: {size_str}")
        print(f"İndirme Hızı: {speed_input}")
        print(f"Tahmini Süre: {int(hours)} saat, {int(minutes)} dakika, {int(sec)} saniye")
        
        # Ek bilgiler
        if seconds < 60:
            print(f"Toplam Süre: {seconds:.2f} saniye")
        elif seconds < 3600:
            print(f"Toplam Süre: {minutes} dakika {sec} saniye")
        else:
            print(f"Toplam Süre: {hours} saat {minutes} dakika {sec} saniye")
            
    except ValueError:
        print("[bold red]Hata:[/bold red] Geçersiz sayı formatı!")
    except Exception as e:
        print(f"[bold red]Hata:[/bold red] {e}")

def main():
    while True:
        print("\n[bold cyan]System Status Checker Bot[/bold cyan]")
        print("1. Check Battery Status")
        print("2. Check Internet Speed")
        print("3. Get System Info")
        print("4. Get MAC Address")
        print("5. List Files in Directory")
        print("6. List Running Processes")
        print("7. Dosya İndirme Süresi Hesapla\n")
        print("8. Exit\n")
        
        choice = input("Enter your choice: ")
        
        if choice == "1":
            check_battery()
        elif choice == "2":
            get_speed()
        elif choice == "3":
            get_system_info()
        elif choice == "4":
            get_mac_address()
        elif choice == "5":
            list_files()
        elif choice == "6":
            list_processes()
        elif choice == "7":
            calculate_download_time()
        elif choice == "8":
            print("Exiting... Goodbye!")
            break
        else:
            print("Invalid choice, please try again.")

if __name__ == '__main__':
    main()
