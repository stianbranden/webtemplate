const express = require('express');
const router = express.Router();
let projectName = process.env.PROJECT;

router.get('/', (req,res)=>{
  res.render('index', {
    projectName
  });
});



module.exports = router;
