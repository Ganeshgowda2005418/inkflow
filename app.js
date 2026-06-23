const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;
let posts = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");
app.get("/",(req,res)=>
{
    res.render("index",{
        posts:posts
    })

})
app.get("/create", (req, res) => {
    res.render("create");
});
app.post("/create",(req,res)=>{
 const post={
    id:Date.now(),
    title:req.body.title,
    content:req.body.content
 };
 posts.push(post);
 res.redirect("/");
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});