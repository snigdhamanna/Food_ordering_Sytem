# api/urls.py
from django.urls import path
from accounts import views as UserViews
from menu import views as MenuViews
from orders import views as OrderViews
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('register/', UserViews.RegisterView.as_view()),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('menu/', MenuViews.MenuItemListCreateView.as_view()),
    path('menu/<int:pk>/', MenuViews.MenuItemDetailView.as_view()),

    path('orders/', OrderViews.OrderListCreateView.as_view()),
    path('orders/<int:pk>/', OrderViews.OrderDetailView.as_view()),
    path('orders/<int:pk>/status/', OrderViews.OrderStatusUpdateView.as_view()),
    
]