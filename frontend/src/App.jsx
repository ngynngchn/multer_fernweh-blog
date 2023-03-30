import "./App.css";

//import packages
import { Routes, Route, Link, useNavigate } from "react-router-dom";

//import components
import Home from "./pages/Home.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import EntryPage from "./pages/EntryPage/EntryPage.jsx";

function App({}) {
	const navigate = useNavigate();

	return (
		<div className="App">
			<nav>
				{window.location.pathname !== "/" && ( // check if path is home
					<button onClick={() => navigate(-1)}>Go Back</button>
				)}
				<Link to="/addEntry">ADMIN</Link>
			</nav>
			<h1>Fernweh</h1>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/addEntry" element={<AdminPage />} />
				<Route path="/:blogentry" element={<EntryPage />} />
			</Routes>
		</div>
	);
}

export default App;
