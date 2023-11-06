import Navbar from './components/Navbar';
import HomePage from './views/HomePage';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div style={{width:'100%', height:'100%'}}>
    <Navbar/>
    <HomePage/>
    <Footer/>
    </div>
  );
}

export default App;
