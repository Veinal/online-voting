const express=require('express')
const router=express.Router()

const {Insert,View,SingleView,Delete,Update,calculateElectionResult}=require('../controller/Election')

router.post('/insert',Insert)
router.get('/view',View)
router.get('/singleview/:id',SingleView)
router.delete('/delete/:id',Delete)
router.put('/update/:id',Update)
router.post('/calculateResult/:id',calculateElectionResult)

module.exports=router