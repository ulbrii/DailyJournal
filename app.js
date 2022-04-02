/* Requiring necessary apps */

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
const posts = [];

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

/* Render home page and ejs consts */
app.get("/", function (req, res) {
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts
  });
});

/* Render about page and present ejs consts */
app.get("/about", function (req, res) {
  res.render("about", {aboutContent: aboutContent});
});

/* Render contact page as well as present ejs consts */
app.get("/contact", function (req, res) {
  res.render("contact", {contactContent: contactContent});
});

/* Search for an existing blog post title through website pathway */
app.get("/posts/:postName", function(req, res) {

/* Defining requestedTitle and insuring recognition regardless of lowercase or uppercase */
  const requestedTitle = _.lowerCase(req.params.postName);

  /* Creating a for loop with Express syntax */
  posts.forEach(function(post) {

    /* Defining storedTitle and insuring recognition regardless of lowercase or uppercase */
    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedTitle) {
      
      const pageTitle = post.title;
      const pageContent = post.content;
      
      res.render("post", {
        pageTitle: pageTitle,
        pageContent: pageContent})
    }
  })
});

/* Rendering hidden compositional page */
app.get("/compose", function (req, res) {
  res.render("compose");
});

/* Allow server to track entries on compositional page and push into posts[] array */
app.post("/compose", function (req, res) {

  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };

  posts.push(post);

  res.redirect("/");

});







app.listen(3000, function() {
  console.log("Server started on port 3000");
});
