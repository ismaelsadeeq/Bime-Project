var express = require('express');
var router = express.Router();
const adminController = require('../controllers/adminController')
const passport = require('passport');


/** All post request *//////////////////////////////////////////////

// register company route
router.post('/register-company',  adminController.registerCompany)

// register staff route
router.post('/register-staff',  adminController.createStaff)

// create invoice
router.post('/create-invoice',  adminController.createInvoice)

// create expenses
router.post('/create-expenses',  adminController.createExpenses)

// set profie pic
router.put('/set-profile-pic',  adminController.setProfilePic)

// edit company
router.put('/edit-company', adminController.editCompany)

// edit staff
router.put('/edit-staff', adminController.editStaff)


// login company
router.post('/login', adminController.loginCompany)

// login staff
router.post('/login-staff', adminController.loginStaff)

// /** All get request *///////////////////////////////////////////////////////////////

// get all company
router.get('/get-all-company', adminController.findAllCompany)


// get single company
router.get('/get-single-company', adminController.singleCompany)

// get all staffs
router.get('/get-all-staff', adminController.getStaffs)

// get single staff
router.get('/get-single-staff', adminController.getSingleStaff)

// get all invoices
router.get('/get-all-invoices-daily', adminController.getAllInvoicesDaily)

// get search invoices
router.get('/get-search-invoices', adminController.getSearchInvoices)

// get all expenses
router.get('/get-all-expenses-daily', adminController.getAllExpensesDaily)

// get search expenses
router.get('/get-search-expenses', adminController.getSearchExpenses)


// get statistics
router.get('/get-statistics', adminController.getStatistics)

// get chat statistics
router.get('/get-chat-statistics', adminController.getChatStatistics)

// remove staff
router.put('/remove-staff', adminController.deleteStaff)

// remove department program
router.delete('/remove-company', adminController.removeCompany)


module.exports = router;