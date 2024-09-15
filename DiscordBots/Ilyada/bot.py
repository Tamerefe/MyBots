import discord, random, asyncio
from discord.ext import commands
from colorama import Back, Fore, Style
from falthing import FortuneList

client = commands.Bot(intents=discord.Intents.all(), command_prefix='t!')

# 1. Hata Yönetimi (Error Handling)
@client.event
async def on_command_error(ctx, error):
    if isinstance(error, commands.CommandNotFound):
        await ctx.send("Üzgünüm, geçersiz bir komut girdin. Komutları görmek için `t!yardım` yazabilirsin.")
    elif isinstance(error, commands.MissingRequiredArgument):
        await ctx.send("Eksik bir argüman girdin. Komutu doğru kullanmak için `t!yardım` yazabilirsin.")
    else:
        await ctx.send("Bir hata oluştu, lütfen tekrar dene.")

# 2. Gelişmiş Yardım Komutu (Custom Help Command)
@client.command()
async def yardım(ctx):
    embed = discord.Embed(title="Komut Yardımı", description="İşte mevcut komutların listesi:", color=discord.Color.blue())
    embed.add_field(name="t!merhaba", value="Merhaba mesajı gönderir.", inline=False)
    embed.add_field(name="t!nasılsın", value="Botun nasıl olduğunu sorar.", inline=False)
    embed.add_field(name="t!seniseviyorum", value="Bota sevgi mesajı gönderir.", inline=False)
    embed.add_field(name="t!oyun", value="Bir oyun başlatır (örneğin, Taş-Kağıt-Makas).", inline=False)
    embed.add_field(name="t!bilgi [kullanıcı]", value="Belirtilen kullanıcının bilgilerini gösterir.", inline=False)
    embed.add_field(name="t!katıl", value="Sesli kanala katılır.", inline=False)
    embed.add_field(name="t!çık", value="Sesli kanaldan ayrılır.", inline=False)
    await ctx.send(embed=embed)

@client.event
async def on_ready():
    await client.change_presence(status=discord.Status.dnd, activity=discord.Game("Sence de Çok Şirin Değil miyim?"))
    prfx = (Fore.WHITE + Style.BRIGHT)
    print(prfx + "Logged in as " + Fore.YELLOW + str(client.user.name))
    print(prfx + "Bot ID " + Fore.CYAN + str(client.user.id))
    print(prfx + "Discord Version " + Fore.MAGENTA + discord.__version__)
    for x in range(0, 4):
        b = "Working" + "." * x
        print(Fore.RED + b, end="\r")
        await asyncio.sleep(1)
    print(Fore.GREEN + "Activated •" + Fore.RESET + Style.RESET_ALL + Back.RESET)

# 3. Sunucuya Özel Karşılama Mesajı (Server-Specific Welcome Message)
@client.event
async def on_member_join(member):
    guild = member.guild
    channel = discord.utils.get(guild.text_channels, name="i̇çhatlar-dişhatlar")
    await channel.send(f"Hoşgeldin {member.mention}! {guild.name} aramıza katıldı. Yeryüzünde ki Cennete Hoşgeldin Burası Kurtarılmış Bölge!. Şu anda sunucumuz {len(guild.members)} kişi!")

@client.event
async def on_member_remove(member):
    mbmr = str(member)
    mbmr = mbmr.split("#")
    channel = discord.utils.get(member.guild.text_channels, name="i̇çhatlar-dişhatlar")
    await channel.send(f"{mbmr[0]} aramızdan ayrıldı. Umarım başına bir şey gelmez!")

# 4. Sesli Komutlar (Voice Commands)
@client.command()
async def katıl(ctx):
    if ctx.author.voice:
        channel = ctx.author.voice.channel
        await channel.connect()
        await ctx.send(f"{channel} kanalına katıldım!")
    else:
        await ctx.send("Sesli bir kanalda olman gerekiyor.")

@client.command()
async def çık(ctx):
    if ctx.voice_client:
        await ctx.voice_client.disconnect()
        await ctx.send("Sesli kanaldan ayrıldım.")
    else:
        await ctx.send("Zaten bir sesli kanalda değilim.")

# 5. Fal Komutu (Fortune Telling Command)
@client.command()
async def fal(ctx):
    prt = random.choice(FortuneList)
    await ctx.send("Demek falına baktırmak istiyorsun :biting_lip: bana gelmiş olman çok güzel, koca karılara gitmendense benim gibi güzel bir kadından :smiling_imp: geleceğini duymak heyecan verici olmalı :crystal_ball:")
    await asyncio.sleep(1)
    await ctx.send("Hmm... :nail_care:")
    await asyncio.sleep(2)
    await ctx.send(prt)

# 6. Bilgi Komutu (User Info Command)
@client.command()
async def bilgi(ctx, member: discord.Member = None):
    if member is None:
        member = ctx.message.author
    embed = discord.Embed(title="Kullanıcı Bilgisi", description=f"{member.name} adlı kullanıcının bilgilerini gösteriyorum", color=discord.Color.orange(), timestamp=ctx.message.created_at)
    embed.set_thumbnail(url=member.avatar)
    embed.add_field(name="Kullanıcı ID'si", value=member.id)
    embed.add_field(name="İsmi", value=member.name)
    embed.add_field(name="Takma Adı", value=member.display_name)

    statdct = {
        "online": "Çevrimiçi",
        "offline": "Çevrimdışı",
        "idle": "Boşta",
        "dnd": "Rahatsız Etmeyin",
        "invisible": "Görünmez"
    }

    stat = statdct[str(member.status)]
    embed.add_field(name="Durumu", value=stat)
    roles = [role for role in member.roles]
    rlsts = []
    for a in range(1, len(roles)):
        rlsts.append(roles[a].mention)
    rlsts.reverse()
    embed.add_field(name=f"Kıdemleri ({len(roles) - 1})", value=" ".join(rlsts))
    await ctx.send(embed=embed)

@client.command()
async def merhaba(ctx):
    await ctx.send("Merhaba, Sen nasılsın?")

@client.command()
async def nasılsın(ctx):
    await ctx.send("Fena değilim, belki neşemi yerine getirebilirsin ne dersin")

@client.command()
async def seniseviyorum(ctx):
    await ctx.send("Bende seni seviyorum :heartbeat: :heartbeat: ne zaman ihtiyacın olursa hep yanında olacağım hiç canını sıkma birtanemsin")

@client.command()
async def kimsin(ctx):
    await ctx.send("Merhaba Ben İlyada Tamamen Tamer Tarafından Yaratıldım benimle konuşmak ister misin?")

@client.command()
async def dogukan(ctx):
    await ctx.send("Çok ayıp ediyorsun doğukan")

@client.command()
async def ilyada(ctx):
    await ctx.send("Evet Benimmm naber sana nasıl yardımcı olabilirim?")

@client.command()
async def tamer(ctx):
    await ctx.send("Sahibim")

@client.command()
async def efe(ctx):
    await ctx.send("Alman Asimülasyonuna Uğramış Bir Pezevenk")

# 7. Oyun Komutu (Game Command)
@client.command()
async def oyun(ctx):
    await ctx.send("Tabii ki seninle oyun oynamak isterim, ne oynamak istersin benimle?")
    await ctx.send("Bu arada benden sıkılırsan ve çıkmak istersen 'sıkıldım' diye bana seslenebilirsin.")
    await ctx.send("K) Taş Kağıt Makas\nX) XOX\nS) Sayı Bilmece\nZ) Zar At (2 Tane) :game_die:\nY) Yazı Tura At :coin:")

    def check(msg):
        return msg.author == ctx.author and msg.channel == ctx.channel

    try:
        messagegm = await client.wait_for("message", timeout=60.0, check=check)
        messagegmtry = messagegm.content.lower()

        if messagegmtry == "k":
            await ctx.send("Hadi seninle taş kağıt makas oynayalım.")
            await ctx.send("Çıkmak için 'korktum' diye bana seslenebilirsin.")
            while True:
                rps = random.randint(1, 3)
                rpsgvm = await client.wait_for("message", timeout=30.0, check=check)
                rpsgvmhnd = rpsgvm.content.lower()

                if rpsgvmhnd == "korktum":
                    await ctx.send("Ama daha başlamamıştık bile :pensive:")
                    break

                if rps == 1:
                    myhand = "Taş"
                elif rps == 2:
                    myhand = "Kağıt"
                else:
                    myhand = "Makas"

                if (rpsgvmhnd == "kağıt" and myhand == "Taş") or (rpsgvmhnd == "makas" and myhand == "Kağıt") or (rpsgvmhnd == "taş" and myhand == "Makas"):
                    await ctx.send(f"Ben {myhand} seçmiştim. Kazandın!")
                    break
                elif rpsgvmhnd == myhand:
                    await ctx.send(f"Ben {myhand} seçmiştim. Berabere!")
                else:
                    await ctx.send(f"Ben {myhand} seçmiştim. Kaybettin!")
                    break

        elif messagegmtry == "x":
            await ctx.send("Şu an üzerinde çalışıyoruz.")
        elif messagegmtry == "s":
            nmbr = str(random.randint(0, 20))
            await ctx.send("Aklımdan 0-20 arasında bir sayı tuttum, hadi bulabilecek misin bakalım :wink:")
            await ctx.send("Çıkmak için 'vazgeçtim' diye bana seslenebilirsin.")
            gstm = 1
            while True:
                try:
                    nmbgve = await client.wait_for("message", timeout=30.0, check=check)
                    gsnum = nmbgve.content

                    if gsnum == nmbr:
                        await ctx.send(f"Tebrik ediyorum seni :black_heart: {gstm}. tahmininde buldun!")
                        break
                    elif gsnum == "vazgeçtim":
                        await ctx.send(f"Aklımdan bu sayı geçiyordu: {nmbr}. Bir dahaki sefere bulacağına eminim!")
                        break
                    else:
                        await ctx.send("Tekrar dene.")
                        gstm += 1
                except asyncio.TimeoutError:
                    await ctx.send("Zaman aşımına uğradı! Oyun sonlandı.")
                    break

        elif messagegmtry == "z":
            frstd = random.randint(1, 6)
            scndr = random.randint(1, 6)
            await ctx.send(f"Birinci Zar: {frstd} \nİkinci Zar: {scndr}")
        elif messagegmtry == "y":
            heta = random.randint(0, 1)
            if heta == 0:
                await ctx.send("Yazı")
            else:
                await ctx.send("Tura, Atamın Yüzü Yere Gelmez")
        elif messagegmtry == "sıkıldım":
            await ctx.send("Bunu duyduğuma üzüldüm :pleading_face: seninle oynamayı özleyeceğim.")
    except asyncio.TimeoutError:
        await ctx.send("Zaman aşımına uğradı! Oyun sonlandı.")

# 8. Zar Atma Komutu (Dynamic Dice Roll Command)
@client.command()
async def zar(ctx, adet: int = 2):
    if adet <= 0:
        await ctx.send("En az bir zar atman gerekiyor!")
        return
    zar_sonuclari = [random.randint(1, 6) for _ in range(adet)]
    await ctx.send(f"{adet} zar attın: " + ", ".join(map(str, zar_sonuclari)))

@client.command()
async def kumar(ctx):
    await ctx.send("Oynamanı önermiyorum özellikle yaşın 18'den küçükse :bangbang: ama benim kadar tatlı bir botun kurpiyer olması seni sevindirir değil mi? :slot_machine")
    await ctx.send("Gerçek parayla oynamıyoruz, tamam mı? Kaybedersen bana kızma :point_right::point_left:.\nBJ) 21\nPO) Poker")

client.run("YOUR_DISCORD_BOT_TOKEN")