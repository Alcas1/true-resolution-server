from django.shortcuts import render
from django.http import HttpResponse
import requests

from .models import resolutions

# Create your views here.
def index(request):

    return render(request, 'index.html')


def resolutions(request):

    return render(request, 'test.html')




def db(request):

    greeting = Greeting()
    greeting.save()

    greetings = Greeting.objects.all()

    return render(request, 'db.html', {'greetings': greetings})

