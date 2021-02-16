from django.contrib import admin
<<<<<<< Updated upstream
=======
from .models import User, Course, Teacher, Student, Eclass, CourseSelection

admin.site.register(User)
admin.site.register(Student)
admin.site.register(Teacher)
admin.site.register(Eclass)
admin.site.register(CourseSelection)


class CourseAdmin(admin.ModelAdmin):
     list_display = ('name', 'time', 'teacher', 'courseID')

admin.site.register(Course, CourseAdmin)

>>>>>>> Stashed changes

# Register your models here.
