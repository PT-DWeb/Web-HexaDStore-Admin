const mongoose= require('mongoose');

const ordersModel = require('../mongoose/orderModel');

exports.getListOrders = async() => {
    const orders = await ordersModel.orderModel.find({})
 	.populate({ path: "orderStatus" })
 	.exec().then(async (docs) => {
   		const options = {
			path: "idCustomer",
			model: "Account",
   		}

		const result = await ordersModel.orderModel.populate(docs, options);
		//console.log(result.idCustomer.name);

   		return result;
	});
	  
	return orders;
}

exports.getOrderDetail = async (req, res, next) => {
	const id = req.params.id;

	const order = await ordersModel.orderModel.findOne({_id: id})
	.populate({ path: "orderStatus" })
	.exec().then(async (docs) => {
		  const options = {
		   path: "idCustomer",
		   model: "Account",
		}

	   	const result = await ordersModel.orderModel.populate(docs, options);
	   	//console.log("customer: " + result);
		return result;
	});
	   
	const details = await ordersModel.orderDetailModel.find({idOrder: id})
	.populate({ path: "idOrder" })
	//.populate({path: "idProduct" })
	.exec().then(async (docs) => {
		const options = {
		 	path: "idProduct",
		 	model: "Product",
		}

		const result = await ordersModel.orderDetailModel.populate(docs, options);
		//console.log("detail: " + result);
	  	return result;
	});

	let orderDetail = {order, details};

	console.log(orderDetail);
	return orderDetail;
}