<<<<<<< Updated upstream
from django.shortcuts import render

# Create your views here.
=======
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render, get_object_or_404
from django.urls import reverse
from .models import User, Course, Teacher, Student, Eclass, CourseSelection
from django.http import JsonResponse
import json
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.contrib import messages



def test(request):
    messages.info(request, 'The Eclass was created successfully!')
    return render(request, "edu/test.html")


@csrf_exempt
@login_required
def selectCourse(request):
    try:
        student = Student.objects.get(username=request.user)
    except Student.DoesNotExist:
        return JsonResponse({"error": "Post not found."}, status=404)
        
    data = json.loads(request.body)     
    courseID = data.get("courseID")
    course = Course.objects.filter(courseID=courseID)
    selected_course = CourseSelection.objects.create(courses=course, student=student)
    selected_course.save()
    messages.info(request, 'The course(s) was selected successfully!')
    return render(request, "edu/index.html") 


@csrf_exempt
@login_required
def createEclass(request):    
    if request.method != "POST":
        messages.info(request, 'POST request required.')
        return render(request, "edu/messages.html")

    data = json.loads(request.body)     
    name = data.get("name")
    description = data.get('description')
    courseID = data.get("courseID")
    course = Course.objects.get(courseID=courseID)
    if course.teacher == request.user:    
        eclass = Eclass(
                courseID = course,
                name = name,
                description = description,
            )
        eclass.save()
        messages.info(request, 'The Eclass was created successfully!')
        return render(request, "edu/messages.html")
    else:
        messages.info(request, 'You are not allowed to created an Eclass for the course.')
        return render(request, "edu/messages.html")



def courseView(request, courseID):
    course = Course.objects.get(courseID = courseID)
    return JsonResponse(course.serialize(), safe=False)



def myCourses(request):
    user = User.objects.get(username=request.user)
    # Check if user is teacher
    if user.role == 'Teacher':
        courses = Course.objects.filter(teacher=user)
        return JsonResponse([course.serialize() for course in courses], safe=False)
    
    elif user.role == 'Student':
        courses = Course.objects.filter(student=user)
        return JsonResponse([course.serialize() for course in courses], safe=False)

    else:
        return HttpResponseRedirect(reverse("index"))        



def courseList(request):
    courses = Course.objects.all()
    return JsonResponse([course.serialize() for course in courses], safe=False)


@csrf_exempt
@login_required
def createCourse(request):
    if request.method != "POST":
        return JsonResponse({"error": "POST request required."}, status=400)

    data = json.loads(request.body)    
    grade = str(data.get("grade"))
    name = data.get("name")
    time = data.get('time')
    description = data.get('description')
    course = Course(
            grade = grade,
            name = name,
            time = time,
            description = description,
            teacher= request.user,
            courseID=(name+grade),
        )
    course.save()
    return HttpResponseRedirect(reverse("index"))


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


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        role = (request.POST["role"]).capitalize()
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "edu/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
            if role == 'Teacher':
                teacher = Teacher.objects.create(username=user)
                teacher.save()
            elif role == 'Student':
                student = Student.objects.create(username=user)
                student.save()
            else:
                return render(request, "edu/register.html", {
                "message": "Your role must be either Teacher or Student."
            })

        except IntegrityError:
            return render(request, "edu/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "edu/register.html")
>>>>>>> Stashed changes
