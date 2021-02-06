from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    #path("register/<str:role>", views.register, name="register"),
    path("studentRegister", views.studentRegister, name="studentRegister"),
    path("teacherRegister", views.teacherRegister, name="teacherRegister"),
    path('create-course', views.createCourse, name='createCourse'),
    path('courses', views.courseList, name='courseList'),
    path('courses/<str:courseIDsection>', views.course_detail, name='course-detail'),
    path('timetable', views.timeTable, name='timetable')
]

