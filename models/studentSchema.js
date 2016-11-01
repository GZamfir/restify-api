module.exports = (function studentSchema() {
  var mongoose = require('../db').mongoose;

  var schema = {
    name: {type: String, required: true},
    email: {type: String, required: true},
    age: {type: Number, required: true},
    city: {type: String, required: true},
  }
  var collectionName = 'student';
  var studentSchema = mongoose.Schema(schema);
  var Student = mongoose.model(collectionName, studentSchema);

  return Student;
})();
