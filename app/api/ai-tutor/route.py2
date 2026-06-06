import os
import json
from starlette.responses import JSONResponse
from openai import OpenAI

async def POST(request):
    """Interactive Real-time AI Coaching Session State Handler."""
    try:
        body = await request.json()
        cv_context = body.get("cv_context", "General Enterprise")
        user_answer = body.get("user_answer", "")
        stage = body.get("interview_stage", "Technical Screening")

        client = OpenAI(api_key=os.getenv("OPENAI_API_KEY", "mock-key"))
        prompt = f"Candidate background context: {cv_context}. Response given: {user_answer} at stage {stage}. Critically evaluate and provide the next structural question in strict JSON with keys: 'critique', 'next_question'."
        
        response = client.chat.completions.create(
            model="gpt-4-turbo",
            messages=[{"role": "user", "content": prompt}],
            response_format={"type": "json_object"},
            temperature=0.3
        )
        
        return JSONResponse({"status": "Success", "evaluation": json.loads(response.choices[0].message.content)})
    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=500)
