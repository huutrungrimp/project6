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
        return self.username.username


class Teacher(models.Model):
    username = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(max_length=500, null=True)   

    def __str__(self):
        return str(self.username)


class Day(models.Model):
    day = models.CharField(max_length=10)

    def __str__(self):
        return self.day


class Period(models.Model):
    period = models.CharField(max_length=8, null=True)
    time_start = models.TimeField(null=True)
    time_end = models.TimeField(null=True)

    def __str__(self):
        return self.period

    def serialize(self):
        return {
            'period': self.period,
            'time_start': self.time_start,
            'time_end': self.time_end,            
        }


class Course(models.Model):
    courseID = models.CharField(max_length=30, unique=True)
    name = models.CharField(max_length=150)
    description = models.TextField() 
    credits = models.FloatField(null=True)
    course_type = models.CharField(max_length=150, null=True)

    def __str__(self):
        return self.courseID
    
    def serialize(self):
        return {
            'courseID': self.courseID,
            'name': self.name,
            'description': self.description,
            'credits': self.credits,
            'course_type': self.course_type,            
        }


class Classes(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    section = models.CharField(max_length=4, null=True)
    date_start = models.DateField(null=True)
    date_end = models.DateField(null=True)
    day = models.ForeignKey(Day, on_delete=models.CASCADE)
    period = models.ForeignKey(Period, on_delete=models.CASCADE)    
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE, null=True)

    def serialize(self):
        return {
            'id': self.id,
            'courseID': self.course.courseID,
            'section': self.section,
            'date_start': self.date_start,
            'date_end': self.date_end,
            'day': self.day.day,
            'period': self.period.period,
            'teacher': self.teacher.username.username,            
        }

    def total_hours(self):
        weeks = self.period.date_end - self.period.date_start
        hours_per_week = self.period.time_end - self.period.time_start
        hours = weeks.hours_per_week

        


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









