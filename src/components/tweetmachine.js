import React, {useState, useEffect, useMemo} from "react";
import autosize from "autosize";
import debounce from 'lodash.debounce';

//Logic
import { processTweet } from "../scripts/marketingLogic";

//styles
import "../styles/components/tweetMachine/tweetMachine.scss";

export const TweetMachine = () => {
    const [outputTweet, setOutputTweet] = useState("")
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        autosize(document.querySelectorAll("textarea"));
    }, [outputTweet])

    const randomTimeout = () => {
        const interval = Math.random() * (2200 - 200) + 200;
        return new Promise(resolve => setTimeout(resolve, interval));
    }

    const changeHandler = async (event) => {
        setOutputTweet("")
        setLoading(true)
        const tweet = await processTweet(event.target.value)
        await randomTimeout()
        setOutputTweet(tweet)
        setLoading(false)
        autosize.update(document.getElementById("output"));
    };

    const debouncedChangeHandler = useMemo(() => {
        return debounce(changeHandler, 300);
    }, []);

    return (
        <div className="tweet-machine">
            <div className="input tweet-container">
                <div className="title">
                    <h3>Text To Tweetify:</h3>
                </div>
                <textarea
                    id="input"
                    placeholder="Enter a tweet to improve..."
                    onChange={debouncedChangeHandler}
                />
            </div>
            <div className="output tweet-container">
                <div className="title">
                    <h3>Tweetified Text:</h3>
                </div>
                {loading ?
                    <textarea className="loading" readOnly placeholder="Tweet generating..." id="output" />
                    :
                    <textarea readOnly placeholder="Improved tweets shown here..." value={outputTweet} id="output" />
                }
            </div>
        </div>
    );
};
