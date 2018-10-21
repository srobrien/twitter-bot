var Twit = require('twit');

var config = {
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
};

var retweet = function() {
  var params = {
    q: '#100DaysOfCode, #100daysofcode, #100DaysofCode',
    result_type: 'recent',
    lang: 'en'
  };

  Twitter.get('search/tweets', params, function(err, data) {
    if (!err) {
      var retweetId = data.statuses[0].id_str;

      Twitter.post(
        'statuses/retweet/:id',
        {
          id: retweetId
        },
        function(err, response) {
          if (response) {
            console.log('Retweeted!!!');
          }

          if (err) {
            console.log(
              'Something went wrong while RETWEETING... Duplication maybe...'
            );
          }
        }
      );
    } else {
      console.log('Something went wrong while SEARCHING...');
    }
  });
};
