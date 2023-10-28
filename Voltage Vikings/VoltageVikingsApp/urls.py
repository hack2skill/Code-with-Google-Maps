from django.urls import path, include
from . import views
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
                  path('', views.landing_page_view),
                  path('account/', include('allauth.urls')),
                  path('captcha/', include('captcha.urls')),
                  path('home/', views.home_page),
                  path('getlocation/', views.get_location),
                  path('nearbystations/', views.nearby_stat),
                  path('route/<str:dest_lat>/<str:dest_long>/<int:id>/<int:page>/', views.map),
                  path(
                      'liverouting/<str:src_lat_got>/<str:src_long_got>/<str:dest_lat>/<str:dest_long>/<int:page>/',
                      views.live),
                  path('avail/', views.avail),
                  path('profile/', views.update_profile_profilepage),
                  path('completeprofile/', views.complete_profile),
                  path('nearbyhome/', views.nearby_home),
                  path('send_request/', views.send_request),
                  path('request_view/', views.req_view),
                  path('acc_req/', views.accept_request),
                  path('rej_req/', views.reject_request),
                  path('pay/<int:id>/', views.adv_payment),
                  path('advpaysuc/<int:id>/', views.advPaysucc),
                  path(
                      'homeroute/<str:src_lat>/<str:src_long>/<str:dest_lat>/<str:dest_long>/<int:id>/<int:page>/<int:txn_id>/',
                      views.maph),
                  path(
                      'liverouting/<str:src_lat_got>/<str:src_long_got>/<str:dest_lat>/<str:dest_long>/<int:page>/<int:txn_id>/',
                      views.live),
                  path('final_pay/<int:txn_id>/', views.final_payment),
                  path('finpaysuc/<int:id>/', views.finPaysucc),
              ] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
