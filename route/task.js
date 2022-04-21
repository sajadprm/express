const express = require('express');
const router = express.Router();
const Task = require("../model/task.model");
router.get('/', (req, res) => {
    const query = {};
    if (req.query.complete === "true") {
        query.isCompleted = true
    } else if (req.query.complete === "false") {
        query.isCompleted = false;
    }

    Task.find(query).exec((err, result) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }

        res.json(result);
    })
});

router.get("/:id", (req, res) => {
    Task.findById(req.params.id).exec((err, task) => {
        if (err) {
            console.log(err)
            return res.sendStatus(500);
        }
        if (!task) {
            return res.sendStatus(404);
        }

        res.json(task);

    })
})

router.put('/:id', (req, res) => {
    Task.findByIdAndUpdate(req.params.id).then((task) => {

        if (!task) {
            return res.sendStatus(404);
        }
        (req.body.title !== undefined) && (task.title = req.body.title);
        (req.body.description !== undefined) && (task.description = req.body.description);
        (req.body.isCompleted !== undefined) && (task.isCompleted = req.body.isCompleted);
        task.save();
        res.json(task);

    })
});

router.delete('/:id', (req, res) => {
    Task.findByIdAndDelete(req.params.id).then(taskDeleted => {
        if (!taskDeleted) {
            return res.sendStatus(404);
        }
        res.sendStatus(200);
    });
});

router.post('/', (req, res) => {
    Task.insertMany({
        title: req.body.title
    }).then((task) => {
        if (!task) {
            console.log(task);
            return res.sendStatus(500);
        }
        res.json(task);

    })
});





module.exports = router;