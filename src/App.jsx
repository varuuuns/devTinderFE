import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Navbar } from "./components/Navbar"
import { Body } from "./components/Body"

function App() {

    return (
        <div>
            <BrowserRouter basename="/">
                <Routes>
                    <Route path="/" element={<Body/>}/>

                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
