import React from "react"
import { Routes, Route } from "react-router-dom"
import Test from "./test"

export default function App({name}: {name: string}) {
    React.useEffect(() => {
        document.title = name
    }, [name])

    return(
        <>
            <main>
                <Routes>
                    <Route index element={<div>Home</div>} />
                    <Route path="test" element={<Test/>}/>
                </Routes>
            </main> 
        </>
    )
}