import React, { useState, useEffect } from "react";

//Logic
import { processTweet } from "../scripts/marketingLogic";

//styles
import "../styles/components/tweetMachine/tweetMachine.scss";

export const TweetMachine = () => {
    const [inputTweet, setInputTweet] = useState("");
    const [running, setRunning] = useState(false);

    const handler = (tweet) => {
        if (running) return;

        const output = document.getElementById("output");

        setRunning(true);
        const interval = Math.random() * (2500 - 500) + 500;
        setTimeout(() => {
            if (tweet !== inputTweet) {
                handler(inputTweet);
            } else {
                output.value = processTweet(inputTweet);
                console.log("Delay: " + interval);
                setRunning(false);
            }
        }, interval);
    };

    //We make sure to add both inputTweet and handler
    useEffect(() => {
        // const input = document.getElementById("input");
        const output = document.getElementById("output");

        //If the input box is populated, add the hashtag
        if (inputTweet) {
            handler(inputTweet);
        } else {
            output.value = "";
        }
    }, [inputTweet, handler]);

    return (
        <div className="tweet-machine">
            <div className="input tweet-container">
                Text to tweetify:
                <textarea
                    id="input"
                    value={inputTweet}
                    onChange={(e) => setInputTweet(e.target.value)}
                ></textarea>
            </div>
            <div className="output tweet-container">
                Tweetified text:
                <textarea readOnly id="output"></textarea>
            </div>
        </div>
    );
};
