import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RacePage from './components/RacePage';
import DriverPage from './components/DriverPage';
import DriverDetail from './components/DriverDetail';

function App() {
  return (
    <div className="App">
      <header className="header">
        <Navbar />
      </header>
      <div className="content">
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/race' element={<RacePage />} />
            <Route path='/driver' element={<DriverPage />} />
            <Route path='/driver/:id' element={<DriverDetail />} />
          </Routes>
        </Router>

      </div>
      <Footer />
    </div>
  );
}

export default App;
