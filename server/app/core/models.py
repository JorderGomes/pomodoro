from django.db import models
import datetime


class Tarefa(models.Model):
    nome = models.CharField(max_length=50)
    descricao = models.CharField(max_length=5000, blank=True)
    concluido = models.BooleanField(default=False)
    qtd_rounds = models.IntegerField(default=0)
    data_criacao = models.DateField(default=datetime.date.today)
    data_conclusao = models.DateField(default=datetime.date.today)

    def __str__(self):
        return self.titulo
