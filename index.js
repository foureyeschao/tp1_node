const express = require('express');
const app = express();
const fs = require("fs");
const path = require('path');
const Twit = require('twit');
const { CONSUMER_KEY, CONSUMER_SECRET, ACCESS_TOKEN, ACCESS_TOKEN_SECRET } = require("./config/config");

const Twitter = new Twit({ consumer_key: CONSUMER_KEY, consumer_secret: CONSUMER_SECRET, access_token: ACCESS_TOKEN, access_token_secret: ACCESS_TOKEN_SECRET });


let params = {
    screen_name:'canada', 
    count: 200,
}


Twitter.get('statuses/user_timeline',params, function (err, data) {
    let newData = JSON.stringify(data);
    fs.writeFile(path.resolve(__dirname, "frontend", "static") + "/" + "tweet.json", newData, err => {
        if (err) throw err;
        console.log("success");
    })

})

Twitter.get('followers/ids', { screen_name: 'canada' },  function (err, data, response) {
    let newData = JSON.stringify(data);
    fs.writeFile(path.resolve(__dirname, "frontend", "static") + "/" + "test.json", newData, err => {
        if (err) throw err;
        console.log("success");
    })
  })

app.get('/Twitter', function (req, res) {
    fs.readFile(path.resolve(__dirname, "frontend", "static") + "/" + "tweet.json", 'utf8', function (err, data) {
        res.end(data);
    });
})

app.use('/static', express.static(path.resolve(__dirname, "frontend", "static")))

app.get('/*', (req, res) =>{
    res.sendFile(path.resolve(__dirname, 'frontend', 'index.html')
    )
})
let server = app.listen(8081, function () {
    let host = server.address().address
    let port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})