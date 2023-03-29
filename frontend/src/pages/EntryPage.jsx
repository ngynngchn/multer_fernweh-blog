import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function EntryPage() {
	const [entry, setEntry] = useState();
	const params = useParams();

	console.log(params.blogentry);

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

	return (
		<div className="EntryPage">
			<h2>Living in the Moment</h2>
		</div>
	);
}

export default EntryPage;
