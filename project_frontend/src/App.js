import './App.css';
import './assets/fonts/fonts.scss';
import Header from "./components/header/Header";
import Content from "./components/content/Content";
import Footer from "./components/footer/Footer";
import LoginForm from "./components/login/LoginForm";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
    return (
        <Router>
            <div className='app_wrapper'>
                <Header/>
                <Routes>
                    <Route path='/' element={<Content />}/>
                    <Route path='/login' element={<LoginForm />}/>
                </Routes>
                <Footer/>
            </div>
        </Router>
    )
}

export default App;
