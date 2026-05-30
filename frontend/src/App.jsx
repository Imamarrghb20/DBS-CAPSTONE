import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Splash from './pages/Splash';
import Welcome from './pages/Welcome';
import Features from './pages/Features';
import Intro from './pages/Intro';
import Register from './pages/Register';
import Login from './pages/Login';
import PredictionForm from './pages/PredictionForm';
import Result from './pages/Result';
import Profile from './pages/Profile';
import History from './pages/History';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex justify-center bg-gradient-to-b from-[#FDF2F8] to-[#F3E8FF]">
        <div className="w-full max-w-md bg-transparent min-h-screen relative flex flex-col shadow-2xl shadow-purple-900/10 overflow-hidden">
          <main className="flex-grow flex flex-col relative w-full h-full">
            <Routes>
              <Route path="/" element={<Splash />} />
              <Route path="/welcome" element={<Welcome />} />
              <Route path="/features" element={<Features />} />
              <Route path="/intro" element={<Intro />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/predict" element={<PredictionForm />} />
              <Route path="/result" element={<Result />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/history" element={<History />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
