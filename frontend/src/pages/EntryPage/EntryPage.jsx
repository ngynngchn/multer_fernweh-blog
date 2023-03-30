import React from "react";
//import packages
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

//style import
import "./EntryPage.css";

function EntryPage() {
	const [entry, setEntry] = useState();
	const params = useParams();

	useEffect(() => {
		fetch("http://localhost:7777/api/blogEntries")
			.then((response) => response.json())
			.then((data) => {
				let result = data.find((elem) => {
					if (elem.id == params.blogentry) {
						return elem;
					}
				});
				setEntry(result);
			});
	}, []);

	if (!entry) {
		return;
	}

	// entry.content = entry.content.replace(/\r\n\r\n/g, "\u2028");
	// console.log(entry.content);

	return (
		<div className="EntryPage ">
			<h2>
				Living in the <span>Moment</span>
			</h2>
			<img
				src={`http://localhost:7777/images/${entry.image}`}
				alt="{entry.title}"></img>
			<main>
				<h3>{entry.category}</h3>
				<h4>{entry.id.toString().padStart(2, 0)}</h4>
				<h5>{entry.title}</h5>
				<p style={{ whiteSpace: "pre-line" }}>{entry.content}</p>
			</main>
		</div>
	);
}

export default EntryPage;
