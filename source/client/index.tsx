import React from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import App from './app'

const container = document.getElementById('app')

const root = createRoot(container)

root.render (
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/*" element={<App name="Typescript GraphQL React Template"/>}/>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
)