import { useRef } from "react";
import toast from "react-hot-toast";
import { createPostServices } from "../../services/postServices";

const NewPostPage = () => {
	const titleRef = useRef();
	const contentRef = useRef();
	const photosRef = useRef();
	const handleSubmit = async (e) => {
		e.preventDefault();
		const title = titleRef.current.value;
		const content = contentRef.current.value;
		const photos = photosRef.current.files;
		// sacar el guildId de la URL
		const guildId = window.location.pathname.split("/")[2];
		console.log("guild", guildId);
		//const guildId = new URLSearchParams(window.location.search).get("guildId");
		console.log("guild", guildId);
		const formData = new FormData();
		formData.append("title", title);
		formData.append("content", content);
		for (let i = 0; i < photos.length; i++) {
			formData.append("photos", photos[i]);
		}
		try {
			await createPostServices({ guildId, formData });
			titleRef.current.value = "";
			contentRef.current.value = "";
			photosRef.current.value = "";
			toast.success("Post created successfully");
		} catch (error) {
			toast.error(error.message);
		}
	};
	return (
		<main>
			<form onSubmit={handleSubmit}>
				<h2>Crear nuevo Post</h2>
				<div>
					<label htmlFor="title">Title</label>
					<input type="text" id="title" ref={titleRef} />
				</div>
				<div>
					<label htmlFor="content">Content</label>
					<textarea id="content" ref={contentRef}></textarea>
				</div>
				<div>
					<label htmlFor="photo">Photo</label>
					<input type="file" id="photo" ref={photosRef} />
				</div>
				<button type="submit">Create Post</button>
			</form>
		</main>
	);
};

export default NewPostPage;
