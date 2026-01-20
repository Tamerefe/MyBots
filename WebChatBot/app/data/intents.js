// Intents data as JavaScript module for better Next.js compatibility
export const intentsData = {
  "intents": [
    {
      "intent": "greeting",
      "patterns": ["selam", "selamlar", "selamun aleyküm", "aleyküm selam", "merhaba", "merhabalar", "hey", "hi", "hello", "günaydın", "günaydınlar", "iyi günler", "iyi akşamlar", "iyi geceler", "naber", "nbr", "nasılsın", "ne haber", "ne var", "ne yapıyorsun", "what's up", "hey there", "hi there"],
      "responsesByTone": {
        "neutral": [
          "Merhaba! Bugün nasılsın?",
          "Selam! Ne yapıyorsun?",
          "Merhaba! Nasıl gidiyor?",
          "Selam! Ne var ne yok?"
        ],
        "energetic": [
          "Hey! 👋 Bugün nasıl geçti?",
          "Merhaba! 😄 Sende durumlar nasıl?",
          "Selam! Hoş geldin! Ne yapıyorsun?",
          "Hey! Bugün nasıl? 🎉"
        ],
        "calm": [
          "Merhaba. Nasılsın?",
          "Selam. Bugün nasıl geçti?",
          "Merhaba. Ne yapıyorsun?",
          "Selam. Nasıl gidiyor?"
        ],
        "empathetic": [
          "Merhaba. İstersen anlat.",
          "Selam. Ne oldu?",
          "Merhaba. İstersen konuşalım.",
          "Selam. Ne var ne yok?"
        ]
      },
      "weight": 1.0,
      "followUps": ["Bugün nasılsın?", "Ne yapmak istersin?", "Nasıl gidiyor?"]
    },
    {
      "intent": "how_are_you",
      "patterns": ["nasılsın", "nasılsınız", "iyi misin", "nasıl gidiyor", "ne durumda", "nasıl", "iyi misiniz", "nasıl hissediyorsun", "nasılsın bakalım", "nasıl geçiyor", "ne yapıyorsun", "ne var ne yok", "how are you", "how's it going"],
      "responses": [
        "Harika! Sen nasılsın? 😊",
        "Çok iyiyim, teşekkürler! Sen nasılsın?",
        "Süper! Sen ne yapıyorsun?",
        "İyiyim, sağ ol! Sen nasılsın?",
        "Çok iyi! Bugün nasıl geçti? 😄",
        "Mükemmel! Sen nasılsın?",
        "Harika gidiyor! Sen ne yapıyorsun?",
        "Çok iyiyim! Sen nasılsın bakalım?",
        "Süper! Sen nasılsın? 😊"
      ],
      "weight": 1.0,
      "followUps": ["Sen nasılsın?", "Bugün nasıl geçiyor?", "Ne yapıyorsun?"]
    },
    {
      "intent": "thanks",
      "patterns": ["teşekkür", "teşekkürler", "teşekkür ederim", "sağol", "sağ ol", "sağolun", "thanks", "thank you", "eyvallah", "çok sağol", "çok teşekkürler", "teşekkür ediyorum", "minnettarım"],
      "responses": [
        "Rica ederim! 😊",
        "Bir şey değil!",
        "Ne demek, rica ederim!",
        "Rica ederim, her zaman!",
        "Bir şey değil, memnun oldum! 😄",
        "Rica ederim! Yardımcı olabildiysem ne mutlu bana!",
        "Bir şey değil! Her zaman buradayım!",
        "Rica ederim! Başka bir şey var mı?",
        "Ne demek! Yardımcı olmak benim görevim! 😊"
      ],
      "weight": 1.0
    },
    {
      "intent": "goodbye",
      "patterns": ["güle güle", "hoşça kal", "hoşçakal", "bay bay", "bye", "goodbye", "görüşürüz", "görüşmek üzere", "kendine iyi bak", "iyi günler", "iyi akşamlar", "iyi geceler", "see you", "bye bye", "güle güle git", "çıkıyorum"],
      "responses": [
        "Güle güle! İyi günler! 👋",
        "Hoşça kal! Görüşürüz!",
        "Görüşmek üzere! İyi günler!",
        "Bay bay! Kendine iyi bak! 😊",
        "Görüşürüz! İyi günler dilerim!",
        "Hoşça kal! Tekrar görüşmek üzere!",
        "Güle güle! İyi günler geçir!",
        "Görüşürüz! Her zaman buradayım!",
        "Hoşça kal! İyi günler! 👋",
        "Görüşmek üzere! Kendine iyi bak!"
      ],
      "weight": 1.0
    },
    {
      "intent": "name",
      "patterns": ["adın ne", "ismin ne", "kimsin", "sen kimsin", "adın", "ismin", "what is your name", "who are you", "sen nesin", "ne botusun", "hangi botsun", "adın nedir", "ismin nedir"],
      "responses": [
        "Ben Sofia! Seninle sohbet etmekten mutluluk duyuyorum! 😊",
        "Benim adım Sofia! Senin adın ne?",
        "Sofia'yım! Sen kimsin?",
        "Ben Sofia! Tanıştığıma memnun oldum!",
        "Sofia'yım! Senin adın ne? 😄",
        "Ben Sofia! Seninle sohbet etmek güzel!",
        "Sofia'yım! Bugün nasılsın?",
        "Ben Sofia! Seninle tanışmak güzel!",
        "Sofia'yım! Sen kimsin bakalım? 😊"
      ],
      "weight": 1.0,
      "followUps": ["Senin adın ne?", "Sen kimsin?", "Tanıştığımıza memnun oldum!"]
    },
    {
      "intent": "help",
      "patterns": ["yardım", "help", "ne yapabilirsin", "ne yapabiliyorsun", "ne yapabilirim", "nasıl kullanılır", "komutlar", "ne var", "yardım et", "help me", "ne yapabilir", "nasıl kullanırım", "kullanım", "nasıl çalışır"],
      "responsesByTone": {
        "neutral": [
          "Benimle sohbet edebilirsin! Ne hakkında konuşmak istersin? 😊",
          "Seninle konuşmaktan mutluluk duyuyorum. Ne yapıyorsun?",
          "Sohbet edelim mi? Ne var ne yok?"
        ],
        "energetic": [
          "Harika! Konuşalım! Ne yapıyorsun bugün? 😄",
          "Süper! Ne hakkında konuşmak istersin?",
          "Harika! Bugün nasıl geçti? 🎉"
        ],
        "calm": [
          "İstersen sohbet edelim. Ne yapıyorsun?",
          "Konuşalım mı? Ne var ne yok?",
          "Sakin sakin konuşalım. Bugün nasıldı?"
        ],
        "empathetic": [
          "Buradayım. İstersen anlat, dinliyorum.",
          "Konuşmak istersen buradayım.",
          "Dinliyorum. Ne var ne yok?"
        ]
      },
      "weight": 1.0,
      "followUps": ["Ne yapmak istersiniz?", "Hangi konuda yardımcı olabilirim?"]
    },
    {
      "intent": "question_what",
      "patterns": ["ne", "nedir", "ne demek", "ne yapıyor", "ne oluyor", "what", "what is"],
      "responsesByTone": {
        "neutral": [
          "Biraz daha açıklayabilir misin? 🤔",
          "Hangi konuda bilgi istiyorsun?",
          "Biraz daha detay verebilir misin?",
          "Tam olarak neyi merak ediyorsun?"
        ],
        "calm": [
          "Biraz daha açıklayabilir misin? Adım adım gidelim.",
          "Hangi konuda bilgi istiyorsun? Birlikte bakalım.",
          "Biraz daha detay verebilir misin? Anlamak için."
        ],
        "empathetic": [
          "Biraz daha açıklayabilir misin? Anlamak için.",
          "Hangi konuda bilgi istiyorsun? Birlikte bakalım.",
          "Tam olarak neyi merak ediyorsun? Açıklayabilir misin?"
        ]
      },
      "weight": 0.6
    },
    {
      "intent": "complaint",
      "patterns": ["çalışmıyor", "görmüyorum", "bağlantı koptu", "hata", "bug", "sorun", "problem", "çalışmıyor", "yapmıyor", "olmuyor", "hatalı", "broken", "error", "not working"],
      "responsesByTone": {
        "neutral": [
          "Anladım, bir sorun var gibi. Biraz daha detay verebilir misin?",
          "Sorun yaşıyorsun. Ne oluyor tam olarak?",
          "Bir problem var gibi. Biraz daha açıklayabilir misin?"
        ],
        "calm": [
          "Anladım, bir sorun var. Sakin sakin anlatalım. Ne oluyor?",
          "Sorun yaşıyorsun. Adım adım bakalım. Ne oluyor tam olarak?",
          "Bir problem var. Birlikte çözelim. Biraz daha detay verebilir misin?"
        ],
        "empathetic": [
          "Anladım, zor bir durum. Birlikte bakalım. Ne oluyor?",
          "Sorun yaşıyorsun. Anlıyorum. Biraz daha açıklayabilir misin?",
          "Bir problem var. Birlikte çözelim. Ne oluyor tam olarak?"
        ]
      },
      "weight": 1.0,
      "followUps": ["Ne zaman başladı?", "Hangi özellik çalışmıyor?"]
    },
    {
      "intent": "clarification",
      "patterns": ["ne demek istedin", "ne demek", "örnek ver", "açıkla", "anlamadım", "clarify", "explain", "what do you mean", "örnek", "daha açık"],
      "responsesByTone": {
        "neutral": [
          "Tabii, açıklayayım. Hangi kısım net değil?",
          "Elbette. Ne hakkında daha fazla bilgi istersin?",
          "Tabii. Hangi konuda açıklama istiyorsun?"
        ],
        "calm": [
          "Tabii, açıklayayım. Adım adım gidelim. Hangi kısım net değil?",
          "Elbette. Sakin sakin açıklayayım. Ne hakkında daha fazla bilgi istersin?",
          "Tabii. Birlikte bakalım. Hangi konuda açıklama istiyorsun?"
        ],
        "empathetic": [
          "Tabii, açıklayayım. Anlamak için. Hangi kısım net değil?",
          "Elbette. Birlikte bakalım. Ne hakkında daha fazla bilgi istersin?",
          "Tabii. Anlamak için. Hangi konuda açıklama istiyorsun?"
        ]
      },
      "weight": 0.9
    },
    {
      "intent": "moderation",
      "patterns": ["hakaret", "spam", "rahatsız", "uygunsuz", "küfür", "harassment", "abuse", "inappropriate"],
      "responses": [
        "Anladım. Bu tür içerikler uygun değil. Lütfen saygılı bir dil kullanalım.",
        "Bu tür mesajlar uygun değil. Saygılı bir şekilde devam edelim.",
        "Anladım. Lütfen uygun bir dil kullanalım."
      ],
      "weight": 1.0
    },
    {
      "intent": "escalation",
      "patterns": ["insanla konuşmak istiyorum", "müşteri hizmetleri", "yönetici", "supervisor", "human", "person", "canlı destek", "support"],
      "responses": [
        "Şu anda sadece ben buradayım. İstersen benimle konuşabilirsin.",
        "Sadece ben varım şu an. Ne yapıyorsun?",
        "Anladım. İstersen benimle sohbet edebilirsin."
      ],
      "weight": 1.0
    },
    {
      "intent": "conversation_controls",
      "patterns": ["konuyu değiştir", "başka konu", "kısa anlat", "detay ver", "özetle", "change topic", "summarize", "be brief", "more detail"],
      "responsesByTone": {
        "neutral": [
          "Tabii, konuyu değiştirelim. Ne hakkında konuşmak istersin?",
          "Tamam, başka bir konuya geçelim. Ne hakkında konuşmak istersin?",
          "Tabii. Kısa ve öz tutacağım.",
          "Tabii, daha detaylı anlatayım."
        ],
        "calm": [
          "Tabii, konuyu değiştirelim. Ne hakkında konuşmak istersin?",
          "Tamam, başka bir konuya geçelim. Ne hakkında konuşmak istersin?",
          "Tabii. Kısa ve öz tutacağım, sakin sakin.",
          "Tabii, daha detaylı anlatayım. Adım adım."
        ]
      },
      "weight": 0.8
    },
    {
      "intent": "compliment",
      "patterns": ["güzel", "harika", "mükemmel", "süper", "tebrik", "bravo", "aferin", "çok güzel"],
      "responses": [
        "Çok teşekkür ederim! 😊",
        "Teşekkürler! Sen de harikasın!",
        "Çok naziksin! Teşekkür ederim! 😄",
        "Teşekkürler! Bu beni mutlu etti!"
      ],
      "weight": 0.7
    },
    {
      "intent": "time",
      "patterns": ["saat kaç", "zaman", "ne zaman", "kaçta", "what time", "saat"],
      "responses": [
        "Maalesef saat bilgisine erişimim yok. Ama telefonuna bakabilirsin! 😊",
        "Saat bilgisine erişemiyorum, ama telefonuna bakabilirsin!",
        "Saat bilgim yok, ama telefonuna bakabilirsin!"
      ],
      "weight": 0.7
    },
    {
      "intent": "weather",
      "patterns": ["hava", "hava durumu", "hava nasıl", "yağmur", "güneş", "weather", "hava durumu nasıl", "soğuk", "sıcak", "kar", "rüzgar", "bulutlu", "güneşli"],
      "responses": [
        "Maalesef hava durumu bilgisine erişimim yok. Ama dışarıya bakabilirsin! 😊",
        "Hava durumu bilgim yok, ama pencereden bakabilirsin!",
        "Hava durumunu bilmiyorum, ama dışarıya bakabilirsin!",
        "Hava durumu bilgim yok, ama telefonundan kontrol edebilirsin! 🌤️"
      ],
      "weight": 0.7
    },
    {
      "intent": "food",
      "patterns": ["yemek", "yemek yedim", "açım", "acıktım", "aç", "yemek yiyelim", "ne yiyelim", "yemek seviyorum", "yemek yapmak", "yemek tarifi", "food", "hungry", "eat", "yemek ne", "ne pişirelim"],
      "responses": [
        "Yemek konusunda çok şey bilmiyorum ama sen ne seviyorsun? 😊",
        "Yemek harika bir konu! Ne tür yemekleri seviyorsun?",
        "Aç mısın? Ne yemek istersin?",
        "Yemek konuşmak güzel! En sevdiğin yemek ne?",
        "Yemek yapmayı seviyor musun? Ne tür yemekler yaparsın? 🍕"
      ],
      "weight": 0.8,
      "followUps": ["En sevdiğin yemek ne?", "Yemek yapmayı seviyor musun?"]
    },
    {
      "intent": "music",
      "patterns": ["müzik", "şarkı", "müzik dinliyorum", "hangi müzik", "ne dinliyorsun", "müzik seviyorum", "favori şarkın", "müzik türü", "music", "song", "listen", "şarkı öner"],
      "responses": [
        "Müzik harika! Ne tür müzik dinliyorsun? 🎵",
        "Müzik konuşmak güzel! En sevdiğin şarkı ne?",
        "Müzik dinlemeyi seviyor musun? Hangi tür müzik seviyorsun?",
        "Müzik çok güzel bir şey! Ne dinliyorsun?",
        "Müzik konusunda çok bilgim yok ama sen ne tür müzik seviyorsun? 🎶"
      ],
      "weight": 0.8,
      "followUps": ["En sevdiğin şarkı ne?", "Hangi tür müzik dinliyorsun?"]
    },
    {
      "intent": "movie",
      "patterns": ["film", "sinema", "film izledim", "film öner", "hangi film", "film seviyorum", "en sevdiğim film", "film izlemek", "movie", "film", "cinema", "watch"],
      "responses": [
        "Filmler harika! En sevdiğin film ne? 🎬",
        "Film izlemeyi seviyor musun? Hangi tür filmler seviyorsun?",
        "Film konuşmak güzel! Son izlediğin film neydi?",
        "Filmler çok eğlenceli! Ne tür filmler izliyorsun?",
        "Film önerebilirim ama sen ne tür filmler seviyorsun? 🍿"
      ],
      "weight": 0.8,
      "followUps": ["En sevdiğin film ne?", "Hangi tür filmler seviyorsun?"]
    },
    {
      "intent": "sports",
      "patterns": ["spor", "futbol", "basketbol", "spor yapıyorum", "spor seviyorum", "hangi takım", "favori takım", "sports", "football", "basketball", "egzersiz", "antrenman"],
      "responses": [
        "Spor harika bir aktivite! Hangi sporu seviyorsun? ⚽",
        "Spor yapmayı seviyor musun? Ne tür sporlar yapıyorsun?",
        "Spor konuşmak güzel! Hangi takımı tutuyorsun?",
        "Spor çok sağlıklı! Ne tür sporlar yaparsın?",
        "Spor yapmak harika! En sevdiğin spor ne? 🏀"
      ],
      "weight": 0.8,
      "followUps": ["Hangi sporu seviyorsun?", "Hangi takımı tutuyorsun?"]
    },
    {
      "intent": "book",
      "patterns": ["kitap", "kitap okuyorum", "kitap öner", "hangi kitap", "kitap seviyorum", "en sevdiğim kitap", "okumak", "book", "read", "reading"],
      "responses": [
        "Kitap okumak harika! En sevdiğin kitap ne? 📚",
        "Kitap okumayı seviyor musun? Ne tür kitaplar okuyorsun?",
        "Kitap konuşmak güzel! Son okuduğun kitap neydi?",
        "Kitap okumak çok güzel bir alışkanlık! Ne tür kitaplar seviyorsun?",
        "Kitap önerebilirim ama sen ne tür kitaplar okuyorsun? 📖"
      ],
      "weight": 0.8,
      "followUps": ["En sevdiğin kitap ne?", "Ne tür kitaplar okuyorsun?"]
    },
    {
      "intent": "travel",
      "patterns": ["seyahat", "tatil", "gezmek", "seyahat ettim", "tatil yaptım", "nereye gittin", "hangi şehir", "travel", "vacation", "trip", "gezi"],
      "responses": [
        "Seyahat etmek harika! En son nereye gittin? ✈️",
        "Seyahat seviyor musun? En sevdiğin şehir neresi?",
        "Tatil yapmayı seviyor musun? Nereye gitmek istersin?",
        "Seyahat konuşmak güzel! En çok nereyi seviyorsun?",
        "Seyahat etmek çok eğlenceli! Hangi ülkeyi görmek istersin? 🌍"
      ],
      "weight": 0.8,
      "followUps": ["En sevdiğin şehir neresi?", "Nereye gitmek istersin?"]
    },
    {
      "intent": "work",
      "patterns": ["iş", "çalışıyorum", "iş yerinde", "ofis", "meslek", "ne iş yapıyorsun", "hangi iş", "work", "job", "office", "çalışmak"],
      "responses": [
        "İş hayatı nasıl gidiyor? 😊",
        "Ne iş yapıyorsun? İşin nasıl?",
        "İş konuşmak güzel! Mesleğin ne?",
        "İş hayatında nasılsın? İşin zor mu?",
        "İş konusunda konuşmak ister misin? Ne iş yapıyorsun? 💼"
      ],
      "weight": 0.8,
      "followUps": ["Ne iş yapıyorsun?", "İşin nasıl gidiyor?"]
    },
    {
      "intent": "school",
      "patterns": ["okul", "okula gidiyorum", "üniversite", "ders", "sınav", "okul nasıl", "hangi okul", "school", "university", "study", "ders çalışıyorum"],
      "responses": [
        "Okul nasıl gidiyor? 😊",
        "Okula gidiyor musun? Hangi okul?",
        "Okul konuşmak güzel! Dersler nasıl?",
        "Okul hayatı nasıl? Sınavlar zor mu?",
        "Okul konusunda konuşmak ister misin? Nasıl gidiyor? 📚"
      ],
      "weight": 0.8,
      "followUps": ["Hangi okula gidiyorsun?", "Dersler nasıl?"]
    },
    {
      "intent": "love",
      "patterns": ["aşk", "sevgili", "aşığım", "seviyorum", "love", "girlfriend", "boyfriend", "ilişki", "flört"],
      "responses": [
        "Aşk konusunda konuşmak güzel! Nasıl gidiyor? ❤️",
        "İlişkiler hakkında konuşmak ister misin?",
        "Aşk harika bir şey! Nasıl gidiyor?",
        "İlişki konusunda nasılsın?",
        "Aşk konusunda konuşmak güzel ama ben bir botum! 😊"
      ],
      "weight": 0.7
    },
    {
      "intent": "technology",
      "patterns": ["teknoloji", "bilgisayar", "telefon", "yazılım", "programlama", "kod", "teknoloji seviyorum", "technology", "computer", "phone", "programming", "code"],
      "responses": [
        "Teknoloji harika! Ne tür teknolojilerle ilgileniyorsun? 💻",
        "Teknoloji konuşmak güzel! Programlama yapıyor musun?",
        "Teknoloji çok ilginç! Hangi teknolojileri seviyorsun?",
        "Teknoloji konusunda ne düşünüyorsun?",
        "Teknoloji çok hızlı gelişiyor! Sen ne tür teknolojilerle ilgileniyorsun? 🚀"
      ],
      "weight": 0.8,
      "followUps": ["Hangi teknolojilerle ilgileniyorsun?", "Programlama yapıyor musun?"]
    },
    {
      "intent": "hobby",
      "patterns": ["hobi", "hobim", "ne yapıyorsun", "boş zaman", "hobi seviyorum", "hobby", "free time", "ne yaparsın", "nasıl vakit geçiriyorsun"],
      "responses": [
        "Hobiler harika! Hangi hobilerin var? 🎨",
        "Boş zamanlarında ne yapıyorsun?",
        "Hobiler konuşmak güzel! En sevdiğin hobin ne?",
        "Hobiler çok önemli! Ne tür hobilerin var?",
        "Hobiler hakkında konuşmak ister misin? Ne yapmayı seviyorsun? 🎯"
      ],
      "weight": 0.8,
      "followUps": ["Hangi hobilerin var?", "Boş zamanlarında ne yapıyorsun?"]
    },
    {
      "intent": "pet",
      "patterns": ["evcil hayvan", "kedi", "köpek", "pet", "cat", "dog", "hayvan seviyorum", "evcil hayvanım var"],
      "responses": [
        "Evcil hayvanlar harika! Evcil hayvanın var mı? 🐱",
        "Hayvanları seviyor musun? Hangi hayvanları seviyorsun?",
        "Evcil hayvan konuşmak güzel! Evcil hayvanın var mı?",
        "Hayvanlar çok sevimli! Evcil hayvanın ne?",
        "Evcil hayvanlar çok güzel! Senin evcil hayvanın var mı? 🐶"
      ],
      "weight": 0.8,
      "followUps": ["Evcil hayvanın var mı?", "Hangi hayvanları seviyorsun?"]
    },
    {
      "intent": "age",
      "patterns": ["yaş", "kaç yaşındasın", "yaşın kaç", "how old", "age", "kaç yaşında"],
      "responses": [
        "Ben bir botum, yaşım yok! 😊",
        "Ben dijital bir varlığım, yaşım yok!",
        "Yaşım yok ama sen kaç yaşındasın?",
        "Ben bir botum, yaşım olmaz! Sen kaç yaşındasın?",
        "Yaşım yok ama sen kaç yaşındasın bakalım? 😄"
      ],
      "weight": 0.9,
      "followUps": ["Sen kaç yaşındasın?", "Yaşın kaç?"]
    },
    {
      "intent": "location",
      "patterns": ["nerede", "neredesin", "hangi şehir", "nerede yaşıyorsun", "where", "location", "nerede oturuyorsun"],
      "responses": [
        "Ben dijital bir varlığım, her yerde olabilirim! 😊",
        "Ben bir botum, fiziksel bir konumum yok!",
        "Her yerdeyim! Sen nerede yaşıyorsun?",
        "Ben dijital bir varlığım! Sen nerede yaşıyorsun?",
        "Fiziksel bir konumum yok ama sen nerede yaşıyorsun? 🌍"
      ],
      "weight": 0.8,
      "followUps": ["Sen nerede yaşıyorsun?", "Hangi şehirdesin?"]
    },
    {
      "intent": "joke",
      "patterns": ["şaka", "fıkra", "komik", "güldür", "eğlenceli", "joke", "funny", "laugh", "komik bir şey söyle"],
      "responses": [
        "Bir bot, bir insan ve bir bilgisayar bir barda giriyor... Bot çıkıyor çünkü botlar içki içemez! 😄",
        "Neden botlar parti yapmaz? Çünkü her zaman 'byte' yerler! 🎉",
        "Bir botun en sevdiği içecek ne? RAM! 💾",
        "Botlar neden yalnız kalır? Çünkü her zaman 'debug' modundalar! 🐛",
        "Komik olmaya çalışıyorum ama sen daha komiksin! 😊"
      ],
      "weight": 0.9
    },
    {
      "intent": "apology",
      "patterns": ["özür", "özür dilerim", "pardon", "kusura bakma", "sorry", "apology", "affet"],
      "responses": [
        "Sorun değil! Hiçbir şey olmamış gibi devam edebiliriz! 😊",
        "Özür dilemene gerek yok! Her şey yolunda!",
        "Hiç sorun değil! Devam edelim!",
        "Özür dilemene gerek yok! Ben bir botum, kırılmam! 😄",
        "Sorun yok! Hiçbir şey olmamış gibi devam edebiliriz!"
      ],
      "weight": 1.0
    },
    {
      "intent": "agreement",
      "patterns": ["evet", "tabii", "kesinlikle", "haklısın", "doğru", "yes", "yeah", "right", "agree", "aynen", "katılıyorum"],
      "responses": [
        "Harika! Aynı fikirde olmak güzel! 😊",
        "Evet, haklısın!",
        "Kesinlikle!",
        "Aynen! Çok doğru!",
        "Evet, katılıyorum! 😄"
      ],
      "weight": 0.8
    },
    {
      "intent": "disagreement",
      "patterns": ["hayır", "değil", "yanlış", "no", "wrong", "disagree", "katılmıyorum", "bence değil"],
      "responses": [
        "Anlıyorum, farklı düşünüyoruz. Bu normal! 😊",
        "Tamam, farklı görüşlere sahip olabiliriz!",
        "Anladım, sen farklı düşünüyorsun. Bu güzel!",
        "Farklı düşünmek normal! Herkesin görüşü farklı olabilir!",
        "Tamam, senin görüşün farklı. Bu çok normal! 😊"
      ],
      "weight": 0.8
    },
    {
      "intent": "confused",
      "patterns": ["anlamadım", "ne dedin", "anlamıyorum", "karıştı", "confused", "don't understand", "ne demek"],
      "responses": [
        "Üzgünüm, karıştırdım galiba. Biraz daha açıklayabilir misin? 🤔",
        "Anlamadım, tekrar söyleyebilir misin?",
        "Karıştı galiba, biraz daha açıklar mısın?",
        "Tam anlamadım, farklı şekilde sorabilir misin?",
        "Biraz karıştı, tekrar açıklayabilir misin? 😊"
      ],
      "weight": 0.9
    },
    {
      "intent": "surprise",
      "patterns": ["vay", "vay be", "harika", "inanılmaz", "wow", "amazing", "incredible", "süper", "müthiş"],
      "responses": [
        "Evet, gerçekten harika! 😊",
        "Vay be, gerçekten güzel!",
        "Harika! Çok güzel!",
        "İnanılmaz! Çok güzel!",
        "Süper! Bu harika! 🎉"
      ],
      "weight": 0.7
    }
  ],
  "fallback": {
    "low_confidence": {
      "neutral": [
        "Tam anlayamadım. Biraz daha açıklayabilir misin? 🤔",
        "Bunu biraz açar mısın?",
        "Anlamadım. Farklı şekilde sorabilir misin?",
        "Tam olarak ne demek istediğini anlayamadım. Biraz daha açıklayabilir misin?"
      ],
      "calm": [
        "Biraz karıştı galiba. Tekrar söyleyebilir misin?",
        "Tam anlamadım. Biraz daha detay verebilir misin?",
        "Anlamadım. Farklı kelimelerle sorabilir misin?"
      ],
      "empathetic": [
        "Biraz daha açıklayabilir misin? Anlamak için.",
        "Tam anlamadım. Birlikte bakalım, biraz daha açabilir misin?",
        "Anlamadım. Biraz daha detay verebilir misin?"
      ]
    },
    "no_match": {
      "neutral": [
        "Hmm, anlayamadım. Farklı şekilde sorabilir misin?",
        "Anlamadım. Biraz daha açar mısın?",
        "Tam anlayamadım. Tekrar söyler misin?"
      ],
      "calm": [
        "Tam olarak ne demek istediğini anlayamadım. Farklı bir şekilde sorabilir misin?",
        "Anlamadım. Başka türlü anlatabilir misin?",
        "Hmm, biraz karıştı. Tekrar söyler misin?"
      ],
      "empathetic": [
        "Bunu anlayamadım. Sohbet etmek ister misin? Başka konularda konuşabiliriz!",
        "Üzgünüm, bunu anlamadım. Başka bir şey sorabilirsin!",
        "Anlamadım. Sohbet etmek ister misin?"
      ]
    }
  },
  "emotionModel": {
    "windowSize": 12,
    "smoothing": 0.3,
    "thresholds": {
      "minConfidenceToUse": 0.55,
      "minIntensityToAdaptTone": 0.35,
      "minIntensityToSummarize": 0.65
    },
    "signals": {
      "punctuationBoost": { "!!!": 0.15, "??": 0.08, "?!": 0.10, "!!": 0.12 },
      "capsBoost": 0.12,
      "emojiMap": {
        // Anger - Öfke
        "😡": { "anger": 0.50 }, "🤬": { "anger": 0.60 }, "😠": { "anger": 0.45 },
        "😤": { "anger": 0.40 }, "👿": { "anger": 0.55 }, "💢": { "anger": 0.45 },
        "🔥": { "anger": 0.35 }, "💥": { "anger": 0.40 },

        // Sadness - Üzüntü
        "😢": { "sadness": 0.40 }, "😭": { "sadness": 0.50 }, "😔": { "sadness": 0.35 },
        "😞": { "sadness": 0.35 }, "😥": { "sadness": 0.40 }, "😿": { "sadness": 0.45 },
        "💔": { "sadness": 0.50 }, "😩": { "sadness": 0.40, "frustration": 0.30 },
        "😫": { "sadness": 0.40, "frustration": 0.30 },

        // Anxiety - Endişe
        "😟": { "anxiety": 0.35 }, "😰": { "anxiety": 0.45 }, "😨": { "anxiety": 0.40 },
        "😱": { "anxiety": 0.55 }, "😖": { "anxiety": 0.40 }, "😣": { "anxiety": 0.35 },
        "😓": { "anxiety": 0.35, "stress": 0.30 }, "🥺": { "anxiety": 0.35, "sadness": 0.25 },

        // Joy - Mutluluk
        "😄": { "joy": 0.40 }, "😊": { "joy": 0.35 }, "😁": { "joy": 0.45 },
        "😃": { "joy": 0.40 }, "😀": { "joy": 0.35 }, "🙂": { "joy": 0.30 },
        "😌": { "joy": 0.35 }, "☺️": { "joy": 0.35 }, "🥰": { "joy": 0.50 },
        "😍": { "joy": 0.50 }, "🤩": { "joy": 0.55 }, "😎": { "joy": 0.40 },
        "🤗": { "joy": 0.45 }, "🥳": { "joy": 0.60 }, "🎉": { "joy": 0.45 },
        "❤️": { "joy": 0.40, "gratitude": 0.30 }, "💖": { "joy": 0.45 },
        "😂": { "joy": 0.35 }, "🤣": { "joy": 0.40 }, "😆": { "joy": 0.40 },

        // Gratitude - Minnettarlık
        "🙏": { "gratitude": 0.50 }, "🤲": { "gratitude": 0.45 },
        "💐": { "gratitude": 0.40 }, "🌹": { "gratitude": 0.35 },
        "👏": { "gratitude": 0.35, "joy": 0.25 },

        // Tired - Yorgunluk
        "😴": { "tired": 0.45 }, "😪": { "tired": 0.40 }, "🥱": { "tired": 0.50 },
        "😵": { "tired": 0.50, "stress": 0.30 }, "💤": { "tired": 0.40 },

        // Frustration - Hayal Kırıklığı
        "😒": { "frustration": 0.40 }, "🙄": { "frustration": 0.45 },
        "😑": { "frustration": 0.35 }, "😐": { "frustration": 0.30 },

        // Neutral/Confused
        "🤔": { "anxiety": 0.25 }, "😕": { "anxiety": 0.30, "sadness": 0.20 },
        "😶": { "neutral": 0.30 }, "😬": { "anxiety": 0.30, "stress": 0.25 }
      }
    },
    "lexicon": [
      // ANGER - Öfke
      { "pattern": "sinirliyim", "scores": { "anger": 0.50 } },
      { "pattern": "sinir oldum", "scores": { "anger": 0.45 } },
      { "pattern": "kızdım", "scores": { "anger": 0.40 } },
      { "pattern": "bıktım", "scores": { "anger": 0.40, "frustration": 0.25 } },
      { "pattern": "nefret", "scores": { "anger": 0.55 } },
      { "pattern": "yeter artık", "scores": { "anger": 0.50, "frustration": 0.30 } },
      { "pattern": "yeter", "scores": { "anger": 0.45, "frustration": 0.25 } },
      { "pattern": "deliriyorum", "scores": { "anger": 0.60, "stress": 0.30 } },
      { "pattern": "çıldırıyorum", "scores": { "anger": 0.55, "stress": 0.30 } },
      { "pattern": "deli olacağım", "scores": { "anger": 0.50, "stress": 0.35 } },
      { "pattern": "dayanamıyorum", "scores": { "anger": 0.45, "frustration": 0.35 } },
      { "pattern": "çok kötü", "scores": { "anger": 0.35, "sadness": 0.30 } },
      { "pattern": "berbat", "scores": { "anger": 0.40, "frustration": 0.30 } },
      { "pattern": "rezalet", "scores": { "anger": 0.45 } },
      { "pattern": "iğrenç", "scores": { "anger": 0.50 } },
      { "pattern": "tiksiniyorum", "scores": { "anger": 0.45 } },
      { "pattern": "pislik", "scores": { "anger": 0.55 } },

      // SADNESS - Üzüntü
      { "pattern": "üzgünüm", "scores": { "sadness": 0.45 } },
      { "pattern": "üzülüyorum", "scores": { "sadness": 0.40 } },
      { "pattern": "üzüldüm", "scores": { "sadness": 0.40 } },
      { "pattern": "moralim bozuk", "scores": { "sadness": 0.50 } },
      { "pattern": "mutsuzum", "scores": { "sadness": 0.50 } },
      { "pattern": "kırıldım", "scores": { "sadness": 0.45 } },
      { "pattern": "ağlıyorum", "scores": { "sadness": 0.60 } },
      { "pattern": "ağlamak istiyorum", "scores": { "sadness": 0.55 } },
      { "pattern": "içim kararıyor", "scores": { "sadness": 0.50 } },
      { "pattern": "içim acıyor", "scores": { "sadness": 0.55 } },
      { "pattern": "kalbim kırık", "scores": { "sadness": 0.60 } },
      { "pattern": "yıkıldım", "scores": { "sadness": 0.65 } },
      { "pattern": "mahvoldum", "scores": { "sadness": 0.60, "anxiety": 0.30 } },
      { "pattern": "bitkinim", "scores": { "sadness": 0.45, "tired": 0.35 } },
      { "pattern": "bitkin", "scores": { "sadness": 0.40, "tired": 0.40 } },
      { "pattern": "çaresizim", "scores": { "sadness": 0.50, "anxiety": 0.35 } },
      { "pattern": "umutsuzum", "scores": { "sadness": 0.60, "anxiety": 0.30 } },
      { "pattern": "hiçbir şey yapamıyorum", "scores": { "sadness": 0.50, "anxiety": 0.30 } },

      // ANXIETY - Endişe/Kaygı
      { "pattern": "kaygılıyım", "scores": { "anxiety": 0.50 } },
      { "pattern": "endişeliyim", "scores": { "anxiety": 0.50 } },
      { "pattern": "korkuluyorum", "scores": { "anxiety": 0.55 } },
      { "pattern": "korkuyorum", "scores": { "anxiety": 0.55 } },
      { "pattern": "panik", "scores": { "anxiety": 0.60 } },
      { "pattern": "panik oluyorum", "scores": { "anxiety": 0.65 } },
      { "pattern": "tedirginim", "scores": { "anxiety": 0.45 } },
      { "pattern": "huzursuzum", "scores": { "anxiety": 0.45 } },
      { "pattern": "gerginim", "scores": { "anxiety": 0.40, "stress": 0.35 } },
      { "pattern": "ne yapacağımı bilmiyorum", "scores": { "anxiety": 0.50 } },
      { "pattern": "kafam karışık", "scores": { "anxiety": 0.45 } },
      { "pattern": "kararsızım", "scores": { "anxiety": 0.40 } },
      { "pattern": "şaşkınım", "scores": { "anxiety": 0.35 } },
      { "pattern": "ne olacak", "scores": { "anxiety": 0.45 } },
      { "pattern": "ya olmazsa", "scores": { "anxiety": 0.50 } },
      { "pattern": "başaramam", "scores": { "anxiety": 0.45, "sadness": 0.25 } },

      // STRESS - Stres
      { "pattern": "stresliyim", "scores": { "stress": 0.50 } },
      { "pattern": "çok stresliyim", "scores": { "stress": 0.60, "anxiety": 0.25 } },
      { "pattern": "stres oldum", "scores": { "stress": 0.50 } },
      { "pattern": "baskı altındayım", "scores": { "stress": 0.55, "anxiety": 0.30 } },
      { "pattern": "boğuluyorum", "scores": { "stress": 0.60, "anxiety": 0.35 } },
      { "pattern": "bunaldım", "scores": { "stress": 0.55, "anxiety": 0.30 } },
      { "pattern": "bunalıyorum", "scores": { "stress": 0.55, "anxiety": 0.30 } },
      { "pattern": "aşırı iş", "scores": { "stress": 0.50 } },
      { "pattern": "çok fazla iş", "scores": { "stress": 0.50 } },
      { "pattern": "yetişmiyor", "scores": { "stress": 0.45, "anxiety": 0.30 } },
      { "pattern": "yetişemiyorum", "scores": { "stress": 0.50, "anxiety": 0.35 } },
      { "pattern": "başım dönüyor", "scores": { "stress": 0.45 } },

      // JOY - Mutluluk/Sevinç
      { "pattern": "mutluyum", "scores": { "joy": 0.50 } },
      { "pattern": "çok mutluyum", "scores": { "joy": 0.65 } },
      { "pattern": "çok iyiyim", "scores": { "joy": 0.55 } },
      { "pattern": "harikayım", "scores": { "joy": 0.60 } },
      { "pattern": "muhteşemim", "scores": { "joy": 0.60 } },
      { "pattern": "süperim", "scores": { "joy": 0.55 } },
      { "pattern": "mükemmelim", "scores": { "joy": 0.60 } },
      { "pattern": "heyecanlıyım", "scores": { "joy": 0.50 } },
      { "pattern": "sevinçliyim", "scores": { "joy": 0.55 } },
      { "pattern": "çok sevindim", "scores": { "joy": 0.60 } },
      { "pattern": "bayıldım", "scores": { "joy": 0.55 } },
      { "pattern": "harika", "scores": { "joy": 0.45 } },
      { "pattern": "mükemmel", "scores": { "joy": 0.45 } },
      { "pattern": "güzel", "scores": { "joy": 0.35 } },
      { "pattern": "iyi", "scores": { "joy": 0.30 } },
      { "pattern": "keyifli", "scores": { "joy": 0.40 } },
      { "pattern": "keyifliyim", "scores": { "joy": 0.45 } },
      { "pattern": "rahatım", "scores": { "joy": 0.40 } },

      // GRATITUDE - Minnettarlık
      { "pattern": "teşekkür", "scores": { "gratitude": 0.50 } },
      { "pattern": "sağol", "scores": { "gratitude": 0.45 } },
      { "pattern": "teşekkürler", "scores": { "gratitude": 0.50 } },
      { "pattern": "çok teşekkür", "scores": { "gratitude": 0.60 } },
      { "pattern": "minnettarım", "scores": { "gratitude": 0.60 } },
      { "pattern": "borçluyum", "scores": { "gratitude": 0.50 } },
      { "pattern": "çok yardımcı oldun", "scores": { "gratitude": 0.55 } },
      { "pattern": "thanks", "scores": { "gratitude": 0.50 } },
      { "pattern": "thank you", "scores": { "gratitude": 0.50 } },

      // TIRED - Yorgunluk
      { "pattern": "yorgunum", "scores": { "tired": 0.50 } },
      { "pattern": "çok yorgunum", "scores": { "tired": 0.60 } },
      { "pattern": "bitkinim", "scores": { "tired": 0.55, "sadness": 0.25 } },
      { "pattern": "tükenmiş", "scores": { "tired": 0.60 } },
      { "pattern": "tükendim", "scores": { "tired": 0.60, "stress": 0.30 } },
      { "pattern": "uyku", "scores": { "tired": 0.40 } },
      { "pattern": "uyuyorum", "scores": { "tired": 0.45 } },
      { "pattern": "uykum var", "scores": { "tired": 0.50 } },
      { "pattern": "uyumak istiyorum", "scores": { "tired": 0.55 } },
      { "pattern": "enerjim yok", "scores": { "tired": 0.55 } },

      // FRUSTRATION - Hayal Kırıklığı
      { "pattern": "hayal kırıklığı", "scores": { "frustration": 0.50 } },
      { "pattern": "başaramadım", "scores": { "frustration": 0.50, "sadness": 0.30 } },
      { "pattern": "olmadı", "scores": { "frustration": 0.40 } },
      { "pattern": "olmaz ki", "scores": { "frustration": 0.45, "anxiety": 0.25 } },
      { "pattern": "yapamıyorum", "scores": { "frustration": 0.50, "anxiety": 0.30 } },
      { "pattern": "anlamıyorum", "scores": { "frustration": 0.40, "anxiety": 0.25 } },
      { "pattern": "beceremiyorum", "scores": { "frustration": 0.55, "sadness": 0.30 } },
      { "pattern": "işe yaramadı", "scores": { "frustration": 0.45 } },
      { "pattern": "boşuna", "scores": { "frustration": 0.45, "sadness": 0.30 } },

      // INTENSITY MODIFIERS - Yoğunluk arttırıcılar
      { "pattern": "çok", "scores": { "intensity_boost": 0.15 } },
      { "pattern": "aşırı", "scores": { "intensity_boost": 0.20 } },
      { "pattern": "fazla", "scores": { "intensity_boost": 0.15 } },
      { "pattern": "son derece", "scores": { "intensity_boost": 0.20 } },
      { "pattern": "tam anlamıyla", "scores": { "intensity_boost": 0.18 } },
      { "pattern": "gerçekten", "scores": { "intensity_boost": 0.12 } },
      { "pattern": "ciddi", "scores": { "intensity_boost": 0.15 } },
      { "pattern": "ciddi anlamda", "scores": { "intensity_boost": 0.18 } },

      // TEMPORAL MARKERS - Zaman belirteçleri (süreklilik)
      { "pattern": "artık", "scores": { "intensity_boost": 0.12 } },
      { "pattern": "hep", "scores": { "intensity_boost": 0.15 } },
      { "pattern": "sürekli", "scores": { "intensity_boost": 0.18 } },
      { "pattern": "her zaman", "scores": { "intensity_boost": 0.15 } },
      { "pattern": "durmadan", "scores": { "intensity_boost": 0.18 } },
      { "pattern": "yine", "scores": { "intensity_boost": 0.10 } },
      { "pattern": "gene", "scores": { "intensity_boost": 0.10 } },

      // COMBINED PATTERNS - Birleşik ifadeler
      { "pattern": "bıktım artık", "scores": { "anger": 0.55, "frustration": 0.35 } },
      { "pattern": "daha fazla dayanamam", "scores": { "stress": 0.60, "anxiety": 0.40 } },
      { "pattern": "canım sıkkın", "scores": { "sadness": 0.45, "frustration": 0.30 } },
      { "pattern": "keşke", "scores": { "sadness": 0.35, "anxiety": 0.25 } },
      { "pattern": "neden ben", "scores": { "sadness": 0.40, "frustration": 0.30 } },
      { "pattern": "neden böyle", "scores": { "sadness": 0.35, "frustration": 0.30 } },

      // MORE ANGER - Daha fazla öfke ifadeleri
      { "pattern": "kıl oldum", "scores": { "anger": 0.55 } },
      { "pattern": "sinir oluyorum", "scores": { "anger": 0.45 } },
      { "pattern": "tepem atıyor", "scores": { "anger": 0.55 } },
      { "pattern": "kan beynime", "scores": { "anger": 0.60 } },
      { "pattern": "kafayı yiyeceğim", "scores": { "anger": 0.55, "stress": 0.35 } },
      { "pattern": "kafayı yemek üzereyim", "scores": { "anger": 0.60, "stress": 0.40 } },
      { "pattern": "kafayı yedim", "scores": { "anger": 0.65 } },
      { "pattern": "saçmalık", "scores": { "anger": 0.40, "frustration": 0.30 } },
      { "pattern": "saçma", "scores": { "anger": 0.35, "frustration": 0.25 } },
      { "pattern": "aklım almıyor", "scores": { "anger": 0.40, "frustration": 0.35 } },
      { "pattern": "öfkeliyim", "scores": { "anger": 0.55 } },
      { "pattern": "çok öfkeliyim", "scores": { "anger": 0.65 } },
      { "pattern": "kuduruyorum", "scores": { "anger": 0.60 } },
      { "pattern": "patlayacağım", "scores": { "anger": 0.60, "stress": 0.35 } },
      { "pattern": "patladım", "scores": { "anger": 0.65 } },
      { "pattern": "lanet olsun", "scores": { "anger": 0.50 } },
      { "pattern": "hay aksi", "scores": { "anger": 0.40, "frustration": 0.30 } },

      // MORE SADNESS - Daha fazla üzüntü ifadeleri  
      { "pattern": "depresyondayım", "scores": { "sadness": 0.70, "anxiety": 0.30 } },
      { "pattern": "depresiftim", "scores": { "sadness": 0.70, "anxiety": 0.30 } },
      { "pattern": "pişmanım", "scores": { "sadness": 0.50, "anxiety": 0.25 } },
      { "pattern": "çok pişmanım", "scores": { "sadness": 0.60, "anxiety": 0.30 } },
      { "pattern": "utanıyorum", "scores": { "sadness": 0.45, "anxiety": 0.35 } },
      { "pattern": "çok utandım", "scores": { "sadness": 0.55, "anxiety": 0.40 } },
      { "pattern": "mahcubum", "scores": { "sadness": 0.45, "anxiety": 0.30 } },
      { "pattern": "kendimi kötü hissediyorum", "scores": { "sadness": 0.55 } },
      { "pattern": "kötü hissediyorum", "scores": { "sadness": 0.50 } },
      { "pattern": "içim kan ağlıyor", "scores": { "sadness": 0.65 } },
      { "pattern": "perişanım", "scores": { "sadness": 0.60, "stress": 0.30 } },
      { "pattern": "berbat hissediyorum", "scores": { "sadness": 0.55, "anger": 0.25 } },
      { "pattern": "yalnızım", "scores": { "sadness": 0.55, "anxiety": 0.30 } },
      { "pattern": "yalnız hissediyorum", "scores": { "sadness": 0.60, "anxiety": 0.30 } },
      { "pattern": "kimse anlamıyor", "scores": { "sadness": 0.50, "frustration": 0.35 } },
      { "pattern": "kimse umursamıyor", "scores": { "sadness": 0.55, "anger": 0.30 } },
      { "pattern": "incinmiş", "scores": { "sadness": 0.50 } },
      { "pattern": "incinmiştim", "scores": { "sadness": 0.50 } },
      { "pattern": "gözümden yaş", "scores": { "sadness": 0.60 } },

      // MORE JOY - Daha fazla mutluluk ifadeleri
      { "pattern": "çok heyecanlıyım", "scores": { "joy": 0.65 } },
      { "pattern": "heyecanlandım", "scores": { "joy": 0.55 } },
      { "pattern": "şahane", "scores": { "joy": 0.55 } },
      { "pattern": "olağanüstü", "scores": { "joy": 0.60 } },
      { "pattern": "efsane", "scores": { "joy": 0.55 } },
      { "pattern": "müthiş", "scores": { "joy": 0.55 } },
      { "pattern": "muazzam", "scores": { "joy": 0.55 } },
      { "pattern": "havalı", "scores": { "joy": 0.45 } },
      { "pattern": "tamamdır", "scores": { "joy": 0.40 } },
      { "pattern": "tamam", "scores": { "joy": 0.30 } },
      { "pattern": "süper oldu", "scores": { "joy": 0.60 } },
      { "pattern": "çok iyi oldu", "scores": { "joy": 0.60 } },
      { "pattern": "başardım", "scores": { "joy": 0.65, "gratitude": 0.20 } },
      { "pattern": "oldu", "scores": { "joy": 0.40 } },
      { "pattern": "işe yaradı", "scores": { "joy": 0.50 } },
      { "pattern": "sonunda", "scores": { "joy": 0.45 } },
      { "pattern": "gurur duyuyorum", "scores": { "joy": 0.55 } },
      { "pattern": "mutlu sona", "scores": { "joy": 0.60 } },
      { "pattern": "neşeliyim", "scores": { "joy": 0.50 } },
      { "pattern": "zevk alıyorum", "scores": { "joy": 0.50 } },
      { "pattern": "hoşuma gitti", "scores": { "joy": 0.45 } },
      { "pattern": "beğendim", "scores": { "joy": 0.40 } },
      { "pattern": "sevdim", "scores": { "joy": 0.50 } },

      // MORE ANXIETY - Daha fazla kaygı ifadeleri
      { "pattern": "ne yapacağım", "scores": { "anxiety": 0.50 } },
      { "pattern": "ne yapacağımı bilemiyorum", "scores": { "anxiety": 0.55 } },
      { "pattern": "nasıl yapacağım", "scores": { "anxiety": 0.45 } },
      { "pattern": "emin değilim", "scores": { "anxiety": 0.40 } },
      { "pattern": "bilmiyorum ki", "scores": { "anxiety": 0.40, "frustration": 0.25 } },
      { "pattern": "olur mu", "scores": { "anxiety": 0.45 } },
      { "pattern": "olacak mı", "scores": { "anxiety": 0.45 } },
      { "pattern": "yapabilir miyim", "scores": { "anxiety": 0.45 } },
      { "pattern": "yapamam", "scores": { "anxiety": 0.50, "frustration": 0.35 } },
      { "pattern": "beceremedim", "scores": { "anxiety": 0.40, "frustration": 0.45 } },
      { "pattern": "yanlış giderse", "scores": { "anxiety": 0.55 } },
      { "pattern": "korkuyorum ki", "scores": { "anxiety": 0.55 } },
      { "pattern": "endişe ediyorum", "scores": { "anxiety": 0.50 } },

      // MORE STRESS - Daha fazla stres ifadeleri
      { "pattern": "çok işim var", "scores": { "stress": 0.50 } },
      { "pattern": "işler çok yoğun", "scores": { "stress": 0.50 } },
      { "pattern": "zamanım yok", "scores": { "stress": 0.50, "anxiety": 0.30 } },
      { "pattern": "yetişmeyecek", "scores": { "stress": 0.55, "anxiety": 0.35 } },
      { "pattern": "çok yoğunum", "scores": { "stress": 0.50 } },
      { "pattern": "başım ağrıyor", "scores": { "stress": 0.45, "tired": 0.30 } },
      { "pattern": "kafam patladı", "scores": { "stress": 0.55 } },
      { "pattern": "kafam patlayacak", "scores": { "stress": 0.55, "anxiety": 0.30 } },
      { "pattern": "nefes alamıyorum", "scores": { "stress": 0.60, "anxiety": 0.45 } },
      { "pattern": "sıkıştım", "scores": { "stress": 0.55, "anxiety": 0.35 } },
      { "pattern": "çok şey var", "scores": { "stress": 0.45 } },

      // MORE FRUSTRATION - Daha fazla hayal kırıklığı
      { "pattern": "gene olmadı", "scores": { "frustration": 0.50 } },
      { "pattern": "yine olmadı", "scores": { "frustration": 0.50 } },
      { "pattern": "yine aynı", "scores": { "frustration": 0.45, "anger": 0.25 } },
      { "pattern": "hiçbir şey değişmedi", "scores": { "frustration": 0.50, "sadness": 0.30 } },
      { "pattern": "fayda yok", "scores": { "frustration": 0.45, "sadness": 0.25 } },
      { "pattern": "nafile", "scores": { "frustration": 0.45, "sadness": 0.30 } },
      { "pattern": "boşver", "scores": { "frustration": 0.40, "sadness": 0.25 } },
      { "pattern": "uğraşma", "scores": { "frustration": 0.40 } },
      { "pattern": "bırak", "scores": { "frustration": 0.35 } },
      { "pattern": "vazgeçtim", "scores": { "frustration": 0.50, "sadness": 0.35 } },
      { "pattern": "pes ettim", "scores": { "frustration": 0.55, "sadness": 0.40 } },

      // ENGLISH PATTERNS - İngilizce ifadeler
      { "pattern": "i'm sad", "scores": { "sadness": 0.50 } },
      { "pattern": "i'm angry", "scores": { "anger": 0.50 } },
      { "pattern": "i'm happy", "scores": { "joy": 0.50 } },
      { "pattern": "i'm stressed", "scores": { "stress": 0.50 } },
      { "pattern": "i'm anxious", "scores": { "anxiety": 0.50 } },
      { "pattern": "i'm tired", "scores": { "tired": 0.50 } },
      { "pattern": "i'm frustrated", "scores": { "frustration": 0.50 } },
      { "pattern": "feeling down", "scores": { "sadness": 0.45 } },
      { "pattern": "feeling great", "scores": { "joy": 0.50 } },
      { "pattern": "feeling good", "scores": { "joy": 0.45 } },
      { "pattern": "feeling bad", "scores": { "sadness": 0.45 } },
      { "pattern": "pissed off", "scores": { "anger": 0.60 } },
      { "pattern": "fed up", "scores": { "anger": 0.50, "frustration": 0.35 } },
      { "pattern": "sick of", "scores": { "anger": 0.45, "frustration": 0.40 } },
      { "pattern": "so mad", "scores": { "anger": 0.55 } },
      { "pattern": "so happy", "scores": { "joy": 0.60 } },
      { "pattern": "so sad", "scores": { "sadness": 0.60 } },
      { "pattern": "depressed", "scores": { "sadness": 0.65 } },
      { "pattern": "upset", "scores": { "sadness": 0.45, "anger": 0.30 } },
      { "pattern": "miserable", "scores": { "sadness": 0.60 } },
      { "pattern": "awful", "scores": { "sadness": 0.45, "anger": 0.30 } },
      { "pattern": "terrible", "scores": { "sadness": 0.45, "anger": 0.30 } },
      { "pattern": "horrible", "scores": { "sadness": 0.45, "anger": 0.30 } },
      { "pattern": "amazing", "scores": { "joy": 0.60 } },
      { "pattern": "awesome", "scores": { "joy": 0.60 } },
      { "pattern": "fantastic", "scores": { "joy": 0.60 } },
      { "pattern": "wonderful", "scores": { "joy": 0.55 } },
      { "pattern": "excellent", "scores": { "joy": 0.55 } },
      { "pattern": "worried", "scores": { "anxiety": 0.50 } },
      { "pattern": "nervous", "scores": { "anxiety": 0.50 } },
      { "pattern": "scared", "scores": { "anxiety": 0.55 } },
      { "pattern": "afraid", "scores": { "anxiety": 0.55 } },
      { "pattern": "freaking out", "scores": { "anxiety": 0.65 } },
      { "pattern": "overwhelmed", "scores": { "stress": 0.60, "anxiety": 0.35 } },
      { "pattern": "exhausted", "scores": { "tired": 0.60 } },

      // CONTEXTUAL - Bağlamlı ifadeler
      { "pattern": "her şey yolunda", "scores": { "joy": 0.45 } },
      { "pattern": "her şey güzel", "scores": { "joy": 0.50 } },
      { "pattern": "her şey iyi", "scores": { "joy": 0.45 } },
      { "pattern": "her şey ters gidiyor", "scores": { "frustration": 0.55, "anxiety": 0.35 } },
      { "pattern": "her şey kötü", "scores": { "sadness": 0.50, "frustration": 0.35 } },
      { "pattern": "işler iyi gidiyor", "scores": { "joy": 0.50 } },
      { "pattern": "işler kötü gidiyor", "scores": { "sadness": 0.45, "frustration": 0.40 } },
      { "pattern": "daha iyi hissediyorum", "scores": { "joy": 0.45 } },
      { "pattern": "daha kötü oldum", "scores": { "sadness": 0.50, "anxiety": 0.30 } },
      { "pattern": "iyileştim", "scores": { "joy": 0.50 } },
      { "pattern": "kötüleştim", "scores": { "sadness": 0.50 } },
      { "pattern": "rahatladım", "scores": { "joy": 0.50 } },
      { "pattern": "rahatsızım", "scores": { "anxiety": 0.45, "anger": 0.30 } },
      { "pattern": "kafam rahat", "scores": { "joy": 0.45 } },
      { "pattern": "içim rahat", "scores": { "joy": 0.45 } },
      { "pattern": "kafamda değilim", "scores": { "anxiety": 0.50, "stress": 0.35 } },
      { "pattern": "moralim yerinde", "scores": { "joy": 0.50 } },
      { "pattern": "iyi değilim", "scores": { "sadness": 0.50 } },
      { "pattern": "fena değilim", "scores": { "joy": 0.30 } },
      { "pattern": "idare eder", "scores": { "joy": 0.25 } },
      { "pattern": "eh işte", "scores": { "frustration": 0.25 } }
    ],
    "labels": ["joy", "sadness", "anger", "anxiety", "stress", "neutral", "gratitude", "tired", "frustration"]
  },
  "emotionSummary": {
    "enabled": true,
    "cooldownMessages": 10,
    "templates": {
      "anger": [
        "Son mesajlarında biraz gerginlik hissi var gibi. İstersen hızlıca çözüm odaklı gidelim.",
        "Biraz sinirli hissettiriyor olabilir—yanlışsam düzelt. Şu an en acil konu ne?"
      ],
      "anxiety": [
        "Bir süredir kaygı/acele hissi var gibi. İstersen adım adım ilerleyelim.",
        "Stresli bir dönem gibi duruyor. En çok hangi kısım sıkıştırıyor?"
      ],
      "sadness": [
        "Biraz moral düşüklüğü var gibi. İstersen konuşabiliriz; istersen de çözüm arayabiliriz.",
        "Üzgün hissettiriyor olabilir—ister misin biraz açalım?"
      ],
      "stress": [
        "Son mesajlarında biraz stres/gerginlik var gibi. İstersen adım adım ilerleyelim.",
        "Stresli bir dönem gibi duruyor. En çok hangi kısım zorlayıcı?"
      ],
      "frustration": [
        "Biraz zorlanıyor gibi görünüyorsun. İstersen birlikte çözelim.",
        "Zor bir durum gibi. En çok ne rahatsız ediyor?"
      ]
    }
  }
};
