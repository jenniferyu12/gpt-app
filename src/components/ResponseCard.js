function ResponseCard({ prompt, response }) {

    return (
        <div className="response-card">
            <h3>Prompt: </h3>
            <p>{prompt}</p>
            <h3>Responses: </h3>
            <p>{response}</p>
        </div>
    );
}

export default ResponseCard;