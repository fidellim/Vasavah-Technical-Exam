import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { SnackbarProvider } from 'notistack'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <SnackbarProvider maxSnack={4}>
                <App />
            </SnackbarProvider>
        </BrowserRouter>
    </React.StrictMode>
)
