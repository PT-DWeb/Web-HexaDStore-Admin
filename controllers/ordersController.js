const ordersService = require('../models/services/ordersService');

exports.displayListOrders = async(req, res, next) => {
    const orders = await ordersService.getListOrders();
    //console.log("order:" + orders);
    res.render('orders/listOrders', {orders});  
}

exports.viewOrderDetail = async(req, res, next) => {
    const orderDetail = await ordersService.getOrderDetail(req, res, next);
    const order = orderDetail.order;
    const details = orderDetail.details;
    //console.log("order:" + orders);
    res.render('orders/orderDetail', {order, details});  
}