const mongoose = require('mongoose');
require('dotenv').config()

mongoose.connect(process.env.PRODUCTS_MONGODB_URL, {useNewUrlParser: true,  useUnifiedTopology: true }, function (err) {
    if (err) throw err;
    console.log('Kết nối database thành công!');
 });