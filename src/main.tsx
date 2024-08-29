import { StrictMode } from 'react';
import App from './app/app';
import './style.css'
import {createRoot} from "react-dom/client";

const rootElement = document.getElementById('root');

const root = createRoot(rootElement)
root.render(
    <StrictMode>
        <App/>
    </StrictMode>
)