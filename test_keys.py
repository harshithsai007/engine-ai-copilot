import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv(dotenv_path='backend/.env')

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def test_openai():
    try:
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[{"role": "user", "content": "Say hello"}],
            max_tokens=10
        )
        print("OpenAI Success:", response.choices[0].message.content)
    except Exception as e:
        print("OpenAI Error:", e)

if __name__ == "__main__":
    test_openai()
