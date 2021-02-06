from django.contrib import admin
from .models import User, Course, Teacher, Student, TeacherProfile, StudentProfile, CourseGrade, Day, Period, Classes

admin.site.register(User)
admin.site.register(Student)
admin.site.register(Teacher)
admin.site.register(TeacherProfile)
admin.site.register(StudentProfile)
admin.site.register(CourseGrade)
admin.site.register(Day)



class PeriodAdmin(admin.ModelAdmin):
     list_display = ('period', 'time_start', 'time_end')

admin.site.register(Period, PeriodAdmin)


class CourseAdmin(admin.ModelAdmin):
     list_display = ('courseID', 'name', 'credits', 'course_type')

admin.site.register(Course, CourseAdmin)


class ClassessAdmin(admin.ModelAdmin):
     list_display = ('id', 'course', 'section', 'date_start', 'date_end', 'day', 'period', 'teacher')


admin.site.register(Classes, ClassessAdmin)


