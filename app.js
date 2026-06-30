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
app.get("/edit/:id", (req, res) => {
    const id = Number(req.params.id);

    const post = posts.find(post => post.id === id);
console.log(req.params.id);
console.log(posts);
console.log("Found post:", post);

    res.render("edit", {
        post: post
    });
});
app.post("/edit/:id",(req,res)=>{
    const id =Number(req.params.id);
    const post=posts.find(post=>post.id===id);
    if(!post){
        return res.status(404).send("Post not found")
    }

    post.title = req.body.title;
    post.content = req.body.content;

    res.redirect("/");
}
);
app.post("/delete/:id",(req,res)=>{
    const id =Number(req.params.id);
        posts = posts.filter(post => post.id !== id);

    res.redirect("/");

})
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});