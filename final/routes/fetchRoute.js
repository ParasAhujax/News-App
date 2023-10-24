const express = require('express');
const router = express.Router();
const fetchData = require("../middleware/fetchData")

router.get('/:query',(req,res)=>{
    const {query} = req.params;
    console.log(query);

    fetchData(query)
    .then(data => {
        // console.log(data);
        res.json(data);
    });
})
router.post('/:query',fetchData,(req,res)=>{
    const {input} = req.body;
    console.log(req.body);

    fetchData(input)
    .then(data => {
        // console.log(data);
        res.json(data);
    });
    
    // approach-2
    // http request using http request(api key)
})

module.exports = router;