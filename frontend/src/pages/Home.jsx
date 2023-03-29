import React from "react";

// library import
import { useEffect, useState } from "react";
// import components
import Entry from "../components/Entry";

// https://dribbble.com/shots/20327458-Blog-Homepage-Exploration

//import styles
import "./Home.css";

//import images
import background from "../assets/images/picture3.jpg";

// import key
import { v4 as uuidv4 } from "uuid";

function Home() {
	const [entries, setEntries] = useState([]);

	useEffect(() => {
		fetch("http://localhost:7777/api/blogEntries")
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				setEntries(data);
			});
	}, []);
	console.log(entries);
	return (
		<div className="Home">
			<img
				src={background}
				alt="background"
				className="background"
				width="500px"
			/>
			<h2>
				Living in the <span>Moment</span>
			</h2>
			<main>
				{entries?.map((entry) => (
					<Entry key={uuidv4()} entry={entry} />
				))}
			</main>
		</div>
	);
}

export default Home;
