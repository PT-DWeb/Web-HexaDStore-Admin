const mongoose= require('mongoose');
const Schema = mongoose.Schema();
const mongoosePaginate = require('mongoose-paginate-v2');

//Tạo model
const productSchema = mongoose.Schema({
    id: {type: String },
    name: {type: String, require: true},
    baseprice: {type: String, require: true},
    discountprice: {type: String, require: true},
    cover: {type: String, require: true},
    idmanufacturer: {type: mongoose.Schema.Types.ObjectId , require: true},
    battery: {type: String, require: true},
    camera: {type: String, require: true},
    processor: {type: String, require: true},
    screen:{type: String, require: true},
    storage: {type: String, require: true},
})

const product2Schema = mongoose.Schema({
    name: {type: String, require: true},
    baseprice: {type: String, require: true},
    discountprice: {type: String, require: true},
    cover: {type: String, require: true},
    idmanufacturer: {type: mongoose.Schema.Types.ObjectId, require: true},
    battery: {type: String, require: true},
    camera: {type: String, require: true},
    processor: {type: String, require: true},
    screen:{type: String, require: true},
    storage: {type: String, require: true},

    quantityAvailable: {type: Number,min: 1,required: true},
    description: {type: String, required: true},
    releaseDay: {type: Date, default: Date.now()},
    DeletedState: {type: Number,default: 0, enum: [0,1]},
    detailImgs: {type: [String], require: true},

})
// module.exports = mongoose.model('Product2', product2Schema, "Products" )
// module.exports = mongoose.model('Product', productSchema, "Products" )

productSchema.plugin(mongoosePaginate);
product2Schema.plugin(mongoosePaginate);

const product1 = mongoose.model('Product', productSchema, "Products" );
const product2 = mongoose.model('Product2', product2Schema, "Products_v2" );

module.exports = {
    productsModel: product1,
    product2Model: product2
}
