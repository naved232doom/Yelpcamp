var express=require("express");
var app=express();
var bodyparser=require("body-parser");
const mongoose =require("mongoose"),
	  flash=require("connect-flash"),
	  passport= require("passport"),
	  methodOverride=require("method-override"),
	  LocalStrategy=require("passport-local"),
 Campground=require("./models/campground"),
	  Comment=require("./models/comment"),
	  User=require("./models/user"),
 seedDB= require("./seeds");

const commentRoutes= require("./routes/comments"),
	  campgroundRoutes=require("./routes/campgrounds"),
	  indexRoutes=require("./routes/index");
//seed the database
// seedDB();
//
let url= process.env.DATABASEURL||"mongodb://localhost:27017/yelp_camp"
//'mongodb+srv://naved:Motobomb1!duck@cluster0.ybdkw.mongodb.net/<dbname>?retryWrites=true&w=majority'
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));

app.use(bodyparser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname +"/public"));
app.use(methodOverride("_method"));
app.use(flash());

app.use(require("express-session")({
	secret:"LDS chutiya club hai",
	resave:false,
	saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
		res.locals.currentUser=req.user;
		res.locals.error=req.flash("error");
		res.locals.success=req.flash("success");
	next();
		})
// Campground.create({
// 	name:"Granite Hill ",image:"https://images.pexels.com/photos/712067/pexels-photo-712067.jpeg?auto=compress&cs=tinysrgb&h=350",
// 	description:"This is a huge granite hill. No Bathrooms. NO water. Just granite!"
// },function(err,campground){
// 	if(err){
// 		console.log(err);
// 	}else{
// 		console.log("NEWLY CREATED CAMPGROUND:")
// 		console.log(campground);
// 	}
// })

app.use(indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);

app.listen(process.env.PORT||6978,process.env.IP,function(){
	console.log("Server up and running!");
});