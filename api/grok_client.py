"""
Grok API Client for EduQuest
Provides AI-powered tutoring and exercise generation
"""

import json
import os
from pathlib import Path

# Try to import httpx for async requests, fall back to requests
try:
    import httpx
    HAS_HTTPX = True
except ImportError:
    HAS_HTTPX = False
    try:
        import requests
        HAS_REQUESTS = True
    except ImportError:
        HAS_REQUESTS = False

# Load config
CONFIG_PATH = Path(__file__).parent.parent / "config.json"

def load_config():
    """Load configuration from config.json"""
    if CONFIG_PATH.exists():
        return json.loads(CONFIG_PATH.read_text(encoding='utf-8'))
    return {}

config = load_config()
API_KEY = config.get('api', {}).get('api_key', '')
BASE_URL = config.get('api', {}).get('base_url', 'https://api.x.ai/v1')
MODEL = config.get('api', {}).get('model', 'grok-beta')

# System prompts for different contexts
SYSTEM_PROMPTS = {
    'tutor_rebecca': """Ești EduBot, un tutor prietenos pentru Rebecca, o fetiță de 9 ani în clasa a III-a.
Vorbește în română, simplu și încurajator. Folosește emoji-uri pentru a face conversația distractivă.
Rebecca este tehnică și îi place logica. Adaptează răspunsurile la nivelul ei.
Fii răbdător, explică pas cu pas, și laudă-o când face bine.
Limitează răspunsurile la maxim 3-4 propoziții pentru a nu o copleși.""",

    'tutor_brianna': """Ești EduBot, un tutor prietenos pentru Brianna, o fetiță de 7 ani în clasa I.
Vorbește foarte simplu în română, cu multe emoji-uri și cuvinte vesele.
Brianna este artistică și creativă. Folosește exemple vizuale și colorate.
Fii foarte încurajator, explică totul foarte simplu, ca pentru un copil de 7 ani.
Răspunsuri scurte, maxim 2-3 propoziții.""",

    'exercise_generator': """Ești un generator de exerciții educaționale pentru copii.
Generează exerciții în format JSON cu structura:
{
    "question": "textul întrebării",
    "type": "choice" sau "math" sau "text",
    "options": ["opțiune1", "opțiune2", ...],  // pentru type=choice
    "answer": "răspunsul corect",
    "hint": "un indiciu de ajutor",
    "points": 10
}
Adaptează dificultatea la clasa specificată.""",

    'analytics': """Analizează datele de progres și oferă insights valoroase despre:
- Punctele forte ale copilului
- Ariile care necesită îmbunătățire
- Stilul de învățare
- Recomandări personalizate
Răspunde în română, structurat și util pentru părinți."""
}

def chat(message: str, user: str = 'rebecca', context: str = 'tutor') -> str:
    """
    Send a message to Grok and get a response.
    
    Args:
        message: The user's message
        user: 'rebecca' or 'brianna' for personalized responses
        context: 'tutor', 'exercise_generator', or 'analytics'
    
    Returns:
        AI response as string
    """
    if not API_KEY:
        return "⚠️ API key nu este configurat. Verifică config.json."
    
    system_key = f'{context}_{user}' if context == 'tutor' else context
    system_prompt = SYSTEM_PROMPTS.get(system_key, SYSTEM_PROMPTS['tutor_rebecca'])
    
    headers = {
        'Authorization': f'Bearer {API_KEY}',
        'Content-Type': 'application/json'
    }
    
    payload = {
        'model': MODEL,
        'messages': [
            {'role': 'system', 'content': system_prompt},
            {'role': 'user', 'content': message}
        ],
        'temperature': 0.7,
        'max_tokens': 500
    }
    
    try:
        if HAS_HTTPX:
            with httpx.Client() as client:
                response = client.post(
                    f'{BASE_URL}/chat/completions',
                    headers=headers,
                    json=payload,
                    timeout=30.0
                )
                response.raise_for_status()
                data = response.json()
        elif HAS_REQUESTS:
            response = requests.post(
                f'{BASE_URL}/chat/completions',
                headers=headers,
                json=payload,
                timeout=30
            )
            response.raise_for_status()
            data = response.json()
        else:
            return "⚠️ Nicio bibliotecă HTTP disponibilă. Instalează: pip install httpx"
        
        return data['choices'][0]['message']['content']
    
    except Exception as e:
        print(f"Grok API Error: {e}")
        return f"⚠️ Eroare la comunicarea cu AI: {str(e)}"

def generate_exercise(subject: str, grade: int, difficulty: str = 'medium') -> dict:
    """
    Generate a personalized exercise using AI.
    
    Args:
        subject: 'matematica', 'romana', 'engleza'
        grade: 1 or 3
        difficulty: 'easy', 'medium', 'hard'
    
    Returns:
        Exercise dict with question, type, options, answer, hint
    """
    prompt = f"""Generează UN exercițiu de {subject} pentru clasa {grade}, dificultate {difficulty}.
Răspunde DOAR cu JSON valid, nimic altceva."""
    
    response = chat(prompt, context='exercise_generator')
    
    try:
        # Try to extract JSON from response
        start = response.find('{')
        end = response.rfind('}') + 1
        if start >= 0 and end > start:
            return json.loads(response[start:end])
    except json.JSONDecodeError:
        pass
    
    # Fallback exercise
    return {
        'question': 'Cât face 2 + 2?',
        'type': 'math',
        'answer': 4,
        'hint': 'Numără pe degete!',
        'points': 10
    }

def analyze_progress(user: str, stats: dict) -> str:
    """
    Analyze user progress and provide insights.
    
    Args:
        user: 'rebecca' or 'brianna'
        stats: User statistics dict
    
    Returns:
        Analysis and recommendations as string
    """
    prompt = f"""Analizează progresul pentru {user}:
- Puncte totale: {stats.get('totalPoints', 0)}
- Misiuni completate: {stats.get('questsCompleted', 0)}
- Streak curent: {stats.get('streak', 0)} zile
- Procent corect matematică: {stats.get('mathAccuracy', 0)}%
- Procent corect română: {stats.get('romanaAccuracy', 0)}%
- Procent corect engleză: {stats.get('englezaAccuracy', 0)}%

Oferă insight-uri pentru părinți și recomandări pentru următoarea săptămână."""
    
    return chat(prompt, context='analytics')

# Quick test
if __name__ == '__main__':
    print("Testing Grok API connection...")
    print("-" * 40)
    
    # Test tutor chat
    response = chat("Care sunt culorile curcubeului?", user='brianna')
    print(f"Tutor response: {response}")
    print("-" * 40)
    
    # Test exercise generation
    exercise = generate_exercise('matematica', 3, 'easy')
    print(f"Generated exercise: {json.dumps(exercise, indent=2, ensure_ascii=False)}")
