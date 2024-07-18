if ("Notification" in window) {
    
    if (Notification.permission === 'granted') {
        notify();
    } else {
        Notification.requestPermission().then(() => {
            if (res === 'granted'){
                notify();
            } else if (res === 'denied') {
                console.log("Notifications access denied")
            } else if (res === 'default') {
                console.log("Notifications permission not given")
            }
        })
    }
} else {
    console.error("Notification not supported")
}

const button = document.getElementById("pop-up");

button.addEventListener("click", (event) => {
    notify()
});

function notify() {
    new Notification("Merhaba Ben Sofia",{
        body: `Emoji Kullanma Tuşuna Basmış Bulunmaktasınız`,
        icon: './c1.jpg',
        vibrate: [200,100,200]
    });
}