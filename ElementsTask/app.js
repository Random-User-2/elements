var express = require('express');
var Twitter = require('twitter');
var mongoose = require('mongoose');
var util = require('util');
var stringSearcher = require('string-search');
var cors = require('cors');
var bodyparser = require('body-parser');


var go = false;
var app = express();
app.use(cors());
app.use(bodyparser.json());

app.listen(3000);
//app.set('view engine', 'ejs');



var Slack = require('slack-node');
var apiToken = 'xoxp-277313589587-277313589699-278466506871-cd8b0210a89aadd568ee7bc80c151b13';

var slack = new Slack(apiToken);

slack.api("channels.history", {channel: 'C84MXCEN4'}, function(err, response) {
  var slackText;

  response.messages.forEach(function(singleText){
    slackText = singleText.text.toLowerCase();

    if (go == false)
     {
       if(slackText.indexOf(" go ") > 0 || slackText.indexOf("go ") == 0 || (slackText.indexOf("go") == 0 && slackText.indexOf("go")+2 == slackText.length)
          || (slackText.indexOf("go.") == 0 && slackText.indexOf("go.")+3 == slackText.length)
          || (slackText.indexOf(" go") > 0 && slackText.indexOf(" go")+3 == slackText.length) || slackText.indexOf(" go.") > 0)
          {
           console.log(slackText);
            go = true;
         }
     }

  });

});




mongoose.connect('mongodb://sherif:test@ds121336.mlab.com:21336/elements');

var elementSchema = new mongoose.Schema({

  tId: {
    type: String,
    unique: true
  },
  tText: String

});

var Elemets = mongoose.model('Elemets', elementSchema);

var tweetID, tweetText;

var client = new Twitter({
  consumer_key: 'tKxI4cAnlbfGDPICTlRNdIcij',
  consumer_secret: 'dNeY8yHlugwpnmRbvWFObCOGaUCdsretvxNbAYru6U26ryLP6S',
  access_token_key: '312890830-UV3XdjLPcp2lOq91DGVXQGtN8g6Hx4CZmYfdUufU',
  access_token_secret: 'RAEZZfUrrugWqb6LX4vJIdVBvQ0P3uZTRyXKp1iJoZ2He'
});


// Number of tweets 

client.get('statuses/mentions_timeline', {count: 12}, function(error, tweets, response) {
  if(error) throw error;
  //console.log(tweets);

  if (go)
  {
    tweets.forEach(function(singleTweet){

    tweetID = singleTweet.id;
    tweetText = singleTweet.text;

    Elemets({tId:tweetID, tText:tweetText}).save(function(err){
      if (err)
        {
          console.log("This Tweet is already in the Database");
        }
        else
        {
          console.log("Tweet saved successfully");
        }
    });

    //console.log("Tweet ID: " +  tweetID + "\nTweet Text: " + tweetText);

  });
  //setTimeout(function(){mongoose.disconnect();}, 10000)
  }

});


app.get('/theTweets', function(req, res){
  Elemets.find({}, function(err, data){
    if (err) throw err;
    res.json(data);
  });
});



/* q:'s‌​ince:2012-05-16'

app.get('/', function(req, res){
  Elemets.find({}, function(err, data){
    if (err) throw err;
    res.render('index', {eTweets: data});
  });
});


*/
