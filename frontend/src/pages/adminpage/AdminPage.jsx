import React from "react";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

//import style
import "./AdminPage.css";

function AdminPage() {
	const [entries, setEntries] = useState();
	const [posts, setPosts] = useState([]);

	function handleSubmit(e) {
		e.preventDefault();

		const formData = new FormData(e.target);

		fetch("http://localhost:7777/api/addEntry", {
			method: "POST",
			body: formData,
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				setEntries(data);
			});
	}

	useEffect(() => {
		fetch("http://localhost:7777/api/blogEntries")
			.then((response) => response.json())
			.then((data) => setPosts(data));
	}, []);

	function removePost(e) {
		const id = e.target.value;
		fetch(`http://localhost:7777/api/blogEntries/${id}`, {
			method: "DELETE",
		})
			.then((response) => {
				if (response.ok) {
					console.log(`Object with id ${id} has been deleted`);
					return response.json();
				} else {
					console.log(
						`Error deleting post with id ${id} : ${response.statusText}`
					);
				}
			})
			.then((updatedData) => setPosts(updatedData))
			.catch((err) => {
				console.log(console.error(`Error deleting post with id ${id}: ${err}`));
			});
	}

	return (
		<div className="AdminPage">
			<h3>Create a Blog Entry</h3>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					name="title"
					id="title"
					placeholder="Your title"
					required
				/>
				<select name="category" id="category">
					<option value="Travel">Travel</option>
					<option value="Food">Food</option>
				</select>
				<input type="file" name="image" id="image" required />
				<textarea
					required
					name="content"
					id="content"
					cols="30"
					rows="20"
					placeholder="Your text ..."></textarea>
				<button type="submit">Publish</button>
			</form>

			<h3>Edit your posts</h3>
			<section className="currentPosts">
				{posts &&
					posts.map((post) => (
						<div className="post" key={uuidv4()}>
							<img
								src={`http://localhost:7777/images/${post.image}`}
								alt={post.title}
								width="150px"
								height="150px"
							/>
							<article>
								<h4>{post.id.toString().padStart(2, 0)}</h4>
								<h6>{post.title}</h6>
							</article>

							<article className="actions">
								<button value={post.id} onClick={removePost}>
									Remove
								</button>
								<button value={post.id}>Edit</button>
							</article>
						</div>
					))}
			</section>
		</div>
	);
}

export default AdminPage;
