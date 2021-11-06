import React, { useState, useEffect } from "react";

//Logic
import { processTweet } from "../scripts/marketingLogic";

//styles
import "../styles/components/tweetMachine/tweetMachine.scss";

export const TweetMachine = () => {
    const [inputTweet, setInputTweet] = useState("");


    useEffect(() => {
        // const input = document.getElementById("input");
        const output = document.getElementById("output");

        if (inputTweet) {
            output.value = processTweet(inputTweet);
        } else {
            output.value = "";
        }
    }, [inputTweet]);

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
