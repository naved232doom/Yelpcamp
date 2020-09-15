const express=require("express"),
	  router=express.Router(),
	  passport=require("passport"),
	  User=require("../models/user");


router.get("/",function(req,res){
	res.render("landing");
});

//DISPLAY ALL CAMPGROUNDS ON INDEX




//==================
//AUTH ROUTES
//==================

//show register form
router.get("/register",function(req,res){
	res.render("register");
});
//handle register form logic
router.post("/register",function(req,res){
	const newUser=new User({username:req.body.username});
	User.register(newUser,req.body.password,function(err,user){
		if(err){
			req.flash("error",err.message);
			return res.render("register");
		}
		passport.authenticate("local")(req,res,function(){
			req.flash("success","Welcome to yelpcamp "+user.username);
			res.redirect("/campgrounds");
		});
	});
});

//show login form
router.get("/login",function(req,res){
	res.render("login");
})
//handling login logic

router.post("/login",passport.authenticate("local",{
	successRedirect:"/campgrounds",
	failureRedirect:"/login"
}),function(req,res){
	});

//Logic for logout

router.get("/logout",function(req,res){
	req.logout();
	req.flash("success","logged you out");
	res.redirect("/campgrounds");
});
//middleware
// function isLoggedIn(req,res,next){
// 	if(req.isAuthenticated()){
// 		return next();
// 	}
// 	res.redirect("/login");
// }

module.exports=router;