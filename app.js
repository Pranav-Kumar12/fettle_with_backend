const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const { urlencoded } = require("body-parser");

mongoose.connect("mongodb://localhost:27017/userdb", {useNewUrlParser: true});
var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

var username="Anony";
var flag=0;
var bid_coins;
var name_per;
var bid_time;
var support_details=[];
var support_size;
const bid_schema = new mongoose.Schema({
    bid_applied:{
        type: Number,
        required: true 
    },
    time_slot:{
        type: String,
        required: true
    },
    sport:{
        type: String,
        required: true
    },
    date:{
        type: String,
        required: true
    },
    time:{
        type:String,
        required:true
    }
});

const bids = mongoose.model('bid_person', bid_schema);
const support_schema = new mongoose.Schema({
    drive_link:{
        type: String,
        required: true 
    },
    date:{
        type: String,
        required: true
    },
    time:{
        type:String,
        required:true
    }
});

const support = mongoose.model('support_person', support_schema);

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    name_of_person: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    bid_points_left:{
        type: Number,
        required: true,
        default: 1000
    },
    bid_times:{
        type:Number,
        default:0
    },
    support:[support_schema],
    bids: [bid_schema]

  });


const user = mongoose.model('user_ID', userSchema);


app.get("/", function(req,res){
    res.sendFile(__dirname + "\\index.html");
});

app.get("/register", function(req,res){
    res.sendFile(__dirname + "\\public\\html\\register.html");
});

app.get("/login", function(req,res){
    if(flag===1){
        res.render("home",{name:name_per});
    }
    else{
        res.sendFile(__dirname + "\\public\\html\\login.html");
    }
    }
    
);

app.get("/bid_page",function(req,res){
    res.render("bid-con",{bid_number:bid_time});
});

var date = new Date(); 
var current_date = date.getDate() + "/"+ (date.getMonth()+1)  + "/" + date.getFullYear();
var dayName = days[date.getDay()]; 
date.setDate(date.getDate() + 1);   
var nextdayname=days[date.getDay()];
var next_date = date.getDate() + "/"+ (date.getMonth()+1)  + "/" + date.getFullYear();

app.get("/cricket_bid",function(req,res){
    res.render("bidding",{sport:"CRICKET BIDDING",today_date:current_date,today_day:dayName,next_date:next_date,next_day:nextdayname});
});

app.get("/tennis_bid",function(req,res){
    res.render("bidding",{sport:"TENNIS BIDDING",today_date:current_date,today_day:dayName,next_date:next_date,next_day:nextdayname});
});

app.get("/football_bid",function(req,res){
    res.render("bidding",{sport:"FOOTBALL BIDDING",today_date:current_date,today_day:dayName,next_date:next_date,next_day:nextdayname});
});

app.get("/profile",function(req,res){
    res.render("account",{name:name_per,bid_points:bid_coins,complaint:support_size});
});

app.get("/support",function(req,res){
    res.sendFile(__dirname + "\\public\\html\\support.html");
});

app.get("/account-info",function(req,res){
    res.sendFile(__dirname+"\\public\\html\\account-info.html")
});

app.get("/account-pts",function(req,res){
    res.render("account-pts",{bid_points:bid_coins})
});

app.post("/support",function(req,res){
    user.findOne({username: username}, function(err, doc){
        if(err){
            console.log(err);
        }
        else{
            support_details = doc.support;
            var date = new Date(); 
            var current_date = date.getDate() + "/"+ (date.getMonth()+1)  + "/" + date.getFullYear();
            var current_time = date.getHours() + ":"  + date.getMinutes();
            var newsupport = new support({
                drive_link: req.body.support_drive,
                issuer: username,
                date: current_date,
                time: current_time
            });
            support_details.push(newsupport);
            support_size++;
            console.log(newsupport);
            user.updateOne({username: username}, {support: support_details}, function(err, doc){
                if(err){
                    console.log(err);
                }
            });
            res.render("home",{name:name_per});
        }
    });
});

app.post("/profile",function(req,res){
    flag=0;
    res.sendFile(__dirname + "\\index.html");
});

app.post("/cricket_bid",function(req,res){
    // user.findOne({username:username},function(err, doc){

    // })
    console.log(req.body);
    bid_time++;
    var dec_bid_points=req.body.bid_amount;
    bid_coins-=dec_bid_points;
    user.updateOne({username: username},{bid_times:bid_time,bid_points_left:bid_coins}, function(err, doc){
        if(err){
            console.log(err);
        }  
    });
    res.render("bid-con",{bid_number:bid_time});
});

app.post("/register", function(req, res){
    const newUser = new user({
        username: req.body.username,
        password: req.body.password,
        name_of_person:req.body.name_of_person,
    });

    newUser.save(function(err){
        if(err){
            console.log(err);
        }else{
            
            username = req.body.username;
            res.sendFile(__dirname + "\\public\\html\\login.html");
        }
    });
});

app.post("/login", function(req, res){
    const userName = req.body.username;
    const pass = req.body.password;
    user.findOne({username: userName}, function(err, founduser){
        if(err)
        {
            console.log(err);
        }
        else{
            if(founduser && founduser.password===pass)
            {
                flag=1;
                name_per=founduser.name_of_person;
                username=founduser.username;
                bid_coins=founduser.bid_points_left;
                bid_time=founduser.bid_times;
                support_details=founduser.support;
                support_size=founduser.support.length;
                res.render("home",{name:name_per});
            }
            else{
                res.sendFile(__dirname + "\\public\\html\\login.html");
            }
        }
    });
});



let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function(){
    console.log("Server is running!");
});
