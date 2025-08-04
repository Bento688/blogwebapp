import bodyParser from "body-parser";
import express from "express";

const app = express();
const port = 3000;

//Tweets array memory
const tweets = [];

//Middlewares
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}));

//Initial site render
app.get("/", (req, res) => {
    res.render("index.ejs", {tweets: tweets});
});

//What happens when user presses the create button
app.post("/create", (req, res) => {
    const newTweet = req.body.tweet;
    tweets.unshift(newTweet);
    res.redirect("/");
});

//What happens when user wants to edit the posts (relative to post id)
app.get("/edit/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const tweetIndex = tweets.length - id;
    if (tweetIndex >= 0 && tweetIndex < tweets.length) {
        res.render("edit.ejs", {
            id : id,
            tweet : tweets[tweetIndex],
        });
    } else {
        res.status(404).send('Tweet not found!');
    }
});

//What happens when user finishes editing and press the "save" button in the edit.ejs page
app.post("/edit/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const tweetIndex = tweets.length - id;
    const updatedTweet = req.body.tweet;

    if (tweetIndex >= 0 && tweetIndex < tweets.length) {
        tweets[tweetIndex] = updatedTweet;
        res.redirect("/");
    } else {
        res.status(404).send('Tweet not found!');
    }
});

//What happens when user decides to delete a post (relative to post id)
app.post("/delete/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const tweetIndex = tweets.length - id;

    if (tweetIndex >= 0 && tweetIndex < tweets.length) {
        tweets.splice(tweetIndex, 1);
        res.redirect("/");
    } else {
        res.status(404).send('Tweet not found!');
    }
});

//App listen
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
