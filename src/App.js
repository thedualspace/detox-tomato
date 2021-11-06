//Components
import { TweetMachine } from "./components/tweetmachine";

//Styles
import "./App.scss";

function App() {
    return (
        <div className="App">
            <div className="title-container">
                <h1>Pomodoro Magnifico 3000 🍅</h1>
            </div>
            <TweetMachine />
        </div>
    );
}

export default App;
