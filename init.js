const mongoose = require("mongoose");
const Chat = require("./models/chat.js");
main()
.then(()=>{
    console.log("connection succesful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}


Chat.insertMany([
    {
        from : "akshay",
        to: "suman",
        message: "I have a doubt in JS , can you help?",
        created_at: new Date()
    },
    {
        from : "rohit",
        to: "mohit",
        message: "Plz teach me JS callbacks",
        created_at: new Date()
    },
    {
        from : "amit",
        to: "sumit",
        message: "All the best!",
        created_at: new Date()
    },
    {
        from : "anita",
        to: "ramesh",
        message: "Hi, are you fine?",
        created_at: new Date()
    },
    {
        from : "tony",
        to: "peter",
        message: "Love you 3000",
        created_at: new Date()
    },
]);
