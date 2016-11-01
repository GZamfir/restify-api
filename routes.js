module.exports = function(app) {
  var student = require('./controllers/studentController');
  var article = require('./controllers/articleController');
  var comment = require('./controllers/commentController');

  app.get('/', function(req, res, next){
    return res.send("WELCOME TO REST API");
  });

  app.get('/student', student.getStudents);
  app.post('/student', student.createStudent);
  app.get('/student/:id', student.getStudent);
  app.del('/student/:id', student.deleteStudent);
  app.put('/student/:id', student.updateStudent);

  app.get('/articles', article.viewArticles);
  app.post('/articles', article.createArticle);
  app.get('/articles/:id', article.getArticle);
  app.del('/articles/:id', article.deleteArticle);
  app.put('/articles/:id', article.updateArticle);

  app.post("/articles/:id/comments", comment.createComment);
  app.get("/articles/:id/comments", comment.viewComments);
  app.get("/articles/:id/comments/:commentId", comment.viewComment);
  app.put("/articles/:id/comments/:commentId", comment.updateComment);
  app.del("/articles/:id/comments/:commentId", comment.deleteComment);
};
