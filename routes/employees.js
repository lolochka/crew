var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

//Mongo Schema
mongoose.connect('mongodb://localhost/crew');
var EmployeeSchema = new mongoose.Schema({
    name: String,
    surname: String,
    title: String,
    level: String,
    department: String,
    manager: String,
    experience: {
      month: Number,
      year: Number
    },
    skills: [String],
    photo: String,
    skype: String,
    email: String,
    links: {
        ld: String,
        bh: String,
        other: String
    },
    comments: [{
        text: String,
        date: Date,
        user: String,
        _id: Number
    }]
});

var Employee = mongoose.model('Employee', EmployeeSchema);

/* REST api creation */
/* GET employees listing. */
router.get('/', function(req, res, next) {
    Employee.find(function (err, data) {
        if (err) return console.error(err);
        res.json(data);
    });
});

/* CREATE new employee */
router.post('/',function(req,res,next){
    Employee.create(req.body, function(err,post){
        if (err) return next(err);
        res.json(post);
    });
});

/* GET employee */
router.get('/:id', function(req, res, next){
    Employee.findById(req.params.id, function (err, post){
        if (err) {
            if (err.name === 'CastError') {
                err.status = 404;
            }
            return next(err);
        };
        res.json(post);
    });
});

/* UPDATE employee */
router.put('/:id', function(req,res,next){
    delete req.body.$resolved;
    delete req.body.$promise;
    Employee.findByIdAndUpdate(req.params.id, req.body, function(err,post){
        if (err) return next(err);
        res.json(post);
    }) 
})

/* DELETE employee */
router.delete('/:id', function(req,res,next){
    Employee.findByIdAndRemove(req.params.id, req.body, function(err,post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = router;