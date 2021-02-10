from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models.aggregates import Max
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
        return str(self.username)    


class Teacher(models.Model):
    username = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(max_length=500, null=True)   

    def __str__(self):
        return str(self.username)


class Course(models.Model):
    name = models.CharField(max_length=150)

    STUDY_ELVEL = (
        ('12', 'Grade 12'),
        ('11', 'Grade 11'),
        ('10', 'Grade 10'),
        ('9', 'Grade 9'),
        ('8', 'Grade 8'),
        ('7', 'Grade 7'),        
        ('6', 'Grade 6'),
        ('5', 'Grade 5'),
        ('4', 'Grade 4'),
        ('3', 'Grade 3'),
        ('2', 'Grade 2'),
        ('1', 'Grade 1'),
    )
    grade = models.CharField(
        max_length=2,
        choices=STUDY_ELVEL,
        default='12',
    )

    time = models.IntegerField(default=0)
    description = models.TextField()
    teacher = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

    
    def serialize(self):
        return {
            'courseID': self.courseID,
            'name': self.name,
            'grade': self.grade,
            'time': self.time,
            'description': self.description,
            'teacher': self.teacher,     
        }


class e_class(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    name = models.CharField(max_length=150),
    description = models.TextField(),

    def __str__(self):
        return self.name
    
    def serialize(self):
        return {
            'course': self.course,
            'name': self.name,
            'description': self.description,
        }


class CourseSelection(models.Model):
    username = models.ForeignKey(Student, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.course.name


class CourseGrade(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    marks = models.FloatField(validators=[MinValueValidator(0), MaxValueValidator(100)])

    def __str__(self):
        return self.course.name


class StudentProfile(models.Model):
    username = models.ForeignKey(Student, on_delete=models.CASCADE)
    courses = models.ManyToManyField(CourseSelection)


class TeacherProfile(models.Model):
    username = models.ForeignKey(Student, on_delete=models.CASCADE)
    courses = models.ForeignKey(Course, on_delete=models.CASCADE)









