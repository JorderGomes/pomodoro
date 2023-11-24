from rest_framework import viewsets
from .models import Tarefa
from .serializers import TarefaSerializer
from rest_framework.response import Response
from rest_framework.decorators import action
from django.db import connection


class TarefaViewSet(viewsets.ModelViewSet):
    queryset = Tarefa.objects.all()
    serializer_class = TarefaSerializer

    @action(detail=False, methods=['get'])  # Use detail=False to make it a list action # noqa
    def qtd_tasks_by_date(self, request):
        with connection.cursor() as cursor:
            cursor.execute("SELECT data_conclusao, COUNT(id) FROM core_tarefa GROUP BY data_conclusao;") # noqa
            results = cursor.fetchall()

        data = []
        for row in results:
            data.append({
                'data_conclusao': row[0],
                'count': row[1]
            })

        return Response(data)
