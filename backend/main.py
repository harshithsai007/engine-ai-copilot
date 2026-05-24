import os
import base64
from fastapi import FastAPI, UploadFile, File, Form
from pydantic import BaseModel
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="EngineAI Co-Pilot Backend")

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

@app.get("/")
def read_root():
    return {"message": "EngineAI Co-Pilot API is running"}

@app.post("/analyze")
async def analyze_input(
    text: str = Form(None),
    image: UploadFile = File(None)
):
    system_prompt = (
        "You are an expert technical interviewer. Provide conceptual guidance, "
        "not just raw code. Help the user understand the underlying principles "
        "of the problem they are facing based on the provided screen capture or question."
    )

    messages = [{"role": "system", "content": system_prompt}]
    
    if text:
        messages.append({"role": "user", "content": [{"type": "text", "text": f"Analyze this question: {text}"}]})
    
    if image:
        contents = await image.read()
        base64_image = base64.b64encode(contents).decode('utf-8')
        messages.append({
            "role": "user",
            "content": [
                {"type": "text", "text": "Analyze this technical context from my screen."},
                {
                    "type": "image_url",
                    "image_url": {
                        "url": f"data:image/jpeg;base64,{base64_image}"
                    }
                }
            ]
        })
    
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=messages,
        max_tokens=500
    )
    
    return {"guidance": response.choices[0].message.content}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
