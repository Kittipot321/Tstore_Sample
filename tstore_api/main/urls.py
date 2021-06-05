from django.urls import path
from . import views
urlpatterns = [
    path('',views.apiList, name="api-list"),
    path('product-list/',views.ListProduct, name="product-list"),
    path('product-detail/<int:pk>',views.DetailProduct, name="product-detail"),
    path('product-create/', views.CreateProduct, name="product-create"),
    path('product-update/<int:pk>', views.UpdateProduct, name="product-update"),
    path('product-delete/<int:pk>', views.DeleteProduct, name="product-delete")
]