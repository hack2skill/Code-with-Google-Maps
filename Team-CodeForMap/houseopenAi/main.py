import speech_recognition as sr
import os
import webbrowser
import openai
from config import apikey
import datetime
import pyttsx3
import speech_recognition as sr

chatStr = ""

def chat(query):
    global chatStr
    print(chatStr)
    openai.api_key = apikey
    chatStr += f"Ankush: {query}\n loco: "
    response = openai.Completion.create(
        model="text-davinci-003",
        prompt= chatStr,
        temperature=0.7,
        max_tokens=256,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0
    )
    speak(response["choices"][0]["text"])
    chatStr += f"{response['choices'][0]['text']}\n"
    return response["choices"][0]["text"]

def ai(prompt):
    openai.api_key = apikey
    text = f"OpenAI response for Prompt: {prompt} \n *************************\n\n"
    response = openai.Completion.create(
        model="text-davinci-003",
        prompt=prompt,
        temperature=0.7,
        max_tokens=256,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0
    )
    text += response["choices"][0]["text"]
    if not os.path.exists("Openai"):
        os.mkdir("Openai")
    with open(f"Openai/{''.join(prompt.split('intelligence')[1:]).strip()}.txt", "w") as f:
        f.write(text)

def speak(text):
    engine = pyttsx3.init()
    engine.say(text)
    engine.runAndWait()

def takeCommand():
    r = sr.Recognizer()
    with sr.Microphone() as source:
        print("Listening...")
        r.adjust_for_ambient_noise(source)
        audio = r.listen(source)

    try:
        print("Recognizing...")
        query = r.recognize_google(audio, language='en-in')
        print(f"User said: {query}")
        return query
    except sr.UnknownValueError:
        speak("Sorry, I didn't catch that. Could you please repeat?")
        return takeCommand()
    except sr.RequestError:
        speak("I'm sorry, but I couldn't access the internet to recognize your speech. Please check your connection.")
        return None

if __name__ == '__main__':
    speak("Hello, I'm loco, your voice assistant, and I'm here to help you with the 'HouseForYou' app. Let's get started!")
    while True:
        user_input = takeCommand().lower()
        sites = [["youtube", "https://www.youtube.com"], ["wikipedia", "https://www.wikipedia.com"], ["google", "https://www.google.com"]]
        for site in sites:
            if f"Open {site[0]}".lower() in user_input:
                speak(f"Opening {site[0]} sir...")
                webbrowser.open(site[1])
        if "open music" in user_input:
            musicPath = "C:/Users/artim/Downloads/Egzod & Maestro Chives - Royalty (Don Diablo Remix) [NCS Release].mp3"
            os.startfile(musicPath)
        elif "the time" in user_input:
            hour = datetime.datetime.now().strftime("%H")
            min = datetime.datetime.now().strftime("%M")
            speak(f"Sir time is {hour} bajke {min} minutes")
        elif "Using artificial intelligence".lower() in user_input.lower():
            ai(prompt=user_input)
        elif "stop".lower() in user_input.lower():
            speak("good Bye")
            exit()
        elif "reset chat".lower() in user_input.lower():
            chatStr = ""
        elif "one person " in user_input:
            response = "I have two rooms in Delhi for one person:\n1. Rajendra Nagar - Price: 3000 rupees\n2. Rajeev Chowk - Price: 4000 rupees"
            speak(response)
        elif "two person " in user_input:
            response = "I have two rooms in meerut for two person:\n1. Shastri Nagar - Price: 10000 rupees\n2. k-block  - Price: 8000 rupees"
            speak(response)
        else:
            print("Chatting...")
            chat(user_input)
