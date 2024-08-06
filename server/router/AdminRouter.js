const express=require('express')
const router=express.Router()
// const Admin=require('../')


const {Register,Login,View,SingleView,Delete,Update}=require('../controller/AdminReg')

router.post('/register',Register)
router.post('/login',Login)
router.get('/view',View)
router.get('/singleview/:id',SingleView)
router.delete('/delete/:id',Delete)
router.put('/update/:id',Update)

module.exports=router