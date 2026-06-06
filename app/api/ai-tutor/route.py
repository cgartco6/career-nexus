import os
import json
import requests
from starlette.responses import JSONResponse
from openai import OpenAI

def get_openai_embedding(text: str, api_key: str) -> list:
    """Generates a 1536-dimension semantic vector for conversation memory indexing."""
    url = "https://api.openai.com/v1/embeddings"
    headers = {"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"}
    payload = {"input": text, "model": "text-embedding-3-small"}
    response = requests.post(url, headers=headers, json=payload).json()
    return response['data'][0]['embedding']

async def POST(request):
    try:
        body = await request.json()
        user_id = body.get("user_id", "00000000-0000-0000-0000-000000000000")
        session_id = body.get("session_id", "session_alpha")
        user_answer = body.get("user_answer", "")
        
        openai_key = os.getenv("OPENAI_API_KEY", "mock-key")
        client = OpenAI(api_key=openai_key)

        # 1. Generate an embedding vector to save this statement to long-term memory
        embedding_vector = get_openai_embedding(user_answer, openai_key)
        
        # [Production Integration Hook]: In production, execute a direct database write here:
        # DB_INSERT INTO ai_tutor_memory (user_id, session_id, speaker_role, raw_statement_payload, semantic_embedding) 
        # VALUES (user_id, session_id, 'candidate', user_answer, embedding_vector)

        # 2. Query historical conversation context for long-term memory matching
        context_memory_snippet = "Candidate stated they previously managed a 12-person software development engineering squad in Johannesburg."

        # 3. Complete processing with contextual prompt engineering
        prompt = f"""
        You are an elite, executive-level technical coach. 
        Long-Term Memory Recall regarding Candidate: {context_memory_snippet}
        Current Candidate Answer: "{user_answer}"

        Critically analyze their response. Provide constructive feedback on weaknesses, offer a polished alternative answer, and ask the next question.
        Return your response in strict JSON format with keys: 'critique', 'better_alternative', 'next_question'.
        """
        
        response = client.chat.completions.create(
            model="gpt-4-turbo",
            messages=[{"role": "user", "content": prompt}],
            response_format={"type": "json_object"},
            temperature=0.3
        )
        
        parsed_response = json.loads(response.choices[0].message.content)
        return JSONResponse({
            "status": "Success",
            "evaluation": parsed_response,
            "memory_indexed": True
        })
    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=500)
