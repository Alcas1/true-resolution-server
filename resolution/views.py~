from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from resolution.models import Resolution
from ipware.ip import get_ip

import sys
import requests



# Create your views here.
def index(request):

    return render(request, 'index.html')


def resolutions(request):

    return render(request, 'test.html')



def insertResolution(request):
    
    ip = get_ip(request)

    print ip
    sys.stdout.flush()
    res= Resolution(height=request.POST['hres'],width=request.POST['vres'],pixel_density=request.POST['pixel_density'])
    res.save()
    return redirect(index);



def db(request):

    greeting = resolutions()
    greeting.save()

    greetings = Greeting.objects.all()

    return render(request, 'db.html', {'greetings': greetings})

