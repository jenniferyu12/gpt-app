function ResponseCard({ prompt, response, handleSubmit }) {


    return (
        <div className="response-card">
            <h3>Prompt: </h3>
            <p>{prompt}</p>
            <h3>Responses: </h3>
            <p>{response}</p>
            <button 
            className="tertiarybtn" 
            onClick={(e) => handleSubmit(e, prompt)}>
                Try it again!
            </button>
        </div>
    );
}

export default ResponseCard;