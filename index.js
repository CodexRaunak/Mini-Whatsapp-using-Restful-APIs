const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require('method-override');
const mongoose = require("mongoose");
const Chat = require("./models/chat.js");
app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
main()
.then(()=>{
    console.log("connection succesful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}



//Index Route
app.get("/chats",async (req,res)=>{
    let chats = await Chat.find();
    res.render("index.ejs",{ chats });
});
//New Route
app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");
});

//Create Route
app.post("/chats",(req,res)=>{
    let {from,to,message} = req.body;
    let newChat = new Chat({
        from:from,
        to:to,
        message:message,
        created_at: new Date() 
    });
    newChat.save().then(()=>{
        res.redirect("/chats");
    })
    .catch((err) => {
        console.log(err);
    });

    
});

app.get("/chats/:id/edit",async (req,res)=>{
    let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs",{chat});
});


app.put("/chats/:id",async(req,res)=>{
    let {id} = req.params;
    let {message : newMessage} = req.body;
    await Chat.findByIdAndUpdate(id,{message : newMessage,updated_at:new Date()},{runValidators:true,new:true});
    res.redirect("/chats");

});

app.delete("/chats/:id",async(req,res)=>{
    let {id} = req.params;
    await Chat.findByIdAndDelete(id);
    res.redirect("/chats");
});

app.listen(8080,()=>{
    console.log("listening on 8080");
});


