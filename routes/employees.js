var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

//REST api creation
mongoose.connect('mongodb://localhost/crew');
var EmployeeSchema = new mongoose.Schema({
    name: String,
    surname: String,
    title: String,
    level: String,
    department: String,
    manager: String,
    month: Number,
    year: Number,
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
 
// Employee.find(function (err, todos) {
//   if (err) return console.error(err);
//   console.log(todos)
// }); 

/* GET users listing. */
router.get('/', function(req, res, next) {
    Employee.find(function (err, data) {
        if (err) return console.error(err);
        res.json(data);
    });
});

router.post('/',function(req,res,next){
    Employee.create(req.body, function(err,post){
        if (err) return next(err);
        res.json(post);
    });
});

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

router.put('/:id', function(req,res,next){
    Employee.findByIdAndUpdate(req.params.id, req.body, function(err,post){
        if (err) return next(err);
        res.json(post);
    }) 
})

router.delete('/:id', function(req,res,next){
    Employee.findByIdAndRemove(req.params.id, req.body, function(err,post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = router;
