import re
import random

R_EATING = "I don't like eating anything because I'm a bot obviously!"
R_ADVICE = "If I were you, I would go to the internet and type exactly what you wrote there!"
R_HOW_ARE_YOU = "I'm doing fine, thanks for asking!"

# Stores the conversation context (previous user input)
conversation_history = []

def unknown():
    response = ["Could you please re-phrase that? ",
                "...",
                "Sounds about right.",
                "What does that mean?"][
        random.randrange(4)]
    return response

def messageP(user_message, RecogniseWord, single_response=False, required_words=[]):
    msgCertain = 0
    has_required_words = True

    # Counts how many words are present in each predefined message
    for word in user_message:
        if word in RecogniseWord:
            msgCertain += 1

    # Calculates the percent of recognised words in a user message
    percentage = float(msgCertain) / float(len(RecogniseWord))

    # Checks that the required words are in the string
    for word in required_words:
        if word not in user_message:
            has_required_words = False
            break

    # Must either have the required words, or be a single response
    if has_required_words or single_response:
        return int(percentage * 100)
    else:
        return 0


def checkMsg(message):
    highest_prob_list = {}

    # Simplifies response creation / adds it to the dict
    def response(bot_response, list_of_words, single_response=False, required_words=[]):
        nonlocal highest_prob_list
        highest_prob_list[bot_response] = messageP(message, list_of_words, single_response, required_words)

    # Responses -------------------------------------------------------------------------------------------------------
    response('Hello!', ['hello', 'hi', 'hey', 'sup', 'heyo'], single_response=True)
    response('See you!', ['bye', 'goodbye'], single_response=True)
    response('I\'m doing fine, and you?', ['how', 'are', 'you', 'doing'], required_words=['how'])
    response('You\'re welcome!', ['thank', 'thanks'], single_response=True)
    response('Thank you!', ['i', 'love', 'code', 'palace'], required_words=['code', 'palace'])

    # Longer responses
    response(R_ADVICE, ['give', 'advice'], required_words=['advice'])
    response(R_EATING, ['what', 'you', 'eat'], required_words=['you', 'eat'])

    best_match = max(highest_prob_list, key=highest_prob_list.get)

    # If no strong match is found, return unknown
    return unknown() if highest_prob_list[best_match] < 1 else best_match


def responseGet(user_input):
    split_message = re.split(r'\s+|[,;?!.-]\s*', user_input.lower())
    response = checkMsg(split_message)
    
    # Save the latest user input into conversation history
    conversation_history.append(user_input.lower())

    return response

def ask_follow_up():
    follow_up_questions = [
        "Tell me more about that.",
        "What happened next?",
        "Can you elaborate?",
        "Why do you think that is?"
    ]
    return random.choice(follow_up_questions)

def colorize_response(response):
    colors = ['\033[91m', '\033[92m', '\033[93m', '\033[94m', '\033[95m', '\033[96m']
    reset_color = '\033[0m'
    color = random.choice(colors)
    return f"{color}{response}{reset_color}"

def handle_audio_input(audio_text):
    response = responseGet(audio_text)
    if random.random() < 0.2:  # 20% chance to ask a follow-up
        return colorize_response(ask_follow_up())
    else:
        return colorize_response(response)

# Main loop to allow continuous conversation
if __name__ == "__main__":
    from audio import speech_to_text

    while True:
        audio_text = speech_to_text()
        if audio_text:
            print('You: ' + audio_text)
            print('Ulku: ' + handle_audio_input(audio_text))
