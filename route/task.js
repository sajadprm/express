const express = require('express');
const async = require('hbs/lib/async');
const router = express.Router();
const Task = require("../model/task.model");
const ac=require("../tools/ac");
const sortTools=require("../tools/query")
router.get('/', async (req, res) => {
    try {
        const skip=req.query?.skip ? Number(req.query.skip) : 0;
        const limit=req.query?.limit && req.query.limit <=5 ? Number(req.query.limit) : 5;
        const sort=req.query?.sort ? sortTools.createSort(req.query.sort) : {};
        
        const match = {};
        if (req.query ?.complete) {
           match.isCompleted=req.query.complete
        } 


        // const task = await Task.find(query)
        const userTask= await req.user.populate({
            path:"tasks",
            match,
            options:{
                skip,
                limit,
                sort
            }
        }
            
        )

        res.json(userTask.tasks);

    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
});


router.get("/all",ac.checkAdminMidellware,async (req,res)=>{
    try {

        const skip=req.query?.skip ? Number(req.query.skip) : 0;
        const limit=req.query?.limit && req.query.limit <=5 ? Number(req.query.limit) : 5;
        const sort=req.query?.sort ? sortTools.createSort(req.query.sort) : {};
        const match = {};
        if (req.query ?.complete) {
           match.isCompleted=req.query.complete
        } 
        if(req.query?.userId)
        {
            match.user=req.query.userId;
        }


        const tasks= await Task.find(match).skip(skip).limit(limit).sort(sort);

            
        

        res.json(tasks);

    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
})


router.get("/:id", async (req, res) => {
    try {
        const task = await Task.findOne({
            user: req.user._id,
            _id: req.params.id
        })

        if (!task) {
            return res.sendStatus(404);
        }

        res.json(task);

    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }

})

router.put('/:id', async (req, res) => {
    try {
        const updateReqKeys=Object.keys(req.body);
        const allowedUpdate=['title','description','isCompleted'];
        const isAllowedUpdate=updateReqKeys.every((key)=>allowedUpdate.includes(key));
       
        if(!isAllowedUpdate)
        {
            return res.sendStatus(400);
        }

        const task = await Task.findOneAndUpdate({
            _id: req.params.id,
            user: req.user._id
        }, req.body, {
            new: true
        });

        if (!task) {
            return res.sendStatus(404);
        }
        res.json(task);
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }


});

router.delete('/:id', async (req, res) => {
    try {
        const taskDeleted = await Task.findOneAndDelete({
            _id: req.params.id,
            user: req.user._id
        })
        if (!taskDeleted) {
            return res.sendStatus(404);
        }
        res.sendStatus(200);

    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
});

router.post('/', async (req, res) => {
    try {
        const task = await Task.insertMany({
            title: req.body.title,
            user: req.user._id
        });
        return res.json(task);
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
});


module.exports = router;