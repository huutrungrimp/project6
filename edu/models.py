from django.contrib.auth.models import AbstractUser
from django.db import models
from django.template.defaultfilters import slugify
from django.core.validators import MaxValueValidator, MinValueValidator
from datetime import datetime


class User(AbstractUser):
    ROLES = (
        ('Admin', 'Admin'),
        ('Student', 'Student'),
        ('Teacher', 'Teacher'),
    )
    role = models.CharField(max_length=11, choices=ROLES)

    def __str__(self):
        return self.username



class Student(models.Model):
    username = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.username    



class Teacher(models.Model):
    username = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(max_length=500, null=True)   

    def __str__(self):
        return str(self.username)


class Day():
    day = models.CharField(max_length=10)

    def __str__(self):
        return self.day


class Period():
    period = models.CharField(max_length=10)

    def __str__(self):
        return self.period




class Course(models.Model):
    courseID = models.CharField(max_length=30, unique=True)
    name = models.CharField(max_length=150)
    time = models.IntegerField(default=0)
    description = models.TextField()
    
    DAYS = (
        ('Mon', 'Monday'),
        ('Tue', 'Tuesday'),
        ('Wed', 'Wednesday'),
        ('Thu', 'Thursday'),
        ('Fri', 'Friday'),
        ('Sat', 'Saturday'),
        ('Sun', 'Sunday'),
    )
    day = models.CharField(max_length=10, choices=DAYS)

    HOURS = (
        ('Period 1', '8:00-10:00'),
        ('Period 2', '10:00-12:00'),
        ('Period 3', '12:00-14:00'),
        ('Period 4', '14:00-16:00'),
        ('Period 5', '16:00-18:00'),
        ('Period 6', '18:00-20:00'),
    )
    period = models.CharField(max_length=18, choices=HOURS)
    teacher = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

    
    def serialize(self):
        return {
            'courseID': self.courseID,
            'name': self.name,
            'time': self.time,
            'description': self.description,
            'day': self.day,
            'period': self.period,   
            'teacher': self.teacher.username,     
        }


class CourseSelection(models.Model):
    username = models.ForeignKey(Student, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.course.name


class CourseGrade(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    grade = models.FloatField(validators=[MinValueValidator(0), MaxValueValidator(100)])

    def __str__(self):
        return self.course.name


class StudentProfile(models.Model):
    username = models.ForeignKey(Student, on_delete=models.CASCADE)
    courses = models.ManyToManyField(CourseSelection)


class TeacherProfile(models.Model):
    username = models.ForeignKey(Student, on_delete=models.CASCADE)
    courses = models.ForeignKey(Course, on_delete=models.CASCADE)









