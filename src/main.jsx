import React from 'react';
import ReactDom from 'react-dom/client';
import App from './App';
import './index.css';

// Create the root
const root = ReactDom.createRoot(document.getElementById('root'));

// Render the App component inside the root
root.render(<App />);
