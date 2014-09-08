from django.conf.urls import patterns, include, url
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = patterns('',
    # Base level page(s)
    url(r'^$', 'Universe.views.root', name='root'),
    url(r'^view/(?P<system>\w*)', 'Universe.views.lens', name='Universe Viewer'),

)
