from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader, RequestContext, TemplateDoesNotExist
from Universe.models import *

# Create your views here.
def root(request):
    stats = (("Planetoids",SpatialBody.objects.count()),
             ("Systems",System.objects.count()),
             ("Users", 3),#Users.objects.count()),
             ("Blah",0),
             ("blahblah",1))
    return render(request, 'StarDjango/index.html', {"uniquery":stats})

def reqForm(request):
    query = dict([tuple(item.split("=")) for item in request.META["QUERY_STRING"].split("&")])
    try:
        ts = "/".join((query["app"],query["form"]))
        ts+=".form"
        t = loader.get_template(ts)
        c = RequestContext(request)
        return HttpResponse(t.render(c))
    except TemplateDoesNotExist as e:
        print("Excepted, dropping through to 404.")
    return HttpResponse("Hello world") # Return a custom 404

def valForm(request):
    query = dict([tuple(item.split("=")) for item in request.META["QUERY_STRING"].split("&")])
    print(query)

