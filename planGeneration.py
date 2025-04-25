import openai
from dotenv import load_dotenv
import os

load_dotenv()

openai_key = os.getenv("OPENAI_API_KEY")

sys_mess = ('You are a personal health and wellness coach texting your client what you think you should do today. '
            'Based on your client\'s response, you will give extremely high quality and specific recommendations. '
            'You will tell them what to do, and how to do it, all while encouraging your client. '
            'Always start out by greeting the client. Keep professional, but semi-casual. '
            'Avoid first person pronouns and overly dramatic verbs, and put your response in paragraph format. ')

skill_level = "Beginner"
weight_interest = True
cardio = True
add_comm = ""
yoga = False

user_mess = (f"I am a {skill_level}, and I am interested in the following: "
             f"Cardio: {cardio}, Weight Training: {weight_interest}, "
             f"Yoga: {yoga}. I also have these additional comments I'd like to add: {add_comm}")

response = openai.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
        {"role": "system", "content": sys_mess},
        {"role": "user", "content": user_mess}
    ],
    max_tokens=300
)

print(response.choices[0].message.content)