//Components
import { TweetMachine } from "./components/tweetmachine";

//Styles
import "./styles/App.scss";

function App() {
    return (
        <div className="App">
            <div className="title-container">
                <h1>
                    Pomodoro Magnifico 3000
                    <span role="img" aria-label="tomato emoji">
                        🍅
                    </span>
                </h1>
            </div>
            <TweetMachine />
        </div>
    );
}

export default App;
