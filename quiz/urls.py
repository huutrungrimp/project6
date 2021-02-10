from django.urls import path
from .import views



urlpatterns = [
    path('quiz', views.quizView.as_view()),
]