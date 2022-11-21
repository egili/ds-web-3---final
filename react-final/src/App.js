import './App.css';
import Logo from './components/template/logo';
import Menu from './components/template/menu';
import Footer from './components/template/footer';
import Rotas from './rotas';

import { BrowserRouter } from 'react-router-dom';

export default function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Logo />
        <Menu />
        <Rotas />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

