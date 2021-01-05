const accountModel = require('../mongoose/accountModel');

exports.getListAccounts = async (req, res, next) => {
    const listAccs = await accountModel.find({});
    return listAccs;
}

exports.changeAccountState = async(req, res, next) => {
    if (req.query.id != req.query.myAccountID){
        await accountModel.findOneAndUpdate({_id:req.query.id},{
            accountState: +req.query.accountState ? 0:1
        });
    }
    const account = await accountModel.findOne({_id: req.query.id});
    return account;
}

exports.display = async(req, res, next) => {
    const info = await accountModel.findOne({_id: req.params.id});
    return info;
}