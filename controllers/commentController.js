function commentController() {
  var mongoose = require('mongoose');
  var Article = require('../models/Article');
  var Comment = require('../models/Comment');
  ObjectId = mongoose.Types.ObjectId;

  this.createComment = function(req, res, next) {
    var comment = new Comment(req.body);
    Article.findOneAndUpdate(
      {"_id": new ObjectId(req.params.id)},
      {$push: {'comments': comment}},
      function(err, article){
        if(err){
          res.status(500);
          res.json({
            type: false,
            data: "Error occured: " + err
          })
        } else {
          if(article){
            res.json({
              type: true,
              data: article
            })
          } else {
            res.json({
              type: false,
              data: "Article: " + req.params.id + " not found"
            })
          }
        }
      }
    )
  }

  this.viewComment = function(req, res, next) {
    Article.findOne({"comments._id": new ObjectId(req.params.commentId)}, {"comments.$": 1}, function(err, comment){
      if(err){
        res.status(500);
        res.json({
          type: false,
          data: "Error occured: " + err
        })
      } else {
        if(comment) {
          res.json({
            type: true,
            data: new Comment(comment.comments[0])
          })
        } else {
          res.json({
            type: false,
            data: "Comment: " + req.params.commentId + " not found"
          })
        }
      }
    })
  }

  this.viewComments = function(req, res, next) {
    Article.findOne({"_id": new ObjectId(req.params.id)}, function(err, article){
      if(err){
        res.status(500);
        res.json({
          type: false,
          data: "Error occured: " + err
        })
      } else {
        if(article) {
          res.json({
            type: true,
            data: article.comments
          })
        } else {
          res.json({
            type: false,
            data: "Article: " + req.params.id + " not found"
          })
        }
      }
    })
  }

  this.updateComment = function(req, res, next){
    var text = req.params.text;
    Article.update(
      {"comments._id": new ObjectId(req.params.commentId)},
      {"$set": {"comments.$.text": text}},
      function(err) {
        if(err){
          res.status(500);
          res.json({
            type: false,
            data: "Error occured: " + err
          })
        } else {
          res.json({
            type: true,
            data: "Comment: " + req.params.commentId + " updated"
          })
        }
      }
    )
  }

  this.deleteComment = function(req, res, next){
    Article.findOneAndUpdate(
      {"comments._id": new ObjectId(req.params.commentId)},
      {"$pull": {"comments": {"_id": new ObjectId(req.params.commentId)}}},
      function(err, article){
        if(err){
          res.status(500);
          res.json({
            type: false,
            data: "Error occured: " + err
          })
        } else {
          if(article){
            res.json({
              type: true,
              data: article
            })
          } else {
            res.json({
              type: false,
              data: "Comment: " + req.params.commentId + " not found"
            })
          }
        }
      }
    )
  }
  return this;
}

module.exports = new commentController();
