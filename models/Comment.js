module.exports = (function studentSchema() {
  var mongoose = require('../db').mongoose;

  var schema = {
    text: String,
    author: {
      type: String,
      ref: "User"
    }
  }

  var collectionName = 'comment';
  var commentSchema = mongoose.Schema(schema);
  var Comment = mongoose.model(collectionName, commentSchema);

  return Comment;
})();
