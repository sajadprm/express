const express = require('express');
const router = express.Router();
const User = require("../model/user.model");

router.get('/', (req, res) => {
    User.find().exec((err, result) => {
        if (err) {
            res.sendStatus(500);
            console.log(err);

        } else {
            res.json(result);
        }
    })

});

router.get("/:id", (req, res) => {
    User.findById(req.params.id).exec((err, user) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        };
        if (!user) {
            return res.sendStatus(404);

        }
        res.json(user);
    })
})

router.put("/:id", (req, res) => {
    User.findById(req.params.id).exec((err, user) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }

        if (!user) {
            return res.sendStatus(404);
        }
        (req.body.firstName !== undefined) && (user.firstName = req.body.firstName);
        (req.body.lastName !== undefined) && (user.lastName = req.body.lastName);
        (req.body.age !== undefined) && (user.age = req.body.age);
        (req.body.isActive !== undefined) && (user.isActive = req.body.isActive);

        user.save().then(savedUser => {
            res.json(savedUser);
        });
    })
});

router.delete("/:id", (req, res) => {
    User.findByIdAndDelete(req.params.id).then((deletedUser) => {
        if (!deletedUser) {
            return res.sendStatus(404);
        }
        res.sendStatus(200);

    });
});



module.exports = router;