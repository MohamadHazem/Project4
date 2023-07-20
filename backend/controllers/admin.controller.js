const router = require('express').Router()
const responseList = require('../configs/response.config')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Admin = require("../models/admin.model")
require('dotenv').config()

router.get('/', (req, res) => {
  const bearerToken = req.headers?.authorization
  if (!bearerToken) {
      return res.status(401).json({message: responseList.MISSING_TOKEN})
  }
  const token = bearerToken.split(' ')[1]
  if (!token) {
      return res.status(401).json({message: responseList.MISSING_TOKEN})
  }
  try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
      return res.status(200).json({message: responseList.VALID_TOKEN, admin: decodedToken.admin})
  } catch (err) {
      if(err instanceof jwt.TokenExpiredError){
          return res.status(401).json({message: responseList.INVALID_TOKEN})
      }
      return res.status(500).json({message: responseList.SOMETHING_WRONG})
  }  
})

//Admin Signup
router.post('/', async (req, res) => {
  if (!req.body || !req.body.email || !req.body.password) {
      return res.status(400).json({message: responseList.BAD_REQUEST})
  }
  console.log(req.body)
  try {
      const admin = new Admin(req.body)
      await admin.save()
      const token = jwt.sign({id: admin._id}, process.env.JWT_SECRET, {expiresIn: '8h'})
      const adminInfo = {
          email: admin.email,
          password: admin.password,
      }
      return res.status(200).json({message: responseList.CREATED_SUCCESS, admin: {token, ...adminInfo}})
  } catch (err) {
      console.log(err)
      if (err.name === 'MongoServerError' && err.code === 11000) {
          return res.status(400).json({message: responseList.DUPLICATE_USERNAME_EMAIL})
      }
      return res.status(500).json({message: responseList.SOMETHING_WRONG})
  }
})

//Admin Login
router.post('/login', async (req, res) => {
  if (!req.body || !req.body.email || !req.body.password) {
      return res.status(400).json({message: responseList.MISSING_USERNAME_PASSWORD})
  }
  try {
      const admin = await Admin.findOne({email: req.body.email})
      if (!admin) {
          return res.status(400).json({message: responseList.USER_PASSWORD_ERROR})
      }
      if (!admin.isValidPassword(req.body.password)) {
          return res.status(400).json({message: responseList.USER_PASSWORD_ERROR})
      }
      const token = jwt.sign({id: admin._id}, process.env.JWT_SECRET, {expiresIn: '8h'})
      const adminInfo = {
          fullName: admin.fullName,
          contactNo: admin.contactNo,
      }
      return res.status(200).json({admin: {token, ...adminInfo}})
  } catch (err) {
      console.log(err)
      return res.status(500).json({message: responseList.SOMETHING_WRONG})
  }
})

 

  module.exports = router