import React from "react";
import { Link } from "react-router-dom";
import "./Entry.css";

function Entry({ entry }) {
	return (
		<div className="Entry">
			<img src={`http://localhost:7777/images/${entry.image}`} alt="lanscape" />
			<h3>{entry.category}</h3>
			<h4>{entry.id.toString().padStart(2, 0)}</h4>
			<h5>{entry.title}</h5>
			<p>{`${entry.content.slice(0, 100)}. . .`}</p>
			<Link to={`/${entry.id}`}>Read more</Link>
		</div>
	);
}

export default Entry;
