const router = require("express").Router();
const Car = require("../models/car.model");
const responseList = require('../configs/response.config');
const authenticateAdmin = require("../middlewares/admin.middleware")

//Display cars in Home and Admin Home
router.get("/", async (req, res) => {
  try{
    const car = await Car.find();
      res.status(200).json({ car });
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: responseList.BAD_REQUEST });
    }
});


//Add Cars
router.post("/", authenticateAdmin, async (req, res) => {
  try {
   console.log (req.body);
    const car = new Car(req.body);
    await car.save();
    res.status(200).json({ message: responseList.CREATED_SUCCESS });
  } catch (e) {
   console.log (e)
    res.status(400).json({ message: responseList.BAD_REQUEST });
  }
});

//Edit Cars
router.put("/", async (req, res) => {
  try {
    const car = req.body.data;
    await Car.findByIdAndUpdate(req.body._id, { $set:car });
    res.status(200).json({ message: responseList.CREATED_SUCCESS });
  } catch (e) {
    console.log(e)
    res.status(400).json({ message: responseList.BAD_REQUEST });
  }
});

//Delete Cars
router.delete("/", async (req, res) => {
  try {
    console.log(req.body);
    await Car.findByIdAndRemove(req.body._id);
    res.status(200).json({ message: responseList.DELETED_SUCCESS });
  } catch (e) {
    console.log(e)
    res.status(400).json({ message: responseList.DELETED_FAILED });
  }
});

module.exports = router