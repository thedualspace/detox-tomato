function addHashtag(tweet) {
  if (!/#Tomato/i.test(tweet)) {
    if (tweet.length >= 132) {
      tweet = tweet.substr(0, 132);
    }
    tweet += " #Tomato";
  }
  return tweet;
}

export function processTweet(tweet) {
  return addHashtag(tweet);
}