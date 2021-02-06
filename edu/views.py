from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render, get_object_or_404
from django.urls import reverse
from .models import User, Course, Teacher, Student, TeacherProfile, StudentProfile, CourseGrade, Classes, Period
from django.http import JsonResponse
import json
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.db.models import Count
from django.contrib import messages
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger



def timeTable(request):
    classes = Classes.objects.all()
    return JsonResponse([t.serialize() for t in classes], safe=False)



@csrf_exempt
@login_required
def createCourse(request):
    if request.method != "POST":
        return JsonResponse({"error": "POST request required."}, status=400)

    data = json.loads(request.body)    
    name = data.get("name")
    time = data.get('time')
    description = data.get('description')
    day = data.get('day')
    period = data.get('period')
    teacher = User.objects.get(username=request.user),
    courseID = data.get("courseID"),
    course = Course(
            courseID = courseID,
            name = name,
            time = time,
            description = description,
            day = day,
            period = period,
            teacher= request.user,
        )
    course.save()

    return HttpResponseRedirect('/index/')



def course_detail(request, courseIDsection):
    try:
        fullcode = courseIDsection
        splitat = 9
        courseID = fullcode[:splitat]
        courseID, section = fullcode[:splitat], fullcode[splitat:]
        course = Course.objects.get(courseID=courseID)
        dic_course = course.serialize()
    except Course.DoesNotExist:
        return JsonResponse({"error": "Course not found."}, status=404)


    if request.method == "GET":
        classes = Classes.objects.filter(course=course, section=section)
        ds = []
        for cl in classes:
            dic_cl = cl.serialize()
            ds.append(dic_cl)

        d = {}
        for k in ds[0].keys():
            d[k] = tuple(d[k] for d in ds)       
       
        d.update(dic_course)       
        return JsonResponse(d, safe=False)
        #return JsonResponse(dic_course, safe=False)


    if request.method == 'PUT':
        data = json.loads(request.body)
        if data.get("dscription") is not None:
            course.description = data["description"]
            course.save()
            return HttpResponse(status=204)



def courseList(request):
    courses = Course.objects.all()    
    for course in courses:
        classes = Classes.objects.filter(course=course)
        avail_classes = []
        for cl in classes:
            dic_cl = cl.serialize()
            dic_course = course.serialize()     
            dic_cl.update(dic_course)       
            avail_classes.append(dic_cl)
        return JsonResponse(avail_classes, safe=False)


def studentRegister(request):
    if request.method == "POST":
        username = request.POST["username"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "edu/student_register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, password, role='Student')
            user.save()
            student = Student.objects.create(username=user)
            student.save()
        except IntegrityError:
            return render(request, "edu/student_register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "edu/student_register.html")


def teacherRegister(request):
    if request.method == "POST":
        username = request.POST["username"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "edu/teacher_register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, password, role='Teacher')
            user.save()
            teacher = Teacher.objects.create(username=user)
            teacher.save()

        except IntegrityError:
            return render(request, "edu/teacher_register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "edu/teacher_register.html")


def index(request):
    return render(request, "edu/index.html")


def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "edu/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "edu/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


