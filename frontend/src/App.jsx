import { useState } from "react";
import "./App.css";

//import packages
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

//import components
import Home from "./pages/Home.jsx";
import AdminPage from "./pages/AdminPage";
import EntryPage from "./pages/EntryPage";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Link to="/addEntry">ADMIN</Link>
				<h1>Fernweh</h1>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/addEntry" element={<AdminPage />} />
					<Route path="/:blogentry" element={<EntryPage />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
