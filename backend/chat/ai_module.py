import openai
from django.utils import timezone

openai.api_key = "OPENAPIKEY"

def generate_ai_response(messages):
    """
    Generate AI response for the current conversation.
    messages: list of dicts with 'sender' and 'content'
    """
    context = "\n".join([f"{m['sender']}: {m['content']}" for m in messages])

    response = openai.chat.completions.create(
        model="gpt-3.5-turbo",  # widely accessible model
        messages=[
            {"role": "system", "content": "You are an AI assistant."},
            {"role": "user", "content": context}
        ]
    )

    return response.choices[0].message.content


def summarize_conversation(messages):
    """
    Generate summary for a completed conversation.
    messages: list of dicts with 'sender' and 'content'
    """
    context = "\n".join([f"{m['sender']}: {m['content']}" for m in messages])

    response = openai.chat.completions.create(
        model="gpt-3.5-turbo",  # widely accessible model
        messages=[
            {"role": "system", "content": "Summarize the conversation, highlight key topics, decisions, and action items."},
            {"role": "user", "content": context}
        ]
    )

    return response.choices[0].message.content