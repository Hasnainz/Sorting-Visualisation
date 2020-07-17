const router = require('express').Router();
let runtimeModel = require('../models/runtime.model');

router.route('/').get((req, res) => {
    runtimeModel.find()
    .then(users => res.json(users))
    .catch(error => res.status(400).json('Error: ') + error);
});

router.route('/add').post((req, res) => {
    const sort = req.body.SortType;
    const runtime =  Number(req.body.RunTime);
    const sortsize = Number(req.body.ArraySize);
    const post = new runtimeModel({
        sort,
        runtime,
        sortsize
    });
    post.save()
    .then(() => res.json('Entry added'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;