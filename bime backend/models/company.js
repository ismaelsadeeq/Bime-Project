const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const CompanySchema = new Schema({
    username: { type: String, required: true, unique: [ true, 'ID Number already exist' ] },
    companyName: { type: String, required: true},
    email: { type: String, required: true},
    phone: { type: String, required: true},
    address: { type: String},
    staff: [{type: Object, default:Array}],
    invoice: [{type: Object, default:Array}],
    expenses: [{type: Object, default:Array}],
    image: { type: String, default: null },
    admin: {type: String, default: false}
}, { timestamps: true });

//plugin passport-local-mongoose to enable password hashing and salting and other things
CompanySchema.plugin(passportLocalMongoose);

//connect the schema with user table
const Company = mongoose.model('company', CompanySchema);

//export the model 
module.exports = Company;