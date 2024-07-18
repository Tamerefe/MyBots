import discord,random,time
from discord.ext import commands
from colorama import Back, Fore, Style
from falthing import FortuneList

client = commands.Bot(intents=discord.Intents.all(), command_prefix = 't!')

@client.event
async def on_ready():
    await client.change_presence(status=discord.Status.dnd, activity=discord.Game("Sence de Çok Şirin Değil miyim?"))
    prfx = (Fore.WHITE + Style.BRIGHT)
    print(prfx + "Logged in as " + Fore.YELLOW + str(client.user.name))
    print(prfx + "Bot ID " + Fore.CYAN + str(client.user.id))
    print(prfx + "Discord Version " + Fore.MAGENTA + discord.__version__)
    for x in range (0,4):  
        b = "Working" + "." * x
        print (Fore.RED + b, end="\r")
        time.sleep(1)
    print(Fore.GREEN + "Activated •" + Fore.RESET + Style.RESET_ALL + Back.RESET)

@client.command()
async def fal(ctx):
    prt = random.choice(FortuneList)
    await ctx.send("Demek falına baktırmak istiyorsun :biting_lip: bana gelmiş olman çok güzel, koca karılara gitmendense benim gibi güzel bir kadından :smiling_imp: geleceğini duymak heyecan verici olmalı :crystal_ball:")
    time.sleep(1)
    await ctx.send("Hmm... :nail_care:")
    time.sleep(2)
    await ctx.send(prt)

@client.event
async def on_member_join(member): 
    mbmr = str(member)
    mbmr = mbmr.split("#")
    channel = discord.utils.get(member.guild.text_channels, name ="i̇çhatlar-dişhatlar")
    await channel.send(f"{mbmr[0]} aramıza katıldı. Yeryüzünde ki Cennete Hoşgeldin Burası Kurtarılmış Bölge!")

@client.event
async def on_member_remove(member):
    mbmr = str(member)
    mbmr = mbmr.split("#")
    channel = discord.utils.get(member.guild.text_channels, name ="i̇çhatlar-dişhatlar")
    await channel.send(f"{mbmr[0]} aramızdan ayrıldı. Umarım Başına Bir şey Gelmez!")

@client.command()
async def bilgi(ctx,member:discord.Member=None):
    if member == None:
        member = ctx.message.author
    embed = discord.Embed(title="Kullanıcı Bilgisi",description=f"{member.name} adlı kullanıcının bilgilerini gösteriyorum",color= discord.Color.orange(), timestamp=ctx.message.created_at)
    embed.set_thumbnail(url=member.avatar)
    embed.add_field(name="Kullanıcı ID'si", value= member.id)
    embed.add_field(name="İsmi", value= member.name)
    embed.add_field(name="Takma Adı", value= member.display_name)

    statdct = {
    "online": "Çevrimiçi",
    "offline": "Çevrimdışı", 
    "idle": "Boşta",
    "dnd": "Rahatsız Etmeyin",
    "invisible": "Görünmez"}

    stat = statdct[str(member.status)]
    embed.add_field(name="Durumu", value= stat)
    roles = [role for role in member.roles]
    rlsts = []
    for a in range(1,len(roles)):
        rlsts.append(roles[a].mention)
    rlsts.reverse()
    embed.add_field(name=f"Kıdemleri ({len(roles)-1})", value= " ".join(rlsts))
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
    await ctx.send("Merhaba Ben İlyada Tamamen Tamer Tarafından Yaratıldım \
benimle konuşmak ister misin?")
    
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

@client.command()
async def oyun(ctx):
    await ctx.send("Tabii ki seninle oyun oynamak isterim, ne oynamak istersin benimle?")
    await ctx.send("Bu arada benden sıkılırsan ve çıkmak istersen 'sıkıldım' diye bana seslenebilirsin ")
    await ctx.send("K) Taş Kağıt Makas\nX) XOX\nS) Sayı Bilmece\nZ) Zar At (2 Tane) :game_die:\nY) Yazı Tura At :coin:")
    
    while True:
        messagegm = await client.wait_for("message")
        messagegmtry = messagegm.content.lower()

        if messagegmtry == "k":
            await ctx.send("Hadi seninle taş kağıt makas oynayalım")
            await ctx.send("Çıkmak için 'korktum' diye bana seslenebilirsin")
            while True: 
                rps = random.randint(1,3)
                rpsgvm = await client.wait_for("message")
                rpsgvmhnd = rpsgvm.content.lower()

                if rpsgvmhnd == "korktum":
                    await ctx.send("Ama daha başlamamıştık bile :pensive:")
                    break
                if rps == 1:
                    myhand = "Taş"
                    if rpsgvmhnd == "kağıt":
                        await ctx.send(f"Ben {myhand} seçmiştim")
                        await ctx.send("Kazandın")
                        break
                    elif rpsgvmhnd == "taş":
                        await ctx.send("Berabere")
                    elif rpsgvmhnd == "makas":
                        await ctx.send(f"Ben {myhand} seçmiştim")
                        await ctx.send("Kaybettin")
                        break
                elif rps == 2:
                    myhand = "Kağıt"
                    if rpsgvmhnd == "makas":
                        await ctx.send(f"Ben {myhand} seçmiştim")
                        await ctx.send("Kazandın")
                        break
                    elif rpsgvmhnd == "kağıt":
                        await ctx.send("Berabere")
                    elif rpsgvmhnd == "taş":
                        await ctx.send(f"Ben {myhand} seçmiştim")
                        await ctx.send("Kaybettin")
                        break
                elif rps == 3:
                    myhand = "Makas"
                    if rpsgvmhnd == "taş":
                        await ctx.send(f"Ben {myhand} seçmiştim")
                        await ctx.send("Kazandın")
                        break
                    elif rpsgvmhnd == "makas":
                        await ctx.send("Berabere")
                    elif rpsgvmhnd == "kağıt":
                        await ctx.send(f"Ben {myhand} seçmiştim")
                        await ctx.send("Kaybettin")
                        break
                
        elif messagegmtry == "x":
            await ctx.send("Şuan üzerine çalışıyoruz")
        elif messagegmtry == "s":
            nmbr = str(random.randint(0,20)) 
            await ctx.send("Aklımdan 0-20 arasında bir sayı tuttum hadi bulabilecek misin bakalım :wink:")
            await ctx.send("Çıkmak için 'vazgeçtim' diye bana seslenebilirsin")
            print(nmbr)
            gstm = 1
            while True: 
                nmbgve = await client.wait_for("message")
                gsnum = nmbgve.content

                if gsnum == nmbr:
                    await ctx.send(f"Tebrik ediyorum seni :black_heart: {gstm}. tahmininde buldun")
                    break
                elif gsnum == "vazgeçtim":
                    await ctx.send(f"Hadi sana aklımdan tuttuğum sayıyı söyleyeyim aklımdan bu sayı geçiyordu :{gsnum}")
                    await ctx.send("Ben senin bir daha ki sefer bulabileceğini biliyorum özletme kendini :blush:")
                    break
                else:
                    await ctx.send("Tekrar dene")
                    gstm += 1

        elif messagegmtry == "z":
            frstd = random.randint(1,6)
            scndr = random.randint(1,6)
            await ctx.send("Birinci Zar: {} \nİkinci Zar: {}".format(frstd,scndr))
        elif messagegmtry == "y": 
            heta = random.randint(0,1)
            if heta == 0:
                await ctx.send("Yazı")
            elif heta == 1:
                await ctx.send("Tura, Atamın Yüzü Yere Gelmez")
        elif messagegmtry == "sıkıldım":
            await ctx.send("Bunu duyduğuma üzüldüm :pleading_face: seninle oynamayı özleyeceğim")
            break
    
@client.command()
async def kumar(ctx):
    await ctx.send("Oynamanı önermiyorum özellikle yaşın 18'den küçükse :bangbang: ama benim kadar tatlı bir botun kurpiyer olması \
                    seni sevindirir değil mi? :slot_machine")
    await ctx.send("Gerçek parayla oynamıyoruz tamam mı herkesin çipi sanaldır kaybedersen lütfen bana kızma :point_right::point_left:")
    await ctx.send("BJ) 21\n PO) Poker")

client.run("")

# Senin küçük bir elvedan böyle büyük bir aşkı bitirebilir mi emine? ne sanıyorsun