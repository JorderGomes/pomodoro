from rest_framework import serializers
from .models import Tarefa


class TarefaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tarefa
        fields = ['id', 'nome', 'descricao', 'concluido', 'qtd_rounds', 'data_criacao', 'data_conclusao'] # noqa
