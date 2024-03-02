import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./App.css"
import Home from "./components/Home";
import LoadMiniLink from './components/otherRoutes';

function App() {
  return (
    //react components must start with capital letters
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/*" element={<LoadMiniLink />} />
      </Routes>

    </Router>

  )
}

export default App;