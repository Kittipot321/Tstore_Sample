from django.shortcuts import render
from rest_framework import serializers
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Product
from .serializers import ProductSerializers
# Create your views here.

URL="http://localhost:8000/api"

@api_view(['GET'])
def apiList(request):
    api_urls = {
        'List': URL+'/product-list/',
        'Detail View': URL+'/product-detail/<int:pk>',
        'Create': URL+'/product-create/',
        'Update': URL+'/product-update/<int:pk>',
        'Delete': URL+'/product-delete/<int:pk>',
    }
    return Response(api_urls)

@api_view(['GET'])
def ListProduct(request):
    products = Product.objects.all()
    serializer = ProductSerializers(products, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def DetailProduct(request,pk):
    products = Product.objects.get(id=pk)
    serializer = ProductSerializers(products, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def CreateProduct(request):
    serializer = ProductSerializers(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['POST'])
def UpdateProduct(request,pk):
    product = Product.objects.get(id=pk)
    serializer = ProductSerializers(instance=product,data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['DELETE'])
def DeleteProduct(request,pk):
    product = Product.objects.get(id=pk)
    product.delete()
    return Response(product.name+" Successfully Delete!")