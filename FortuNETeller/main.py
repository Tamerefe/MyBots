import random
from tkinter import ttk
from tkinter import *
import json
import locale

# Ana pencere oluşturuluyor
window = Tk()
window.geometry("1280x720")
window.title("FortuNETeller")

# Arka plan resmi ekleniyor
bg = PhotoImage(file="../MyBots/FortuNETeller/assets/img/fortune.png")
Label(window, image=bg).place(x=0, y=0, relwidth=1, relheight=1, anchor="nw")

# Başlık etiketi
Label(window, text="FortuNETeller", font=("Helvetica", 28, "bold"), fg="#ffcc00", bg="#222222").pack(pady=60)

# Çerçeve (Frame) oluşturuluyor
frame = Frame(window, bg="#222222")
frame.pack(pady=20)

# Fal metni etiketi
fortune_label = Label(
    frame,
    text="Düğmeye bas ve kaderini öğren!",
    font=("Arial", 16, "bold"),
    wraplength=600,
    bg="#ffffff",
    fg="#222222",
    padx=20,
    pady=20,
    borderwidth=3,
    relief="solid"
)
fortune_label.grid(row=0, column=0, columnspan=2, pady=10, padx=10)

def load_fortunes_tr(filename="../MyBots/FortuNETeller/assets/language/tr.json"):
    with open(filename, "r", encoding="utf-8") as file:
        return json.load(file)["fortunes"]

def load_fortunes_eng(filename="../MyBots/FortuNETeller/assets/language/eng.json"):
    with open(filename, "r", encoding="utf-8") as file:
        return json.load(file)["fortunes"]

current_locale, encoding = locale.getlocale()
# Dil kontrolü
if current_locale and current_locale.startswith("eng"):
    FortuneList = load_fortunes_tr()
else:
    FortuneList = load_fortunes_eng()
    
# Fal gösteren fonksiyon
def tell_fortune():
    fortune_label.config(text=random.choice(FortuneList))

# Buton stilleri
style = ttk.Style()
style.configure('TButton', font=('Helvetica', 14, 'bold'), padding=12, background="#444444", foreground="#ffcc00")
style.map('TButton', foreground=[('active', '#ffcc00')], background=[('active', '#333333')])

# Fal butonu
fortune_button = ttk.Button(frame, text="Düğmeye Bas ve Kaderini Öğren", command=tell_fortune, style='TButton', cursor="hand2")
fortune_button.grid(row=1, column=0, padx=20, pady=20, sticky="ew")

# Çıkış butonu
exit_button = ttk.Button(frame, text="Çıkış", command=window.quit, style='TButton', cursor="hand2")
exit_button.grid(row=1, column=1, padx=20, pady=20, sticky="ew")

# Ana döngüyü başlat
window.mainloop()