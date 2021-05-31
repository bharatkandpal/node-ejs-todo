
const express = require("express")
const mongoose = require("mongoose")
const date = require(__dirname + "/date.js")
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))
app.set("view engine", "ejs")

mongoose.connect("mongodb://localhost:27017/todoDB", { useNewUrlParser: true })

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: String
})

const Item = mongoose.model("Item", itemSchema)

// const itemList = ["work","study","sleep"].map(item=> new Item({name:item,type:"new"}))

// Item.insertMany(itemList)
// .then(()=>console.log("whoa..!! great work"))
// .catch(e=>console.log(e.message))
// Item.findByIdAndDelete("60b5214f5dd6942af49332c4")
// .then(()=>console.log("deleted"))
// .catch(e=>console.log(e.message))

app.get("/", (req, res) => {
    let day = date.getDay()
    Item.find()
    // .then(items=>items.map(i=>i.name))
    .then(itemNames=>itemNames.length>0 && res.render("list", { listTitle: day, items: itemNames }))
    
})



app.get("/:customRoute", (req, res) => {
    Item.find({type:req.params.customRoute})
    .then((data)=>res.render("list", { listTitle: req.params.customRoute, items: data }))
})

app.post("/delete",(req,res)=>{
    Item.findByIdAndDelete(req.body.chkItem)
    .then(()=>res.redirect("/"+req.body.listName))
    .catch(e=>console.log(e.message))
    
})

app.post("/:customRoute", (req, res) => {
    console.log(req.body)
    let item = new Item({
        name: req.body.item,
        type: req.params.customRoute
    })
    item.save()
    .then(()=>res.redirect("/"+req.params.customRoute))
    .catch(e=>console.log(e))
})
app.get("/:customRoute", (req, res) => {
    Item.find({type:req.params.customRoute})
    .then((data)=>res.render("list", { listTitle: req.params.customRoute, items: data }))
})

app.get("/test", (req, res) => {
    res.render("test")
})

app.post("/", (req, res) => {
    let item = new Item({
        name: req.body.item,
        type: "home"
    })
    item.save()
    .then(()=>res.redirect("/"))
    .catch(e=>console.log(e))
    
})

app.listen("3000", () => {
    console.log("Server is up on port 3000!!")
})