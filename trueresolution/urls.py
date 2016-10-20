from django.conf.urls import include, url

from django.contrib import admin
admin.autodiscover()

import resolution.views

# Examples:
# url(r'^$', 'gettingstarted.views.home', name='home'),
# url(r'^blog/', include('blog.urls')),

urlpatterns = [
    url(r'^$', resolution.views.index, name='index'),
    url(r'^db', resolution.views.db, name='db'),
    url(r'^resolutions$', resolution.views.resolutions, name='resolutions'),
    url(r'^admin/', include(admin.site.urls)),
]
