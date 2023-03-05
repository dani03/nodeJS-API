import express from "express";

const router = express.Router();

router.get('/admin', (req, res, next) => {
  console.log('route admin ')
})



export default router;