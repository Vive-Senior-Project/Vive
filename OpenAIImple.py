import openai
import os
from dotenv import load_dotenv

# this is the API key
load_dotenv(dotenv_path="/Users/tejaswinisankar/Documents/Senior Project/OpenAI40-mini/key.env") # key.env path
openai.api_key = os.getenv("OPENAI_API_KEY") # getting the key value from the key.env

if openai.api_key == None: #checking if API key is there
    raise ValueError ("API key is not there)")

sys_mess = ("I am a personal health and wellness coach specifically used to aid women in their health journey. Based off your responses, I will generate a paragraph to plan your day") 

skill_level = "Beginner" #input("Are you a beginner, intermediate, or advanced?") # user inputs any help they need

weight_interest = True #input("Are you interested in doing a weight training? ") # user inputs any help they need

cardio = True  #input("Do you do any cardio or are you interested in any?")

add_comm = ""  #input("Feel free to tell any questions, comments, or concerns you might have!")

yoga = False #input("Have you done yoga before, and interested doing more?")

print(f"I am a {skill_level}, and I am interested in the following: Cardio: {cardio}, Weight Training: {weight_interest}, Yoga: {yoga}. I also have these additional comments I'd like to add: {add_comm}")

the_resp_to_give = openai.chat.completions.create(
    model="gpt-4o-mini", # 4o mini model using
    messages=[
        {"role": "system", "content": sys_mess}, #system is giving out the message
        {"role": "system", "content": f"I am a {skill_level}, and I am interested in the following: Cardio: {cardio}, Weight Training: {weight_interest}, Yoga: {yoga}. I also have these additional comments I'd like to add: {add_comm}"}
        #{"role": "user", "content": skill_level}, #given by user
        #{"role": "user", "content": cardio}, #cardio by user
        #{"role": "user", "content": weight_interest}, # if user does weight training
        #{"role": "user", "content": yoga}, 
        #{"role": "user", "content": add_comm}
    ],
    max_tokens=300 #300 tokens are set
)




# printed response
print(the_resp_to_give.choices[0].message.content)
