const express=require("express"),
	  router=express.Router(),
	  Campground=require("../models/campground");
	const middleware=require("../middleware");
//root 
router.get("/",function(req,res){
	Campground.find({},function(err,allcampgrounds){
		if(err){
			console.log(err);
		}else{
			res.render("campgrounds/index",{campgrounds:allcampgrounds});
		}
	});
	});

//CREATE : add new campground to  DB
router.post("/",middleware.isLoggedIn,function(req,res){
	// res.send("you hit the post route")
	var name=req.body.name;
	var price=req.body.price;
	var image=req.body.image;
	const des=req.body.description;
	const author={
		id: req.user._id,
		username: req.user.username
	}
	var newcampground={name:name,price:price,image:image,description:des,author:author};
	// console.log(req.user);
	//create new campground and save to database
	Campground.create(newcampground,function(err,campground){
		if(err){
			console.log(err);
		}
		else{
			console.log(campground);
			res.redirect("/campgrounds");
		}
	});
	});
//RENDER THE NEWLY CREATED CAMPGROUNDS
router.get("/new",middleware.isLoggedIn,function(req,res){
	res.render("campgrounds/new");
	});
//SHOW: shows more info about a particular campground
router.get("/:id",function(req,res){
	Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
		if(err){
			console.log(err);
		}else{
			console.log(foundCampground);
			res.render("campgrounds/show",{campground:foundCampground});
		}
	})
	});

//EDIT CAMPGROUND ROUTE
router.get("/:id/edit",middleware.checkCampgroundOwnership,function(req,res){
	
		
		Campground.findById(req.params.id,function(err,campground){
		
			res.render("campgrounds/edit",{campground:campground});
		});
	
	
});
//UPDATE CAMPGROUND ROUTE
router.put("/:id",middleware.checkCampgroundOwnership,function(req,res){
	Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
		if(err) res.redirect("/campgrounds");
		else res.redirect("/campgrounds/"+req.params.id);
	})
})
//DESTROY CAMPGROUND

router.delete("/:id",middleware.checkCampgroundOwnership,function(req,res){
	Campground.findByIdAndRemove(req.params.id,function(err){
		 res.redirect("/campgrounds");
	})
});



//middleware
// function isLoggedIn(req,res,next){
// 	if(req.isAuthenticated()){
// 		return next();
// 	}
// 	res.redirect("/login");
// }


module.exports=router;