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

  const facts = [
    "Tardigrades can survive being frozen for over 32 years",
    "Tardigrades can survive in space",
    "Tardigrades can survive 570,000 Rontgens. Humans can only survive 500.",
    "More than 1,150 species of Tardigrades have been identified so far since 1778.",
    "Tardigrades are usually 0.5 mm long but they can grow a little longer and reach up to 1 mm."
  ]

    var factData = facts[Math.floor(Math.random()*facts.length)];

    res.status(200).send('Tardigrade Fact' + factData);

}
