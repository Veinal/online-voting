const express=require('express')
const router=express.Router()

const {Insert,View,Check,SingleView,Delete,Update}=require('../controller/Votes')

router.post('/insert',Insert)
router.get('/view',View)
router.get('/check',Check)
router.get('/singleview/:id',SingleView)
router.delete('/delete/:id',Delete)
router.put('/update/:id',Update)

module.exports=router