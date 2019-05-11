"""sphinxquant URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.conf.urls import url
from rest_framework_jwt.views import obtain_jwt_token
from api import views


urlpatterns = [
    path("admin/", admin.site.urls),
    url(r"^api-token-auth", obtain_jwt_token),
    url(r"^code/(?P<id>\S+)", views.SourceCodeView.as_view()),
    url(r"^strategy/detail/(?P<id>\S+)", views.StrategyUpdateAPIView.as_view()),
    url(r"^strategy/list", views.StrategyListView.as_view()),
    url(r"^strategy/create", views.StrategyCreateAPIView.as_view()),
    url(r"^backtest/detail/(?P<id>\S+)", views.BacktestUpdateAPIView.as_view()),
    url(r"^backtest/list", views.BacktestListView.as_view()),
    url(r"^backtest/test/(?P<id>\S+)", views.BacktestView.as_view()),
    url(r"^currentUser", views.CurrentUserAPIView.as_view()),
]
