from django.db import models as dm
from datetime import datetime
from time import mktime
from django.core.files import File

# utilities
def file_namer(instance,name):
    fn = name.rfind("/")
    print(name)
    nn = '/'.join([instance.system.name, instance.name, name[fn+1:]])
    return nn

# models
class System(dm.Model):
    # stats
    name = dm.CharField(max_length=30,unique=True)

    # functions
    def getPlanets(self):
        return SpatialBody.objects.filter(system=self)

class SpatialBody(dm.Model):
    # stats
    name = dm.CharField(max_length=30)
    system = dm.ForeignKey(System)

    # Animation and appearance
    radius = dm.DecimalField(max_digits=4,decimal_places=2) # Earth is @ 10
    exRadius = dm.DecimalField(max_digits=4,decimal_places=2)
    aX = dm.IntegerField()
    aY = dm.IntegerField()
    orbitRate = dm.DecimalField(max_digits = 5,decimal_places=4) # Change this to decimal field on runtime?
    birthday = dm.DateTimeField(auto_now_add = True)

    # textures
    mainmap = dm.ImageField(upload_to=file_namer, blank=True)
    mainbump = dm.ImageField(upload_to=file_namer, blank=True)

    extramap = dm.ImageField(upload_to=file_namer, blank=True)
    extraalph = dm.ImageField(upload_to=file_namer, blank=True)

    # functions
    def getAgeInMillis(self):        
        dt = datetime.now()
        msse = 1000* (mktime(dt.timetuple()) + dt.microsecond/1000000.0)
        return msse;







# Future: change bump to depth, use "ground" to fill gaps. Think: ocean, frozen canyons, lava rivers, etc
#    ground_texture = dm.ImageField(upload_to=file_namer, blank=True)
#    ground_radius = dm.ImageField(upload_to=file_namer, blank=True)

    # animation



#from Universe.models import *
#from django.core.files import File
#s = System(name="Solar System")
#s.save()

#mm = File(open('/home/kay/Downloads/djangoresources/mainmap','r'))
#mb = File(open('/home/kay/Downloads/djangoresources/mainbump','r'))
#em = File(open('/home/kay/Downloads/djangoresources/alphamap','r'))

#p = SpatialBody(name="earth",system=s,radius=5,exRadius=5.2,aX=50,aY=50,orbitRate=1.0,mainmap=mm,mainbump=mb,extramap=em,extraalph=em)
#p.save()
