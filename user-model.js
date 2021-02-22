const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = mongoose.model('User',Schema({
    _id:Schema.Types.ObjectId,
    name:{
        type:String,
        required:true,
        validate: {
             validator: function (text){
            return text.length > 0
        },
        message: 'Empty name is not allowed'}
    }
}))