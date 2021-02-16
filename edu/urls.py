
from django.urls import path

<<<<<<< Updated upstream
urlpatterns = [
    
]
=======
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("studentRegister", views.studentRegister, name="studentRegister"),
    path("teacherRegister", views.teacherRegister, name="teacherRegister"),
    path('create-course', views.createCourse, name='createCourse'),
    path('courses', views.courseList, name='courseList'),
    path('courses/<str:courseID>', views.courseView, name='courseView'),
    path('create-eclass', views.createEclass, name='createEclass'),
    path('mycourses', views.myCourses, name='myCourses'),
    path('selectcourse', views.selectCourse, name='selectCourse'),
    path('test', views.test, name='test'),
]



>>>>>>> Stashed changes
