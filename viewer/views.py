from django.shortcuts import render
from django.views import View

# Create your views here.
def home(request):
    return render(request, "index.html")

def revize(request):
    return render(request, "revize.html")