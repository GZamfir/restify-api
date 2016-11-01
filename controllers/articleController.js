function articleController() {
  var mongoose = require('mongoose');
  var Article = require('../models/Article');
  ObjectId = mongoose.Types.ObjectId;

  this.createArticle = function(req, res, next){
    var slug = require('limax');
    var title = req.body.title;
    var slug = slug(title);
    var i = 1;
    while (loopTrhoughSlugs(slug) == true) {
      slug = slug + "-" + i;
      i++;
    }

    var content = req.body.content;
    var articleModel = new Article({title: title, slug: slug, content: content});
    articleModel.save(function(err, article){
      if(err){
        res.status(500);
        res.json({
          type: false,
          data: "Error occured: " + err
        })
      } else {
        res.json({
          type: true,
          data: article
        })
      }
    })
  }

  function loopTrhoughSlugs(slug){
    Article.find({"slug": slug}, function(err, article){
      if(err){
        res.status(500);
        res.json({
          type: false,
          data: "Error occured: " + err
        })
      } else {
        console.log(article);
        if(article){
          return true;
        } else {
          return false;
        }
      }
    })
  }

  this.viewArticles = function(req, res, next){
    Article.find({}, function(err, articles){
      if(err){
        res.status(500);
        res.json({
          type: false,
          data: "Error occured: " + err
        })
      } else {
        res.json({
          type: true,
          data: articles
        })
      }
    })
  }

  this.getArticle = function(req, res, next){
    Article.findById(new ObjectId(req.params.id), function(err, article){
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
    })
  }

  this.updateArticle = function(req, res, next){
    var title = req.params.title;
    var slug = req.params.slug;
    var content = req.params.content;

    Article.findByIdAndUpdate(new ObjectId(req.params.id), {title: title, slug: slug, content: content}, function(err, article){
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
    })
  }

  this.deleteArticle = function(req, res, next){
    Article.findByIdAndRemove(new ObjectId(req.params.id), function(err, article){
      if(err){
        res.status(500);
        res.json({
          type: false,
          data: "Error occured: " + err
        })
      } else {
        res.json({
          type: true,
          data: "Article: " + req.params.id + "deleted successfully"
        })
      }
    })
  }

  return this;
}

module.exports = new articleController();
