import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PromptPage from './components/PromptPage.js';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<PromptPage />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
