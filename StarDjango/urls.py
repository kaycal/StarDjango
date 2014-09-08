from django.conf.urls import patterns, include, url
from django.conf import settings
from django.conf.urls.static import static

from django.contrib import admin
admin.autodiscover()

import Universe
import Users

urlpatterns = patterns('',
    # Root page
    url(r'^$', 'StarDjango.views.root', name='root'),

        url(r'^media/(?P<path>.*)$', 'django.views.static.serve', {
            'document_root': settings.MEDIA_ROOT,
        }),

    # App urls
    url(r'^user/', include('Users.urls')),
    url(r'^universe/', include('Universe.urls')),

    # Utility URLs
    url(r'^reqForm','StarDjango.views.reqForm',name='form_request'),

)
