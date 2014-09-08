from django.shortcuts import render
from django.forms.models import modelformset_factory
from models import System, SpatialBody
import urlparse

# End-user views
def root(request):
#    try:
#        request.session["hallo"] += 1
#    except:
#        request.session["hallo"] = 0
#    print("Testing; ",request.session["hallo"])
    systems = [s.name for s in System.objects.all()]
    return render(request, 'Universe/index.html', {"systems": systems})

def lens(request, system):
    if system: # Attempt to find and display the system in question
        # Divide & conquer; find system & focus
        s = System.objects.filter(name=system.replace("_"," "))
        if len(system) > 0:
            s=s[0]
        else:
            s=None # Return error, no system found
            print("System not found")

        focus = None
        qs = urlparse.parse_qs(request.META["QUERY_STRING"])
        try:
            print(qs["focus"])
        except KeyError:
            print("Intercepted")

        return render(request, 'Universe/lens.html', {"system":s,"planets":SpatialBody.objects.filter(system=s)})

    systems = [s.name for s in System.objects.all()]
    return render(request, 'Universe/index.html', {"systems": systems})
