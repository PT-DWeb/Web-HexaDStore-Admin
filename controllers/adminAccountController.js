const adminAccountService = require('../models/services/adminAccountService');

exports.displayAccInfo = async (req, res, next) => {
    const accountInfo = await adminAccountService.getAccInfo(req, res, next);
    console.log(accountInfo);
    res.render('adminAccount/adminProfile', {accountInfo});
}

exports.changeAvatar = async (req, res, next) => {
    await adminAccountService.changeAvt(req, res, next);
    //console.log()
    //res.render('adminAccount/adminProfile', {accountInfo});
    //res.redirect('/my-account/' + id);
    await this.displayAccInfo(req, res, next);
}

exports.displayLogin = async (req, res, next) => {
    let message = "";
    message = req.flash('error');
    console.log("req.query.to");
    console.log(req.body);
    console.log("message: " + message);
    if (message != "") {
        res.render('adminAccount/login', { message, notify: 'block' });
    }
    else {
        res.render('adminAccount/login', { notify: 'none' });
    }
}