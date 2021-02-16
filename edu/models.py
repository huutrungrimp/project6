from django.db import models
<<<<<<< Updated upstream
=======



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
    bio = models.TextField(max_length=500)   

    def __str__(self):
        return str(self.username)



class Course(models.Model):

    STUDY_ELVEL = (
        ('12', '12'),
        ('11', '11'),
        ('10', '10'),
        ('9', '9'),
        ('8', '8'),
        ('7', '7'),        
        ('6', '6'),
        ('5', '5'),
        ('4', '4'),
        ('3', '3'),
        ('2', '2'),
        ('1', '1'),
    )
    grade = models.CharField(
        max_length=12,
        choices=STUDY_ELVEL,
        default='2',
    )
    name = models.CharField(max_length=150)
    time = models.IntegerField(default=0)
    teacher = models.ForeignKey(User, on_delete=models.CASCADE)
    description = models.TextField()
    courseID = models.CharField(unique=True, max_length=100)

    def __str__(self):
        return self.courseID
    
    def serialize(self):
        return {
            'courseID': self.courseID,
            'name': self.name,
            'grade': self.grade,
            'time': self.time,
            'description': self.description,
            'teacher': self.teacher.username,     
        }


class Eclass(models.Model):
    courseID = models.ForeignKey(Course, on_delete=models.CASCADE)
    name = models.CharField(max_length=150)
    description = models.TextField()

    def __str__(self):
        return str(self.courseID)
    
    def serialize(self):
        return {
            'course': self.courseID,
            'name': self.name,
            'description': self.description,
        }


class CourseSelection(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    courses = models.ManyToManyField(Course)

    class Meta:
        verbose_name_plural = 'Course Selection'

    def __str__(self):
        return self.student
>>>>>>> Stashed changes

# Create your models here.
