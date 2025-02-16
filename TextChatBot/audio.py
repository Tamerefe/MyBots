import speech_recognition as sr
import keyboard
from colorama import Fore, Style

def speech_to_text():
    recognizer = sr.Recognizer()

    while True:
        print("Press ENTER to start speaking...")
        keyboard.wait("enter")  # Wait for the Enter key to be pressed

        with sr.Microphone() as source:
            print(Fore.YELLOW + "You can start speaking..." + Style.RESET_ALL)
            recognizer.adjust_for_ambient_noise(source)
            audio = recognizer.listen(source, phrase_time_limit=None)

        print("Press SPACE to stop speaking...")
        keyboard.wait("space")  # Wait for the Space key to be pressed

        try:
            text = recognizer.recognize_google(audio, language="en-US")
            return text
        except sr.UnknownValueError:
            print(Fore.RED + "Could not understand the audio." + Style.RESET_ALL)
        except sr.RequestError:
            print(Fore.RED + "Could not access the service." + Style.RESET_ALL)

if __name__ == "__main__":
    speech_to_text()