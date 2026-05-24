import os
from fastapi import FastAPI, UploadFile, File, Form
from pydantic import BaseModel
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="EngineAI Co-Pilot Backend")

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

class AnalysisRequest(BaseModel):
    text: str | None = None

@app.get("/")
def read_root():
    return {"message": "EngineAI Co-Pilot API is running"}

@app.post("/analyze")
async def analyze_input(
    text: str = Form(None),
    image: UploadFile = File(None)
):
    # System prompt for conceptual guidance
    system_prompt = (
        "You are an expert technical interviewer. Provide conceptual guidance, "
        "not just raw code. Help the user understand the underlying principles "
        "of the problem they are facing."
    )

    messages = [{"role": "system", "content": system_prompt}]
    
    if text:
        messages.append({"role": "user", "content": f"Analyze this question: {text}"})
    
    # Simple text-based completion for MVP
    response = client.chat.completions.create(
        model="gpt-4-turbo",
        messages=messages,
        max_tokens=500
    )
    
    return {"guidance": response.choices[0].message.content}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
