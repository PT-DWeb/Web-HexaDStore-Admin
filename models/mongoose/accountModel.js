const mongoose= require('mongoose');
const Schema = mongoose.Schema();
const mongoosePaginate = require('mongoose-paginate-v2');

//Tạo model
const customerSchema = mongoose.Schema({
    name: {type: String, require: true},
    accountName: {type: String, require: true},
    hashPassword: {type: String, require: true},
    avatar: {type: String, require: true},
    dob:{type: Date, require: true},
    email: {type: String, require: true},
    phoneNumber: {type: String, require: true},
    address: {type: String, require: true},
    accountState:{type: Number,  enum: [0,1], default: 0,},
    role: {type: mongoose.Schema.Types.ObjectId , require: true},
})

customerSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Account',  customerSchema, "users" )
