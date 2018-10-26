const twit = require('twit');

const config = {
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
};
const Twitter = new twit(config);

const getIds = async () => {
  const params = {
    q: '#javascript, #webdeveloper, #webdev, #100DaysOfCode',
    result_type: 'recent',
    lang: 'en'
  };
  try {
    const { data } = await Twitter.get('search/tweets', params);
    const ids = data.statuses.map(tweet => {
      reTweet(tweet.id_str);
    });
  } catch (e) {
    console.log(`Error encountereed: ${e.allErrors[0].message}`);
  }
};

const reTweet = async id => {
  await Twitter.post('statuses/retweet/:id', { id })
    .then(ok => console.log(`Success. retweeted!`))
    .catch(e => console.log(`Error encountered: ${e}`));
};

getIds();
