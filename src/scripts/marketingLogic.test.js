import { determineHashtag, processTweet, _addHashtag } from "./marketingLogic";

describe("Testing _addhashtag() functionality", () => {
    test("does not add hashtag when any whitelisted hashtag is already present", () => {
        const english = "English #Tomato";
        expect(_addHashtag(english)).toBe(english);

        const french = "French #Tomate";
        expect(_addHashtag(french)).toBe(french);

        const italian = "Italian #Pomodoro";
        expect(_addHashtag(italian)).toBe(italian);

        const dutch = "Dutch #Tomaat";
        expect(_addHashtag(dutch)).toBe(dutch);

        const polish = "Polish #Pomidor";
        expect(_addHashtag(polish)).toBe(polish);
    });

    test("Adds english hashtag otherwise", () => {
        const english = "English message";
        expect(_addHashtag(english)).toBe(english + " #Tomato");

        const polish = "polska wiadomość";
        expect(_addHashtag(polish)).toBe(polish + " #Tomato");
    });
});

describe("Testing determineHashtag() functionality", () => {
    test("finds the correct translation of #Tomato", async () => {
        expect(await determineHashtag("en")).toBe("#Tomato");
        expect(await determineHashtag("it")).toBe("#Pomodoro");
        expect(await determineHashtag("ja")).toBe("#トマト");
        expect(await determineHashtag("so")).toBe("#Yaanyo");
    });
});

describe("Testing processTweet() functionality", () => {
    //Edge cases
    test("returns empty string is the input is empty", async () => {
        expect(await processTweet("")).toBe("");
    });
    test("returns error message if the language cannot be detected", async () => {
        expect(await processTweet("!420#@")).toBe(
            "Couldn't determine your language, type some more!"
        );
    });

    //Tweet length
    test("returns truncated tweet if input tweet length exceeds max allowed", async () => {
        const longTweet =
            "In west Philadelphia born and #Tomato On the playground was where I spent most of my days Chillin' out maxin' relaxin' all cool And all shootin some b-ball outside of the school When a couple of guys who were up to no good Started making trouble in my neighborhood I got in one little fight and my mom got scared She said 'You're movin' with your auntie and uncle in Bel Air";
        const shortenedTweet =
            "In west Philadelphia born and #Tomato On the playground was where I spent most of my days Chillin' out maxin' relaxin' all cool And all shootin some b-ball outside of the school When a couple of guys who were up to no good Started making trouble in my neighborhood I got in one li";
        expect(await processTweet(longTweet)).toBe(shortenedTweet);
    });
    test("(foreign language) returns truncated tweet if input tweet length exceeds max allowed", async () => {
        const foreignLongTweet = `Nato a West Philadelphia e #Pomodoro Nel parco giochi era dove passavo la maggior parte dei miei giorni rilassandomi al massimo rilassandomi tutto bene creando problemi nel mio quartiere ho avuto una piccola rissa e mia madre si è spaventata Ha detto "Ti trasferisci con tua zia e tuo zio a Bel Air"`;
        const foreignShortenedTweet = `Nato a West Philadelphia e #Pomodoro Nel parco giochi era dove passavo la maggior parte dei miei giorni rilassandomi al massimo rilassandomi tutto bene creando problemi nel mio quartiere ho avuto una piccola rissa e mia madre si è spaventata Ha detto "Ti trasferisci con tua zia e`;
        expect(await processTweet(foreignLongTweet)).toBe(foreignShortenedTweet);
    });
    test("returns tweet plus appropriate hashtag truncated to max allowed chars", async () => {
        const longTweet =
            "In west Philadelphia born and raised On the playground was where I spent most of my days Chillin' out maxin' relaxin' all cool And all shootin some b-ball outside of the school When a couple of guys who were up to no good Started making trouble in my neighborhood I got in one little fight and my mom got scared She said 'You're movin' with your auntie and uncle in Bel Air";
        const shortenedTweet =
            "In west Philadelphia born and raised On the playground was where I spent most of my days Chillin' out maxin' relaxin' all cool And all shootin some b-ball outside of the school When a couple of guys who were up to no good Started making trouble in my neighborhood I got in #Tomato";
        expect(await processTweet(longTweet)).toBe(shortenedTweet);
    });
    test("(foreign language) returns tweet plus appropriate hashtag truncated to max allowed chars", async () => {
        const foreignLongTweet = `Nato e cresciuto a West Philadelphia Nel parco giochi era dove trascorrevo la maggior parte delle mie giornate Rilassarsi al massimo rilassandosi tutto bene E tutti sparano a qualche b-ball fuori dalla scuola Quando un paio di ragazzi che non avevano buone intenzioni Ha iniziato a creare problemi nel mio quartiere Ho litigato un po' e mia madre si è spaventata Ha detto "Ti trasferisci con tua zia e tuo zio a Bel Air"`;
        const foreignShortenedTweet = `Nato e cresciuto a West Philadelphia Nel parco giochi era dove trascorrevo la maggior parte delle mie giornate Rilassarsi al massimo rilassandosi tutto bene E tutti sparano a qualche b-ball fuori dalla scuola Quando un paio di ragazzi che non avevano buone intenzioni Ha #Pomodoro`;
        expect(await processTweet(foreignLongTweet)).toBe(foreignShortenedTweet);
    });

    //Adds the correct hashtag when appropriate
    test("returns the original message with the appropriately translated hashtag", async () => {
        expect(await processTweet("Hey there")).toBe("Hey there #Tomato");
        expect(await processTweet("esempio")).toBe("esempio #Pomodoro");
    });
    test("returns the original tweet if the hastag is already present", async () => {
        const english = "Hey there #Tomato";
        expect(await processTweet(english)).toBe(english);

        const italian = "esempio #Pomodoro";
        expect(await processTweet(italian)).toBe(italian);
    });
});
