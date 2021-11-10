import { translate, detect } from "./translate";

const MAX_TWEET_CHARS = 280;

//Test returns the correct language
//test that translations are accumulated.
//Should return spaceless string
export const determineHashtag = async (language) => {
    const tomato = await translate("tomato", language);
    const Tomato = tomato.charAt(0).toUpperCase() + tomato.slice(1);
    const hashtag = `#${Tomato}`;
    return hashtag;
};

export const processTweet = async (tweet) => {
    const language = await detect(tweet);
    if (!tweet) return "";
    if (language === "und") return "Couldn't determine your language, type some more!";

    const hashtag = await determineHashtag(language);
    const regex = new RegExp(hashtag, "i");

    //If tweet contains (language specific) hashtag, only truncate.
    //If not, truncate to appropriate length and add hashtag
    if (!regex.test(tweet)) {
        //+1 for the space between text and hashtag
        const maxAllowedChars = MAX_TWEET_CHARS - (hashtag.length + 1);
        if (tweet.length > maxAllowedChars) {
            tweet = tweet.substr(0, maxAllowedChars);
        }
        tweet += ` ${hashtag}`;
    } else if (tweet.length > MAX_TWEET_CHARS) {
        tweet = tweet.substr(0, MAX_TWEET_CHARS);
    }
    return tweet;
};

//These remain only for demonstrating step 6,
//which was used before implementing google translate.
const validHashtags = [/#Tomato/i, /#Tomate/i, /#Pomodoro/i, /#Tomaat/i, /#Pomidor/i];
const containsHashtag = (string, exprArray) => exprArray.some((rx) => rx.test(string));

//Do not add #Tomato if the tweet contains any of the valid hashtags
export const _addHashtag = (tweet) => {
    if (!containsHashtag(tweet, validHashtags)) {
        if (tweet.length >= 272) {
            tweet = tweet.substr(0, 272);
        }
        tweet += " #Tomato";
    }

    if (tweet.length >= 281) {
        tweet = tweet.substr(0, 280);
    }
    return tweet;
};
