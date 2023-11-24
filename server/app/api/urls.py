from django.contrib import admin
from rest_framework import routers
from django.urls import path, include
from core.views import TarefaViewSet


router = routers.DefaultRouter()
router.register(r'tarefas', TarefaViewSet)


urlpatterns = [
    path("", include(router.urls)),
    path("admin/", admin.site.urls),
    path('api-auth/', include('rest_framework.urls'))
]
