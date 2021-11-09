import React, { useState, useEffect } from "react";
import autosize from "autosize";

//Logic
import { processTweet } from "../scripts/marketingLogic";

//styles
import "../styles/components/tweetMachine/tweetMachine.scss";

export const TweetMachine = () => {
    const [inputTweet, setInputTweet] = useState("");
    const [promisesArray, setPromisesArray] = useState([new Promise((res) => res(""))]);
    
    //Identifying to autosize which elements to enlarge as its content grows
    autosize(document.querySelectorAll("textarea"));

    //Every time the input tweet is changed, add the change to an array of promises
    //which resolve to the input string once the delay time is over
    useEffect(() => {
        //This function is "doing more" than just processing the tweet
        const doMore = async () => {
            //Random sleep tim between 500ms and 2500ms
            const interval = Math.random() * (2500 - 500) + 500;

            //This is an async timeout that resolves to the value of string after a delay of ms;
            const sleep = (ms, string) => new Promise((res) => setTimeout(res, ms, string));

            //Prevent excessive memory use by only taking the latest few promises
            //Approx 30 characters per second when a key is pressed, by 2.5 sec, plus some margin
            const latestPromises = [...promisesArray, sleep(interval, inputTweet)].slice(-120);
            setPromisesArray(latestPromises);
        };
        doMore();
    }, [inputTweet]);

    //When a new input tweet is added to the promises array,
    //wait for the promises to resolve before updating the output tweet
    useEffect(() => {
        //grab the latest promise that has resolved
        const outputText = async () => {
            const fullyResolvedArray = await Promise.all(promisesArray);
            const latestInput = fullyResolvedArray.slice(-1)[0];

            const output = document.getElementById("output");
            output.value = inputTweet ? await processTweet(latestInput) : "";
            
            //Ensure output box gets latest update about sizing since output was changed
            autosize.update(document.getElementById("output"));
        };
        outputText();
    }, [promisesArray]);

    return (
        <div className="tweet-machine">
            <div className="input tweet-container">
                <div className="title">
                    <h3>Text To Tweetify:</h3>
                </div>
                <textarea
                    id="input"
                    placeholder="Better marketing is just one message away..."
                    value={inputTweet}
                    onChange={(e) => setInputTweet(e.target.value)}
                ></textarea>
            </div>
            <div className="output tweet-container">
                <div className="title">
                    <h3>Tweetified Text:</h3>
                </div>
                <textarea readOnly placeholder="Improved tweets shown here..." id="output"></textarea>
            </div>
        </div>
    );
};
