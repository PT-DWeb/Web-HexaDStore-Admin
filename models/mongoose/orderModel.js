const mongoose= require('mongoose');
const Schema = mongoose.Schema();
const mongoosePaginate = require('mongoose-paginate-v2');

//Tạo model
const orderSchema = mongoose.Schema({
    total: {type: Number, require: true},
    orderDate: {type: Date, default: Date.now()},
    deliveryDate: {type: Date, default: Date.now()},
    orderStatus: {type: mongoose.Schema.Types.ObjectId, require: true, ref: 'OrderStatus'},
    idCustomer: {type: mongoose.Schema.Types.ObjectId , require: true, ref: 'Account'},
    phone: {type:String, require: true},
    address: {type:String, require: true},
});

const orderStatusSchema = mongoose.Schema({
    //_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Order'},
    statusName: {type: String}
});

const orderDetailSchema = mongoose.Schema({
    idProduct: {type: mongoose.Schema.Types.ObjectId , require: true, ref: 'Product'},
    idOrder: {type: mongoose.Schema.Types.ObjectId , require: true, ref: 'Order'},
    quantity: {type: Number, required: true},
    total: {type: Number, required: true},
});


orderSchema.plugin(mongoosePaginate);
//orderStatusSchema.plugin(mongoosePaginate);
orderDetailSchema.plugin(mongoosePaginate);

const order = mongoose.model('Order', orderSchema, "Order" );
const orderStatus = mongoose.model('OrderStatus', orderStatusSchema, "OrderStatus" );
const orderDetail = mongoose.model('DetailOrder', orderDetailSchema, "DetailOrder" );

module.exports = {
    orderModel: order,
    orderStatusModel: orderStatus,
    orderDetailModel: orderDetail
}
