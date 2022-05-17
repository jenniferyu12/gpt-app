import { useState, useRef } from 'react';
import ResponseCard from './ResponseCard';

function PromptPage() {
    const [userInput, setUserInput] = useState();
    const [pastResponses, setPastResponses] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const responseRef = useRef();

    const exampleList = [
        "List 10 singers from the 2000s",
        "Where was John Tavares born?",
        "My name is Jennifer Yu",
        "How's the weather in Toronto?"
    ]

    const scrollDown = () => {
        responseRef.current.scrollIntoView({behavior: "smooth"});
    }

    const handleSubmit = async (e, input = '') => {
        e.preventDefault();
        setIsLoading(true);

        console.log(userInput);

        const data = {
            prompt: input ? input : userInput,
            temperature: 0.5,
            max_tokens: 64,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
        };

        const res = await fetch("https://api.openai.com/v1/engines/text-curie-001/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.REACT_APP_OPENAI_SECRET}`,
            },
            body: JSON.stringify(data),
        });

        const response = await res.json();
        const responsePair = {
            prompt: input ? input : userInput,
            res: response.choices[0].text
        };
        pastResponses.push(responsePair);
        setPastResponses(pastResponses);
        setUserInput("");
        setIsLoading(false);
        scrollDown();
    }

    return (
        <div className="App">
            <h1>Fun with OpenAI!</h1>
            <p className="lighttext">Explore the GPT-3 API, an AI model created by OpenAI, by entering your own
                prompts or selecting one of the example prompts below.
            </p>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="userInput">
                        Enter your prompt:
                        <textarea
                            type="text"
                            id="userInput"
                            name="userInput"
                            value={isLoading ? "Generating response..." : userInput}
                            onChange={e => setUserInput(e.target.value)}
                            required
                            aria-required="true"
                            rows={10}
                        />
                    </label>
                    <div className="example-container">
                        <p>Example Prompts (click to submit):</p>
                        {exampleList.map(example => (
                            <button className="secondarybtn" 
                                onClick={e => setUserInput(example)}>
                                {example}
                            </button>
                        ))}
                    </div>
                    <button className="primarybtn">Submit</button>
                </form>
            </div>
            <h2 ref={responseRef}>Responses</h2>
            {pastResponses.length !== 0
                ? <p className="lighttext">
                    Click "try it again" to see if a different response is generated!
                </p>
                : <p className="lighttext">Enter a prompt to see a response!</p>
            }           
            {isLoading && <p>Generating response...</p>}
            <div className="response-container">
                {pastResponses.length !== 0 && pastResponses.map((entry, index) => (
                    <ResponseCard
                        key={index}
                        prompt={entry.prompt}
                        response={entry.res}
                        handleSubmit={handleSubmit}
                        setUserInput={setUserInput}
                    />
                ))}
            </div>
        </div>
    );
}

export default PromptPage;