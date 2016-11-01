function studentController() {
  var Student = require('../models/studentSchema');

  //creating new student
  this.createStudent = function(req, res, next){
    var name = req.params.name;
    var email = req.params.email;
    var age = req.params.age;
    var city = req.params.city;

    Student.create({name: name, email: email, age: age, city: city}, function(err, result){
      if(err) {
        console.log(err);
        return res.send({'error': err});
      } else {
        return res.send({'result': result, 'status': 200})
      }
    });
  };

  this.getStudents = function(req, res, next){
    Student.find({}, function(err, result){
      if(err) {
        console.log(err);
        return res.send({'error': err});
      } else {
        return res.send(result)
      }
    });
  };

  this.getStudent = function(req, res, next){
    var studentId = req.params.id;

    Student.findOne({"_id": studentId}, function(err, result){
      if(err) {
        console.log(err);
        return res.send({'error': err});
      } else {
        return res.send(result)
      }
    });
  };

  this.deleteStudent = function(req, res, next){
    var studentId = req.params.id;

    Student.remove({"_id": studentId}, function(err, result){
      if(err) {
        console.log(err);
        return res.send({'error': err});
      } else {
        return res.send({"status": 204});
      }
    });
  }

  this.updateStudent = function(req, res, next){
    var name = req.params.name;
    var email = req.params.email;
    var age = req.params.age;
    var city = req.params.city;

    var studentId = req.params.id;

    Student.findOneAndUpdate({"_id": studentId}, {name: name, email: email, age: age, city: city}, function(err, result){
      if(err) {
        console.log(err);
        return res.send({'error': err});
      } else {
        return res.send({'result': result, 'status': 200})
      }
    });
  }

  return this;
}

module.exports = new studentController();
