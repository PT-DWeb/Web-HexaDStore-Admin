const manufacturerModel=require('./manufacturerModel');

exports.findOne = async(filter) =>{
    const manufacturer= await manufacturerModel.findOne(filter);
    return manufacturer;
}