import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './bootsrap-override.scss';
import App from './App';
import UserSignupPage from './pages/UserSignupPage';
import LoginPage from './pages/LoginPage'
import reportWebVitals from './reportWebVitals';
import './i18n'
import LanguageSelector from './components/LanguageSelector'

ReactDOM.render(
<div>
    <UserSignupPage />
    <LanguageSelector />
</div>, 
document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
