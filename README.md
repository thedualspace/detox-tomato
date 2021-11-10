# Digital Detox Submission

## Configuration

Before the project can run successfully, a valid service account file for Google Cloud must be added to
    
    src/auth/googelAuth.json

The file has the following format :

    {
        "type": "",
        "project_id": "",
        "private_key_id": "",
        "private_key": "",
        "client_email": "",
        "client_id": "",
        "auth_uri": "",
        "token_uri": "",
        "auth_provider_x509_cert_url": "",
        "client_x509_cert_url": ""
    }

# Use 
## **Local Environment**
To run the project locally, run
### `npm install`
### `npm start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## **Codesandbox**
Open [this url](https://codesandbox.io/s/morning-haze-kwwgv?file=/src/App.js) to view it in the browser.

# Discussion
Specific details of implementation can be found in the form of inline comments, but a brief summary of some of the of the app is discussed here.

- The app begins with both empty input and output textareas. 
- When a user types into the input text box, a debouncer is used to call changeHandler(). This allows us to wait a specified duration (in this case 300ms) before we process the input tweet. We do this to prevent excessive recomputations on a tweet as a user types into the input text box.
 
- changeHandler() then performs the following :
    - set loading to true
    - queues the input tweet to be processed and awaits the result
    - adds an additional random timeout and waits
    - finally sets the value of the output texbox to equal the processed result
    - call autoresize to resize the textarea as appropriate based on content
    
- When loading is true, the output textbox is given a special class and placeholder, which is used to indicate to the user that a the app is processing the tweet.

- A tweet is processed by passing to processTweet(), which does the following :
    - detect the language of a string
    - test against edge cases and conditionally return
    - find the translation of "Tomato" in the detected language using google translate, and add a hashtag
    - truncate the tweet down if required and add the hastag, ensuring the tweet including hashtag is not longer than 280 characters.

On testing, a small collection of unit tests were included using jest, guaranteeing the performance of the scripts used to process the tweets.

## Some points of interest
1. An alternative solution I explored to the auto-growing text area (other than simply giving it very large proportions) involved using a `<div/>` with `role="textarea"` and `contenteditable`. However I was not confident that the accessibility of this solution was satisfactory, so I opted for a js based solution instead. 
2. `@google-cloud/translate` has exceptionally well written docs, and they were in this case totally insufficient. Unfortunately after some time debugging, I discovered support for web clients is "limited" at this time, and in my experience the same is true for the usefulness of the errors google-cloud provides. However by exploring some packages on npm that provided react-based translation, I was able to find a workaround, which was used to get the translation working without setting up a node server. In essence it came down to how the credentials are passed to google-cloud's Translate class, and as always when using a tool for the first time, this fix was frustratingly simple.
3. Before settling on debouncing, I tried a promise based solution to ensure the latest input always got processed last, despite the random timer duration. This worked, but ultimately was a little overengineered, and so after some more reading I found the more readable, more efficient solution used currently.

## Feedback
Thank you for this well thought out exercise, I reflected on how clever it was more than once throughout my implementation. 
