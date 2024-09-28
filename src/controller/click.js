import express from "express";
import Clicks from '../database/models/clickModel.js';

const router = express.Router();


router.get("/all-clicks", async (req, res) => { 
  try{
    const clicks = await Clicks.findAll({
      attributes: ['ipAddress', 'userAgent', 'createdAt', 'updatedAt']
    });

    res.status(200).json({ clicks });
  }catch(error){
    res.status(500).send(error.message);
  }
})

export default router;