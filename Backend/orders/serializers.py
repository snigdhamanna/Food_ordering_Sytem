# orders/serializers.py
from rest_framework import serializers
from .models import Order, OrderItem

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['id', 'menuitem', 'quantity']


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields = ['id', 'customer', 'status', 'created_at', 'items']
        read_only_fields = ['customer']

    def create(self, validated_data):
        items_data = validated_data.pop('items')        # separate the nested list first
        order = Order.objects.create(**validated_data)   # create the Order alone
        for item_data in items_data:                     # then create each OrderItem
            OrderItem.objects.create(order=order, **item_data)
        return order