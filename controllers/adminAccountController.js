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