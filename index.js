const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser());
app.post('/tardigradefacts', handleCall);
app.get('/tardigradefacts', handleCall);

const port = process.env.PORT || 3434;
app.listen(port, () => {
  console.log('listening on port ' + port);
});

function handleCall(req,res){
  const slackToken = process.env.SLACK_TOKEN;
  const channel = req.body.channel_id;

  if (!slackToken) {
    return res.status(400).send('tardigrade-facts has not been properly configured');
  }

// replace logic here.

  getFact(function(err, factData , slackToken){
    if (err){
      return res.status(400).send('There was a problem. The Tardigrades are on it.');
    }
    res.status(200).send('Tardigrade Fact' + factData);
  })

  function getFact(cb){
    var facts = [
      "Tardigrades can survive being frozen for over 32 years",
      "Tardigrades can survive in space",
      "Tardigrades can survive 570,000 Rontgens. Humans can only survive 500."
    ]

    var factData = facts[Math.floor(Math.random()*facts.length)];

  } //getFact


  // function postToSlack(message, info, cb){
  //   request.post('https://slack.com/api/chat.postMessage', {
  //     form: {
  //       token: info.slackToken,
  //       channel: info.channel,
  //       text: message,
  //       username: 'Mr. Tardigrade',
  //       icon_url: 'https://i0.wp.com/www.heardisland.org/HD_images/HD_logos/donors/3664_150a%20256.jpg'
  //     }
  //   }, cb);
  //   // Use: postAsUser(user, message, { token, channel }, () => res.status(200).send('haha ur so funny'));
  // } //postToSlack
}
