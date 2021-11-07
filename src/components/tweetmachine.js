import React, { useState, useEffect } from "react";

//Logic
import { processTweet } from "../scripts/marketingLogic";

//styles
import "../styles/components/tweetMachine/tweetMachine.scss";

export const TweetMachine = () => {
    const [inputTweet, setInputTweet] = useState("");
    const [promisesArray, setPromisesArray] = useState([new Promise((res) => res(""))]);

    useEffect(() => {
        //This function is "doing more" than just processing the tweet
        const doMore = async () => {
            //Random sleep tim between 500ms and 2500ms
            const interval = Math.random() * (2500 - 500) + 500;

            //This is an async timeout that resolves to the value of string after a delay of ms;
            const sleep = (ms, string) => new Promise((res) => setTimeout(res, ms, string));

            setPromisesArray([...promisesArray, sleep(interval, inputTweet)]);
        };
        doMore();
    }, [inputTweet]);

    useEffect(() => {
        //grab the latest promise that has resolved
        const outputText = async () => {
            const fullyResolvedArray = await Promise.all(promisesArray);
            const latestInput = fullyResolvedArray.slice(-1)[0];

            const output = document.getElementById("output");
            output.value = inputTweet ? processTweet(latestInput) : "";
        };
        outputText();
    }, [promisesArray]);

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
