var mongooose=require("mongoose");
var Campground=require("./models/campground");
const Comment=require("./models/comment")

const data=[{
 	name:"Granite Hill ",image:"https://images.pexels.com/photos/712067/pexels-photo-712067.jpeg?auto=compress&cs=tinysrgb&h=350",
 	description:"This is a huge granite hill. No Bathrooms. NO water. Just granite!Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eget diam hendrerit, cursus eros et, placerat metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Quisque eleifend, mi eget imperdiet consequat, enim erat varius diam, eu auctor dolor augue sit amet dolor. Praesent lacinia cursus erat vestibulum condimentum. Nunc quam felis, eleifend sodales orci vitae, bibendum auctor tellus. Nullam et nibh nibh. Praesent bibendum mauris ut porttitor dictum. Fusce ultrices felis id purus scelerisque posuere. Quisque eu dolor mi. Quisque dictum libero augue, in lacinia ligula lacinia vel. Morbi a pellentesque magna, eu ultrices arcu."
 },{
 	name:"Granite Hill ",image:"https://images.pexels.com/photos/712067/pexels-photo-712067.jpeg?auto=compress&cs=tinysrgb&h=350",
 	description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eget diam hendrerit, cursus eros et, placerat metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Quisque eleifend, mi eget imperdiet consequat, enim erat varius diam, eu auctor dolor augue sit amet dolor. Praesent lacinia cursus erat vestibulum condimentum. Nunc quam felis, eleifend sodales orci vitae, bibendum auctor tellus. Nullam et nibh nibh. Praesent bibendum mauris ut porttitor dictum. Fusce ultrices felis id purus scelerisque posuere. Quisque eu dolor mi. Quisque dictum libero augue, in lacinia ligula lacinia vel. Morbi a pellentesque magna, eu ultrices arcu.!"
 },
		   {
 	name:"Granite Hill ",image:"https://images.pexels.com/photos/712067/pexels-photo-712067.jpeg?auto=compress&cs=tinysrgb&h=350",
 	description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eget diam hendrerit, cursus eros et, placerat metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Quisque eleifend, mi eget imperdiet consequat, enim erat varius diam, eu auctor dolor augue sit amet dolor. Praesent lacinia cursus erat vestibulum condimentum. Nunc quam felis, eleifend sodales orci vitae, bibendum auctor tellus. Nullam et nibh nibh. Praesent bibendum mauris ut porttitor dictum. Fusce ultrices felis id purus scelerisque posuere. Quisque eu dolor mi. Quisque dictum libero augue, in lacinia ligula lacinia vel. Morbi a pellentesque magna, eu ultrices arcu."
 }]
function seedDB(){
	Campground.remove({},function(err){
	// if(err) console.log(err);
	// else console.log("remove campgrounds");
	// 	data.forEach(function(seed){
	// 	Campground.create(seed,function(err,campground){
	// 		if(err) console.log(err);
	// 		else console.log("added a campground");
	// 		//add comments
			
	// 		Comment.create({
	// 			text: "iosafbbfabfabiaiasfinfasoifsannifia",
	// 			author: "Homer"
	// 		},function(err,comment){
	// 			if(err) console.log(err);
	// 			else{
	// 				campground.comments.push(comment);
	// 				campground.save();
	// 				console.log("created a comment");
	// 			}
				
	// 		})
	// 	})
	// })
});
	
}

module.exports=seedDB;