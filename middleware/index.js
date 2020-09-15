const Campground=require("../models/campground");
const Comment=require("../models/comment");

// all the middleware goes here

const middlewareObj={};

middlewareObj.checkCampgroundOwnership=function(req,res,next){
	
	//check if user is logged in
	if(req.isAuthenticated()){
		//if the user owns the campground by checking the id of the author of the foundCampground
		// to the id of the current logged in user
		//note campground.author.id is a mongoose object 
		//req.user._id is a string hence we need to parse
		//use object.equals(string);
		
		Campground.findById(req.params.id,function(err,campground){
		if(err) {
			req.flash("error","campground not found");
			res.redirect("back");
		}
		else {
			if(campground.author.id.equals(req.user._id))
			next();
			else{
				req.flash("error","You don't have permission");
				res.redirect("back");
				
			} 
		}
		})
	}
	else{
		res.redirect("back");
	}
}

middlewareObj.checkCommentOwnership=function(req,res,next){
	//check if user is logged in
	if(req.isAuthenticated()){
		//if the user owns the campground by checking the id of the author of the foundCampground
		// to the id of the current logged in user
		//note campground.author.id is a mongoose object 
		//req.user._id is a string hence we need to parse
		//use object.equals(string);
		
		Comment.findById(req.params.comment_id,function(err,comment){
		if(err) res.redirect("back");
		else {
			//does the user own the comment
			if(comment.author.id.equals(req.user._id))
			next();
			else{
				req.flash("error","You don't have permission");
				res.redirect("back");
			}
		}
		})
	}
	else{
		req.flash("error","You need to be logged in!");
		res.redirect("back");
	}
}

middlewareObj.isLoggedIn=function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error","You need to be logged in to do that");
	res.redirect("/login");
}

module.exports=middlewareObj;