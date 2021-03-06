//=============
// COMMENTS ROUTES
//=============
const express=require("express"),
	  router=express.Router({mergeParams:true}),
	  Campground=require("../models/campground"),
	  Comment=require("../models/comment");
const middleware=require("../middleware");

//show comment form
router.get("/new",middleware.isLoggedIn,function(req,res){
	Campground.findById(req.params.id,function(err,campground){
		if(err) console.log(err);
		else res.render("comments/new",{campground:campground});
	})
	
})
//handle new comment logic
router.post("/",middleware.isLoggedIn,function(req,res){
	//lookup campground using id
	Campground.findById(req.params.id,function(err,campground){
		if(err) {console.log(err);
				res.redirect("/campgrounds");
				}
		else{
			Comment.create(req.body.comment,function(err,comment){
				if(err) {
					req.flash("error","Something went wrong");
					console.log(err);
				}
				else{
					console.log(req.user.username);
					//add username & id to comment
					comment.author.id=req.user._id;
					comment.author.username=req.user.username;
					//save comment
					comment.save();
					campground.comments.push(comment);
					campground.save();
					req.flash("success","Successfully added comment");
					res.redirect("/campgrounds/"+campground._id);
				}
			})
		}
	});
	//create new comments
	//connect new comment to campground
	//redirect campground to show page
	});
//COMMENT EDIT ROUTE
router.get("/:comment_id/edit",middleware.checkCommentOwnership,function(req,res){
	Comment.findById(req.params.comment_id,function(err,foundComment){
		if(err) res.redirect("back");
		else res.render("comments/edit",{campground_id:req.params.id ,comment:foundComment});
	});
	
})
//COMMENT PUT REQUEST
router.put("/:comment_id",middleware.checkCommentOwnership,function(req,res){
	Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedComment){
		if(err) res.redirect("back");
		else{
			res.redirect("/campgrounds/"+req.params.id);
		}
	})
})
//DELETE COMMENT

router.delete("/:comment_id",function(req,res){
	Comment.findByIdAndRemove(req.params.comment_id,function(err){
		if(err) res.redirect("back");
		else {
			req.flash("success","Comment deleted");
			res.redirect("/campgrounds/"+req.params.id);
		}
	})
			  });
//middleware



module.exports=router;