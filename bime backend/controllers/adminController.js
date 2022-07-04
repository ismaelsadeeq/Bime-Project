const Company = require('../models/company')
const passport = require('passport');
const multer = require('multer');
const {singleUpload,singleAllMediaUpload,singleAudioUpload} = require('../middlewares/filesMiddleware');
const { uuid } = require('uuidv4');
const jwt =require('jsonwebtoken');
const csv = require('csv-parser')
const fs = require('fs')
const msToTime = require('../middlewares/timeMiddleware')
const math = require('../middlewares/math.middleware')
const randomstring = require("randomstring");
const cloudinary = require('cloudinary');
const mailgun = require("mailgun-js");
const DOMAIN = "sandbox09949278db4c4a108c6c1d3d1fefe2ff.mailgun.org";
const mg = mailgun({apiKey: "9bd20544d943a291e8833abd9e0c9908-76f111c4-8a189b96", domain: DOMAIN});
const cloudinaryUplouder = require('../middlewares/uploadCloudinary')
const bcrypt = require('bcrypt');
const path = require('path');

//function get week
const getWeek = (date) =>{
  const currentdate = new Date(date);
  const oneJan = new Date(currentdate.getFullYear(),0,1);
  const numberOfDays = Math.floor((currentdate - oneJan) / (24 * 60 * 60 * 1000));
  return Math.ceil(( currentdate.getDay() + 1 + numberOfDays) / 7);
}

const formatDate = (date) => {
  return date.toString().split(' ').splice(0,4).join(' ')
}

// cloudinary configuration for saving files
cloudinary.config({
    cloud_name: 'mustyz',
    api_key: '727865786596545',
    api_secret: 'HpUmMxoW8BkmIRDWq_g2-5J2mD8'
})


// company registration controller
exports.registerCompany = async (req, res, next) => {
    try {

      //create the user instance
      req.body.username = `${req.body.companyName.slice(0,3).toLocaleUpperCase()}/${randomstring.generate(4)}`
      user = new Company(req.body)
      const password = req.body.password ? req.body.password : 'password'
      //save the user to the DB
      await Company.register(user, password, function (error, user) {
        if (error) return res.json({ success: false, error }) 
        const newUser = {
          _id: user._id,
          username: user.username,
          companyName: user.companyName,
          email: user.email,
          phone: user.phone,
          image: user.image,
          admin: user.admin,
          address: user.address,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          __v: user.__v
        }
        const data = {
          from: "Nutscoders@gmail.com",
          to: "onemustyfc@gmail.com",
          subject: "IMB DEFAULT PASSWORD",
          text: "Your default password is 'password'"
        };
        try {
          
          mg.messages().send(data, function (error, body) {
            console.log(body);
          });
          res.json({ success: true, newUser })
        } catch (error) {
          res.json({ success: false, newUser })
        }
      })
    } catch (error) {
      res.json({ success: false, error })
    }
  }

  // reset password
  exports.changePassword = async (req, res, next) => {
    const {username} = req.query
    Company.findOne({ username },(err, user) => {
      // Check if error connecting
      if (err) {
        res.json({ success: false, message: err }); // Return error
      } else {
        // Check if user was found in database
        if (!user) {
          res.json({ success: false, message: 'User not found' }); // Return error, user was not found in db
        } else {
          user.changePassword(req.body.oldpassword, req.body.newpassword, function(err) {
             if(err) {
                      if(err.name === 'IncorrectPasswordError'){
                           res.json({ success: false, message: 'Incorrect password' }); // Return error
                      }else {
                          res.json({ success: false, message: 'Something went wrong!! Please try again after sometimes.' });
                      }
            } else {
              res.json({ success: true, message: 'Your password has been changed successfully' });
             }
           })
        }
      }
    });
  }

exports.forgetPassword = async (req,res,next) => {

  const newPassword = math.randomNumber()
  try {

      const user = await Company.findOne({
        username: req.query.username
    });
    await user.setPassword(newPassword.toString());
    const updatedUser = await user.save();
    const data = {
      from: "Nutcoders@gmail.com",
      to: "onemustyfc@gmail.com",
      subject: "CHANGED PASSWORD",
      text: `Your new password is ${newPassword}`
    };
    mg.messages().send(data, function (error, body) {
      console.log(body);
    });
    res.json({success:true, message:"Password have been reset and sent to email"})
  } catch (error) {
    res.json({success:false, message:error})
  }
    
}

  // company login controller
exports.loginCompany = (req, res, next) => {

  let payLoad = {}
  // perform authentication
  passport.authenticate('company', (error, user, info) => {
    if (error) return res.json({ success: false, error })
    if (!user)
      return res.json({
        success: false,
        message: 'username or password is incorrect'
      })
    //login the user  
    req.login(user, (error) => {
      if (error){
        res.json({ success: false, message: 'something went wrong pls try again' })
      }else {
        req.session.user = user
        payLoad.id = user.username
        const token = jwt.sign(payLoad, 'myVerySecret');

        const newUser = {
          token: token,
          _id: user._id,
          username: user.username,
          companyName: user.companyName,
          email: user.email,
          phone: user.phone,
          email: user.email,
          image: user.image,
          admin: user.admin,
          address: user.address,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          __v: user.__v
        }
        
        res.json({ success: true, newUser:newUser})
      }
    })
  })(req, res, next)
}

 


// find all company
exports.findAllCompany = async (req,res, next) => {

  try {
    const result = await Company.find({},{staff:0,invoice:0,expenses:0});
    result.length > 0
    ? res.json({success: true, message: result,})
    : res.json({success: false, message: result,})
  } catch (error) {
    console.log(error)
  }
  
}


// find single Company
exports.singleCompany = async (req,res, next) => {
  const {username} = req.query
  try {
    const result = await Company.findOne({username: username},{staff:0,invoice:0,expenses:0});
    result
     ? res.json({success: true, message: result,})
     : res.json({success: false, message: result,})
    
  } catch (error) {
    console.log(error)
  }
}

// set profile pic
exports.setProfilePic = async (req,res, next) => {
  const {eventName,staffId,companyId} = req.query
  
  singleUpload(req, res, async function(err) {
    if (err instanceof multer.MulterError) {
    return res.json(err.message);
    }
    else if (err) {
      return res.json(err);
    }
    else if (!req.file) {
      return res.json({"image": req.file, "msg":'Please select an image to upload'});
    }
    if(req.file){

        if(eventName == 'company'){
          const result = await Company.findOne({username: companyId},{_id: 0,image: 1})

        if (result.image != null){
          const imageName = result.image.split('/').splice(7)
          console.log('-----------------',imageName)
  
          cloudinary.v2.api.delete_resources_by_prefix(imageName[0], 
          {
            invalidate: true,
            resource_type: "raw"
        }, 
          function(error,result) {
            console.log(result, error) 
          }); 
        }

      cloudinary.v2.uploader.upload(req.file.path, 
        { resource_type: "raw" }, 
        async function(error, result) {
        console.log('111111111111111111',result, error); 

        
        await Company.findOneAndUpdate({username: companyId},{$set: {image: result.secure_url}})
        const editedStaff = await Company.findOne({username: companyId},{staff:0,password:0,invoice:0,expenses:0})
        
        res.json({success: true,
          message: editedStaff,
                     },
          );
        });
        }else if(eventName == "staff"){
          const result = await Company.aggregate([
            {$match:{"staff.staffId":staffId}},
            {$project:{_id:0,staff:1}},
            {$unwind: "$staff"},
            {$match: {"staff.staffId":staffId}},
    
          ])
          console.log(result)
          if (result.image != null){
            const imageName = result.image.split('/').splice(7)
            console.log('-----------------',imageName)
    
            cloudinary.v2.api.delete_resources_by_prefix(imageName[0], 
            {
              invalidate: true,
              resource_type: "raw"
          }, 
            function(error,result) {
              console.log(result, error) 
            }); 
          }
          cloudinary.v2.uploader.upload(req.file.path, 
            { resource_type: "raw" }, 
            async function(error, result) {
            console.log('111111111111111111',result, error); 
    
            await Company.findOneAndUpdate({"staff.staffId":staffId},{$set: {"staff.$.image": result.secure_url}})
            const editedStaff = await Company.aggregate([
              {$match:{"staff.staffId":staffId}},
              {$project:{_id:0, "staff.password":0}},
              {$unwind: "$staff"},
              {$match: {"staff.staffId":staffId}},
            ])
            
            res.json({success: true,
              message: editedStaff[0]['staff'],
                         },
              );
            });
    
        }else {
          console.log('not match')
    
        }            
        
     
       
    }
       
    });

    
        
  
}

// edit Company
exports.editCompany = async (req,res,next) => {
  try {
    const {username} = req.query;
    await Company.findOneAndUpdate({username: username}, req.body,{new:true})
    const result = await Company.findOne({username: username},{staff:0,invoice:0,expenses:0})
    res.json({success: true, message: result})
    
  } catch (error) {
    console.log(error)
  }
}

// edit staff
exports.editStaff = async (req,res,next) => {
  const {staffName,address, email,phone} = req.body
  try {
    const {staffId} = req.query;
    await Company.findOneAndUpdate({"staff.staffId":staffId},{$set: 
      {"staff.$.staffName": staffName,
      "staff.$.address": address,
      "staff.$.email": email,
      "staff.$.phone": phone,
      
    }})

    const editedStaff = await Company.aggregate([
      {$match:{"staff.staffId":staffId}},
      {$project:{_id:0, "staff.password":0}},
      {$unwind: "$staff"},
      {$match: {"staff.staffId":staffId}},
    ])
    res.json({success: true, message: editedStaff[0]['staff']})
    
  } catch (error) {
    console.log(error)
  }
}

// create staffs
exports.createStaff = async (req,res,next) => {

  const password = randomstring.generate(8)
  const {companyId} = req.body
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);
  try {
    const staff = {
      staffId: `${req.body.companyName.slice(0,3).toLocaleUpperCase()}/STAFF/${randomstring.generate(4)}`,
      password: hash,
      staffName: req.body.staffName,
      phone: req.body.phone,
      email: req.body.email,
      image: null,
      companyName: req.body.companyName
    }
    
    await Company.findOneAndUpdate({"username":companyId},{$push:{"staff":staff}},{new:true})
    const result = await Company.findOne({"username":companyId},{_id:0,staff:1}) 
    res.json({success:true, message:result, password})
  } catch (error) {
    console.log(error)
  }
  
}

// staff login
exports.loginStaff = async (req,res,next) => {

  const data = {staffId,password} = req.body
  let payLoad = {}

  const staff = await Company.aggregate([
    {$match:{"staff.staffId":staffId}},
    {$project:{_id:0,staff:1}},
    {$unwind: "$staff"},
    {$match: {"staff.staffId":staffId}},

  ])
  console.log(staff)
  if(staff.length > 0){
    const company = await Company.findOne({"staff.staffId":staffId})
  
  !staff && res.json({success:false, message:"StaffId or password incorrect"})
  
  const checkPassword = bcrypt.compareSync(data.password, staff[0]['staff']['password'])
  
  console.log(checkPassword)
  !checkPassword && res.json({success:false,message:"StaffId or password incorrect"})
  payLoad.id = staff[0]['staff']['staffId']
  
  const token = jwt.sign(payLoad, 'myVerySecret');
  const newUser = {
    token: token,
    staffName: staff[0]['staff']['staffName'],
    email: staff[0]['staff']['email'],
    phone: staff[0]['staff']['phone'],
    image: staff[0]['staff']['image'],
    address: staff[0]['staff']['address'],
    staffId: staff[0]['staff']['staffId'],


  }
  res.json({success:true, newUser:newUser, company:company});
  }else {
  res.json({success:false, message: 'User doesnt exist'});

  }

  
  // console.log(staff)

}


/**** STAFFS START HERE     ****//////////////////////////////////////////////

// get staffs
exports.getStaffs = async (req,res, next) => {
  const {companyId} = req.query
  try {
    const result = await Company.findOne({username:companyId},{_id:0,"staff.password":0,});
    res.json({success: true, message: result.staff,})
    
  } catch (error) {
    console.log(error)
    
  }
}

// get single staff
exports.getSingleStaff = async (req,res, next) => {
  const {staffId} = req.query
  try {
    const result = await Company.aggregate([
      {$match:{"staff.staffId":staffId}},
      {$project:{_id:0,"staff.password":0}},
      {$unwind: "$staff"},
      {$match:{"staff.staffId":staffId}},
      {$project:{_id:0,"staff":1,username:1, companyName:1}},
      {$project:{"staff":{
        staffId,
        staffName:"$staff.staffName",
        phone: "$staff.phone",
        email: "$staff.email",
        username: "$username",
        companyName: "$companyName",
        image: "$staff.image",
        address: "$staff.address"
      }}},



    ])
    console.log(result)
    res.json({success: true, message: result[0].staff,})
    
  } catch (error) {
    console.log(error)
    
  }
}

// delete staff

exports.deleteStaff = async (req,res, next) => {
  const {staffId} = req.query
  try {
    const result = await await Company.aggregate([
      {$match:{"staff.staffId":staffId}},
      {$project:{_id:0,staff:1}},
      {$unwind: "$staff"},
      {$match:{"staff.staffId":staffId}},

    ])
    let singleStaff = result[0]['staff']
    console.log(singleStaff)
    const cDelete = async ()=>{

      if(singleStaff.image != undefined || singleStaff.image != null)  await cloudinaryUplouder.delete(singleStaff.image)
    }
    const myPromise = new Promise(async (resolve, reject) => {
      resolve(cDelete())
    });

    myPromise.then( async ()=>{
      singleStaff = await Company.findOneAndUpdate({"staff.staffId":staffId},{$pull:{"staff":{"staffId":staffId}}},{"staff.password": 0},{new:true})
      res.json({success: true, message: singleStaff})
    })
    
  } catch (error) {
    console.log(error)
    
  }
}

exports.createInvoice = async (req,res,next) => {
  const {companyId} = req.body
  const data = {date,customerName,product} = req.body
  data.receiptNumber = randomstring.generate(8)
  data.month = new Date(date).getMonth() + 1
  data.year = new Date(date).getUTCFullYear()
  data.timeEntered = new Date()
  data.grandTotal = parseInt(req.body.grandTotal)
  data.week = getWeek(date)
  data.day = parseInt(date.substr(8,2))


  try {
    await Company.findOneAndUpdate({"username":companyId},{$push:{"invoice":data}},{new:true})
    const result = await Company.findOne({"username":companyId},{_id:0,username:1,invoice:1})
    res.json({success:true, message:"invoice added",data})
  } catch (error) {
    console.log(error)
  }

} 

exports.createExpenses = async (req,res,next) => {
  const {companyId} = req.body
  const data = {date,collectorsName,purpose} = req.body
  data.receiptNumber = randomstring.generate(8)
  data.month = new Date(date).getMonth() + 1
  data.year = new Date(date).getUTCFullYear()
  data.week = getWeek(date)
  data.timeEntered = new Date()
  data.amount = parseInt(req.body.amount)

  try {
    await Company.findOneAndUpdate({"username":companyId},{$push:{"expenses":data}},{new:true})
    const result = await Company.findOne({"username":companyId},{_id:0,username:1,expenses:1})

    res.json({success:true, message:"expenses added",data})
  } catch (error) {
    console.log(error)
  }

} 

exports.getAllInvoicesDaily = async (req,res,next) => {
  const {companyId,date} = req.query
  try {
    
    const result = await Company.aggregate([
      {$match:{username:companyId}},
      {$project:{_id:0, invoice:1}},
      {$unwind:"$invoice"},
      {$match: {"invoice.date":date}},
      // {$unwind:"$invoice.product"},
      // {$group: {_id: "$invoice.receiptNumber"}},
  
  
    ])
    res.json({success:true,result})
  } catch (error) {
    console.log(error)
  }
}

exports.getSearchInvoices = async (req,res,next) => {
  const {companyId,search} = req.query
  try {
    
    const result = await Company.aggregate([
      {$match:{username:companyId}},
      {$project:{_id:0, invoice:1}},
      {$unwind:"$invoice"},
      {$match: {$or: [{"invoice.customerName": new RegExp(search,'i')},{"invoice.receiptNumber": new RegExp(search,'i')}]}},
      // {$unwind:"$invoice.product"},
      // {$group: {_id: "$invoice.receiptNumber"}},
  
  
    ])
    res.json({success:true,result})
  } catch (error) {
    console.log(error)
  }
}


exports.getAllExpensesDaily = async (req,res,next) => {
  const {companyId,date} = req.query
  try {
    
    const result = await Company.aggregate([
      {$match:{username:companyId}},
      {$project:{_id:0, expenses:1}},
      {$unwind:"$expenses"},
      {$match: {"expenses.date":date}},
        
  
    ])
    res.json({success:true,result})
  } catch (error) {
    console.log(error)
  }
}

exports.getSearchExpenses = async (req,res,next) => {
  const {companyId,search} = req.query
  try {
    
    const result = await Company.aggregate([
      {$match:{username:companyId}},
      {$project:{_id:0, expenses:1}},
      {$unwind:"$expenses"},
      {$match: {$or: [{"expenses.collectorsName": new RegExp(search,'i')},{"expenses.receiptNumber": new RegExp(search,'i')}]}},

        
  
    ])
    res.json({success:true,result})
  } catch (error) {
    console.log(error)
  }
}


// statistics
exports.getStatistics = async (req,res,next) => {
  const {companyId} = req.query
  const date = formatDate(new Date())
  try {
    
    const dailyInvoice = await Company.aggregate([
      {$match:{username:companyId}},
      {$project:{_id:0, "invoice.grandTotal":1,"invoice.date":1}},
      {$unwind: {path:"$invoice"}},
      {$match: {"invoice.date":date}},
      {$group: {
        _id: "$invoice.date",
        total: {$sum: "$invoice.grandTotal"}, 
        totalNumberOfInvoice: {$sum: 1}
          }
        }
  
    ])
    const dailyExpenses = await Company.aggregate([
      {$match:{username:companyId}},
      {$project:{_id:0, "expenses.amount":1,"expenses.date":1}},
      {$unwind: {path:"$expenses"}},
      {$match: {"expenses.date":date}},
      {$group: {
        _id: "$expenses.date",
        total: {$sum: "$expenses.amount"}, 
        totalNumberOfExpenses: {$sum: 1}
          }
        }
  
    ])

    const weaklyInvoice = await Company.aggregate([
      {$match:{username:companyId}},
      {$project:{_id:0, "invoice.grandTotal":1,"invoice.week":1,"invoice.year":1,"invoice.date":1}},
      {$unwind: {path:"$invoice"}},
      {$match: {$and:[{"invoice.week":getWeek(date)},{"invoice.year":new Date(date).getUTCFullYear()}]}},
      {$group: {
        _id: "$invoice.week",
        total: {$sum: "$invoice.grandTotal"}, 
        totalNumberOfInvoice: {$sum: 1}
          }
        }
  
    ])

    const weaklyExpenses = await Company.aggregate([
      {$match:{username:companyId}},
      {$project:{_id:0, "expenses.amount":1,"expenses.week":1,"expenses.year":1,"expenses.date":1}},
      {$unwind: {path:"$expenses"}},
      {$match: {$and:[{"expenses.week":getWeek(date)},{"expenses.year":new Date(date).getUTCFullYear()}]}},
      {$group: {
        _id: "$expenses.week",
        total: {$sum: "$expenses.amount"}, 
        totalNumberOfExpenses: {$sum: 1}
          }
        }
  
    ])

    const monthlyInvoice = await Company.aggregate([
      {$match:{username:companyId}},
      {$project:{_id:0, "invoice.grandTotal":1,"invoice.month":1,"invoice.year":1,"invoice.date":1}},
      {$unwind: {path:"$invoice"}},
      {$match: {$and:[{"invoice.month":new Date().getMonth() + 1},{"invoice.year":new Date(date).getUTCFullYear()}]}},
      {$group: {
        _id: "$invoice.month",
        total: {$sum: "$invoice.grandTotal"}, 
        totalNumberOfInvoice: {$sum: 1}
          }
        }
  
    ])

    const monthlyExpenses = await Company.aggregate([
      {$match:{username:companyId}},
      {$project:{_id:0, "expenses.amount":1,"expenses.month":1,"expenses.year":1,"expenses.date":1}},
      {$unwind: {path:"$expenses"}},
      {$match: {$and:[{"expenses.month":new Date().getMonth() + 1},{"expenses.year":new Date(date).getUTCFullYear()}]}},
      {$group: {
        _id: "$expenses.month",
        total: {$sum: "$expenses.amount"}, 
        totalNumberOfExpenses: {$sum: 1}
          }
        }
  
    ])
    res.json({success:true,dailyInvoice,dailyExpenses, weaklyInvoice, weaklyExpenses, monthlyInvoice, monthlyExpenses})
  } catch (error) {
    console.log(error)
  }
}

// get chart statistics
exports.getChatStatistics = async (req,res,next) => {
  const {companyId} = req.query
  
  try {


    const daysBackDailyInvoice = async () => {
      return dailyInvoice = await Company.aggregate([
        {$match:{username:companyId}},
        {$project:{_id:0, "invoice.grandTotal":1,"invoice.date":1,"invoice.day":1}},
        {$unwind: {path:"$invoice"}},
        {$group: {
          _id: {date:"$invoice.date",day:"$invoice.day"},
          dailyTotal: {$sum: "$invoice.grandTotal"}, 
          totalNumberOfInvoice: {$sum: 1},
            }
          },
        // {$sort: {"_id.date":-1}},
        {$limit: 10}

    
      ])
    }
    const daysBackWeeklyInvoice = async () => {
      return weaklyInvoice = await Company.aggregate([
        {$match:{username:companyId}},
        {$project:{_id:0, "invoice.grandTotal":1,"invoice.week":1,"invoice.year":1,"invoice.date":1}},
        {$unwind: {path:"$invoice"}},
        {$group: {
          _id: {week:"$invoice.week", year:"$invoice.year"},
          dailyTotal: {$sum: "$invoice.grandTotal"}, 
          totalNumberOfInvoice: {$sum: 1}
            }
          },
          {$sort:{"_id.week":-1}},
          {$limit: 10}
    
      ])
    }

    const daysBackMonthlyInvoice = async () => {
      return monthlyInvoice = await Company.aggregate([
        {$match:{username:companyId}},
        {$project:{_id:0, "invoice.grandTotal":1,"invoice.month":1,"invoice.year":1,"invoice.date":1}},
        {$unwind: {path:"$invoice"}},
        {$group: {
          _id: {month:"$invoice.month", year:"$invoice.year"},
          dailyTotal: {$sum: "$invoice.grandTotal"}, 
          totalNumberOfInvoice: {$sum: 1}
            }
          },
          {$sort:{"_id.month":-1}},
          {$limit: 10}
    
      ])
    }
    let daily = await daysBackDailyInvoice()
    let weekly = await daysBackWeeklyInvoice()
    let monthly = await daysBackMonthlyInvoice()

    

    res.json({success:true, daily,weekly,monthly})

  } catch (error) {
    console.log(error)
  }
}  


exports.removeCompany = async (req,res,next) => {
  const {companyId} = req.query;
  let result
  try {

    const resultImage = await Company.findOne({"username":companyId})
    const deleteAllStaff = async () => {
      resultImage.staff.map(async (stf)=>{
        // console.log(stf)
  
        if (stf.image != undefined || stf.image != null) await cloudinaryUplouder.delete(stf.image)
       
        
      })    
      if (resultImage.image != null) await cloudinaryUplouder.delete(resultImage.image)
    }
    
    const myPromise = new Promise(async (resolve, reject) => {
      resolve(deleteAllStaff())
    });

    myPromise.then(async ()=>{

      await Company.findOneAndDelete({"username": companyId})
      result = await Company.find({},{_id:0,staff:0})
      res.json({success: true, message: `Company with the ID ${companyId} has been removed`, result})
    })
   
    

  } catch (error) {
    console.log(error)
    
  }
}




        
  

