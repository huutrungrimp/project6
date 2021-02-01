from django.urls import path
from . import views

app_name = 'cal'
urlpatterns = [
    path('calendar', views.CalendarView.as_view()),    
]