const formidable = require('formidable');

const accountModel = require('../mongoose/accountModel');
const productsService = require('../services/productsService');

exports.getAccInfo = async(req, res, next) =>{
    console.log("\nreq.params.id: " + req.params.id + '\n');
    //console.log("\nreq.body._id: " + req.body._id + '\n');
    const accountInfo = await accountModel.findOne({_id: req.params.id}).lean();
    console.log(accountInfo);
    return accountInfo;
}

exports.changeAvt = async(req, res, next) =>{
    const form = formidable({ multiples: true });
    
    await new Promise((resolve, reject) => {
        form.parse(req, async (err, fields, files) => {
            if (err) {
                reject(err);
            }
   
            const avatar = files.adminAvt;

            if (avatar && avatar.size > 0){
                await productsService.uploadImg(avatar, 'adminAvts')
                    .then((avatarLink)=>{
                        console.log("Link avt: " + avatarLink);
                        const IDQuery = fields._id;
                        const newAvatar = {avatar: avatarLink};
                        accountModel.findOneAndUpdate({_id: IDQuery}, newAvatar, {new: true}, (err, doc) => {
                            if (err) reject(err);
                        });
                        console.log("Đổi avatar thành công");
                    });
            }
          
            resolve();
            return fields._id;
        });
    });
}