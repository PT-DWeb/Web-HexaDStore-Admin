const adminAccountService = require('../models/services/adminAccountService');

exports.displayAccInfo = async (req, res, next) => {
    const accountInfo = await adminAccountService.getAccInfo(req, res, next);
    const genderSelector = await adminAccountService.getSelectedGender(req, res, next);
    res.render('adminAccount/adminProfile', {accountInfo, genderSelector});
}

exports.changeAvatar = async (req, res, next) => {
    await adminAccountService.changeAvt(req, res, next);
    const url = '/my-account/' + req.params.id;

    res.redirect(url);
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

exports.editInfo = async (req, res, next) => {
    await adminAccountService.editInfo(req, res, next);

    const url = '/my-account/' + req.params.id;
    res.redirect(url);
}