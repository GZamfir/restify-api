module.exports = (function studentSchema() {
  var mongoose = require('../db').mongoose;
  var Comment = require('./Comment');

  var schema = {
    title: String,
    slug: String,
    content: String,
    author: {
      type: String,
      ref: "User"
    },
    comments: [Comment.schema]
  }
  var collectionName = 'article';
  var articleSchema = mongoose.Schema(schema);
  var Article = mongoose.model(collectionName, articleSchema);

  return Article;
})();
