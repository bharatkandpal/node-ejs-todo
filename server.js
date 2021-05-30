
const express = require("express")
const date=require(__dirname+"/date.js")
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))
app.set("view engine", "ejs")

let items = []
let workItems = []
app.get("/", (req, res) => {
    let day=date.getDay()
    res.render("list", { listTitle: day, items: items })
})

app.get("/work", (req, res) => {
    res.render("list", { listTitle: "Work List", items: workItems })
})

app.get("/test",(req,res)=>{
    res.render("test")
})

app.post("/work", (req, res) => {
    workItems.push(req.body.item)
    
    res.redirect("/work")
})

app.post("/", (req, res) => {
    var item = req.body.item;
    console.log(req.body);
    if (req.body.btnAdd === "Work") {
        workItems.push(item)
        res.redirect("/work")
    }
    else {
        items.push(item)
        res.redirect("/")
    }
})

app.listen("3000", () => {
    console.log("Server is up on port 3000!!")
})