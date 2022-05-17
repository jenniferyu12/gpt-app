import { useState } from 'react';
import ResponseCard from './ResponseCard';

function PromptPage() {
    const [userInput, setUserInput] = useState();
    const [pastResponses, setPastResponses] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

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
        console.log(pastResponses);
        pastResponses.push(responsePair)
        setPastResponses(pastResponses);
        setUserInput("");
        setIsLoading(false);
    }

    return (
        <div className="App">
            <h1>Fun with OpenAI!</h1>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <label for="userInput">
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
                    <></>
                    <button className="primarybtn">Submit</button>
                </form>
            </div>
            {pastResponses.length !== 0 && <h2>Responses</h2>}
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