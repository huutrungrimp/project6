from django.db import models

class Quiz(models.Model):
    name = models.CharField(max_length=150)
    e_class = models.ForeignKey('edu.e_class', on_delete=models.CASCADE)
    
    def __str__(self):
        return self.name

    def serialize(self):
        return {
            'name': self.name,
            'e_class': self.e_class,
        }


class Question(models.Model):
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE),
    label = models.TextField(max_length=500)
    order = models.IntegerField(default=0)

    def __str__(self):
        return self.order

    def serialize(self):
        return {
            'quiz': self.quiz.name,
            'label': self.label,
            'order': self.order,
        }
    

class Answer(models.Model):
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    answer = models.CharField(max_length=2)

    def __str__(self):
        return self.answer

    def serialize(self):
        return {
            'quiz': self.quiz.name,
            'question': self.question.order,
            'answer': self.answer,
        }
    
