//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const app = express();
app.use('/public', express.static(__dirname + "/public"))
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');


const homeStartingContent = `
  JavaScript: The Most Popular Programming Language of the Web

  JavaScript, often abbreviated as JS, is a high-level programming language that is widely used for web development. As the backbone of dynamic web pages, JavaScript allows developers to create interactive and engaging user experiences.

  Key Features of JavaScript:
  - Lightweight and versatile: JavaScript is lightweight and versatile, making it suitable for a wide range of applications.
  - Client-side scripting: JavaScript runs on the client-side, enabling dynamic content manipulation and interaction within web browsers.
  - Object-oriented: JavaScript supports object-oriented programming paradigms, allowing developers to create reusable and modular code.
  - Event-driven programming: JavaScript uses event-driven programming, where actions or events trigger specific functions or behaviors.
  - Rich ecosystem: JavaScript has a rich ecosystem of libraries, frameworks, and tools, such as React, Angular, and Vue.js, which streamline development and enhance productivity.

  JavaScript is the foundation of modern web development, powering everything from simple interactive forms to complex single-page applications (SPAs). With its widespread adoption and continuous evolution, JavaScript remains the most popular programming language of the web.
`;

const aboutContent = `
  About Our Company

  Our company is dedicated to providing innovative solutions in the field of technology. With a team of passionate individuals, we strive to deliver high-quality products and services that meet the needs of our clients.

  Key Highlights:
  - Expertise: Our team consists of skilled professionals with expertise in various domains, including web development, mobile app development, artificial intelligence, and more.
  - Collaboration: We believe in the power of collaboration and teamwork. By working closely with our clients, we ensure that their requirements are met and their expectations are exceeded.
  - Innovation: Innovation is at the heart of everything we do. We continuously explore new technologies and approaches to stay ahead of the curve and deliver cutting-edge solutions.
  - Customer Satisfaction: Customer satisfaction is our top priority. We go above and beyond to ensure that our clients are happy with the results and receive the support they need.

  At our company, we are committed to excellence, integrity, and customer success. Partner with us and experience the difference!
`;

const contactContent = `
  Contact Us

  Have a question or inquiry? Feel free to reach out to us! Our team is here to assist you and address any concerns you may have.

  Whether you're interested in our services, have feedback to share, or simply want to say hello, we'd love to hear from you. Get in touch with us today!
`;


let posts = [];

app.listen(4000, function() {
  console.log("Server started on port 3000");
});


app.get("/", function(req, res ){
  res.render('home', {startingContent: homeStartingContent, posts: posts});
});

app.get("/about", function(req, res) {
  res.render('about', {aboutContent: aboutContent});
});

app.get("/contact", function(req, res) {
  res.render('contact', {contactContent: contactContent});
});

app.get("/compose", function(req, res) {
  res.render('compose');
});

app.post("/compose", function(req, res) {
  const newCont = {
    title: req.body.postTitle,
    body: req.body.postBody
  }

  posts.push(newCont);

  res.redirect("/");
});


app.get("/posts/:postName", function(req, res) {
  let requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach( function(obj) {
    if (_.lowerCase(obj.title) === requestedTitle ) {
      res.render("post", {title: obj.title, content: obj.body})
    } else {
      console.log("Not Found");
    }
  });
})