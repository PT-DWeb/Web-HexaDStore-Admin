// const mongoose= require('mongoose');
// const Schema = mongoose.Schema();
// const mongoosePaginate = require('mongoose-paginate-v2');

// //Tạo model
// const orderSchema = mongoose.Schema({
//     total: {type: Number, require: true},
//     purchaseDate: {type: Date, default: Date.now()},
//     orderStatus: {type: mongoose.Schema.Types.ObjectId , require: true},
//     customerId: {type: mongoose.Schema.Types.ObjectId , require: true},
//     productId: {type: mongoose.Schema.Types.ObjectId , require: true},
// });

// const orderStatusSchema = mongoose.Schema({
//     statusName: {type: String, required: true}
// });

// const orderDetailSchema = mongoose.Schema({
//     orderId: {type: mongoose.Schema.Types.ObjectId , require: true},
//     productId: {type: mongoose.Schema.Types.ObjectId , require: true},
//     amount: {type: Number, required: true},
//     total: {type: Number, required: true},
// });


// orderSchema.plugin(mongoosePaginate);
// //orderStatusSchema.plugin(mongoosePaginate);
// orderDetailSchema.plugin(mongoosePaginate);

// const order = mongoose.model('Order', orderSchema, "Orders" );
// const orderStatus = mongoose.model('OrderStatus', orderStatusSchema, "OrderStatus" );
// const orderDetail = mongoose.model('OrderDetail', orderDetailSchema, "OrderDetail" );

// module.exports = {
//     orderModel: order,
//     orderStatusModel: orderStatus,
//     orderDetailModel: orderDetail
// }
