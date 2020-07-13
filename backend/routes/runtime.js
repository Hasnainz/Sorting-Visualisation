const express = require('express');
const router = require('express').Router();
let runtimeModel = require('../models/runtime.model');

router.route('/').get((req, res) => {
    runtimeModel.find()
    .then(users => res.json(users))
    .catch(error => res.status(400).json('Error: ') + error);
});

router.route('/add').post((req, res) => {
    const post = new runtimeModel({
        sort: req.body.sort,
        runtime: req.body.runtime,
        sortsize: req.body.sortsize
    });
    post.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;