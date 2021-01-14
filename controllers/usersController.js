const usersService = require('../models/services/userService');

exports.displayListAccounts = async (req, res, next) => {
    const accounts = await usersService.getListAccounts(req, res, next);

    res.render('userAccounts/listAccounts', {accounts});
}

exports.changeAccountState = async (req,res,next)=>{
    const account = await usersService.changeAccountState(req, res, next);
    //console.log(account);
    res.json(account);
}

exports.displayDetailInfo = async (req, res, next) => {
    const accountInfo = await usersService.display(req, res, next);
    res.render('userAccounts/accountDetail', {accountInfo});
}

exports.changeAccountRole = async (req,res,next)=>{
    const account = await usersService.changeAccountRole(req, res, next);
    console.log("role: " + account);
    res.json(account);
}

