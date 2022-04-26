const express = require('express');
const async = require('hbs/lib/async');
const router = express.Router();
const Task = require("../model/task.model");
router.get('/', async (req, res) => {
    try {
        const query = {
            user: req.user._id
        };
        if (req.query.complete === "true") {
            query.isCompleted = true
        } else if (req.query.complete === "false") {
            query.isCompleted = false;
        }


        const task = await Task.find(query)

        res.json(task);

    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
});

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