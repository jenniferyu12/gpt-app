import { useEffect, useState, useRef } from 'react';
import ResponseCard from './ResponseCard';

function PromptPage() {
    const [userInput, setUserInput] = useState();
    const [pastResponses, setPastResponses] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const responseRef = useRef();

    const exampleList = [
        "List 10 singers from the 2000s",
        "Where was John Tavares born?",
        "Tell me a joke!",
        "How's the weather in Toronto?"
    ]

    const scrollDown = () => {
        responseRef.current.scrollIntoView({behavior: "smooth"});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const data = {
            prompt: userInput,
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
            prompt: userInput,
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
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="userInput">
                        Enter your prompt:
                        <textarea
                            type="text"
                            id="userInput"
                            name="userInput"
                            value={userInput}
                            onChange={e => setUserInput(e.target.value)}
                            required
                            aria-required="true"
                            rows={10}
                        />
                    </label>
                    <div className="example-container">
                        <p>Example Prompts:</p>
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
            {pastResponses.length !== 0 && <h2 ref={responseRef}>Responses</h2>}
            {isLoading && <p>Generating response...</p>}
            <div className="response-container">
                {pastResponses.length !== 0 && pastResponses.map(entry => (
                    <ResponseCard
                        prompt={entry.prompt}
                        response={entry.res}
                    />
                ))}
            </div>
        </div>
    );
}

export default PromptPage;