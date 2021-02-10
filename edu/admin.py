from django.contrib import admin
from .models import User, Course, Teacher, Student, TeacherProfile, StudentProfile, CourseGrade

admin.site.register(User)
admin.site.register(Student)
admin.site.register(Teacher)
admin.site.register(TeacherProfile)
admin.site.register(StudentProfile)
admin.site.register(CourseGrade)


class CourseAdmin(admin.ModelAdmin):
     list_display = ('name', 'time', 'teacher')

admin.site.register(Course, CourseAdmin)


