from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone
from .models import Conversation, Message
from .serializers import ConversationSerializer
from .ai_module import generate_ai_response, summarize_conversation

class ConversationViewSet(viewsets.ModelViewSet):
    queryset = Conversation.objects.all()
    serializer_class = ConversationSerializer

    @action(detail=True, methods=['post'])
    def add_message(self, request, pk=None):
        conversation = self.get_object()
        content = request.data.get('content')
        Message.objects.create(conversation=conversation, sender='user', content=content)
        messages = list(conversation.messages.values('sender','content'))
        ai_content = generate_ai_response(messages)
        Message.objects.create(conversation=conversation, sender='ai', content=ai_content)
        return Response({'ai_response': ai_content}, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['post'])
    def end(self, request, pk=None):
        conversation = self.get_object()
        conversation.status = 'ended'
        conversation.end_time = timezone.now()
        messages = list(conversation.messages.values('sender','content'))
        conversation.summary = summarize_conversation(messages)
        conversation.save()
        return Response({'summary': conversation.summary})