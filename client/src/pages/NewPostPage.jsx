import { useRef } from "react";
import toast from "react-hot-toast";
import { createPostServices } from "../../services/postServices";

const NewPostPage = () => {
	const titleRef = useRef();
	const contentRef = useRef();
	const photoRef = useRef();
	const handleSubmit = async (e) => {
		e.preventDefault();
		const title = titleRef.current.value;
		const content = contentRef.current.value;
		const photo = photoRef.current.files[0];
		// sacar el guildId de la URL
		const guildId = new URLSearchParams(window.location.search).get("guildId");
		const formData = new FormData();
		formData.append("title", title);
		formData.append("content", content);
		formData.append("photo", photo);
		try {
			await createPostServices({ guildId, formData });
			titleRef.current.value = "";
			contentRef.current.value = "";
			photoRef.current.value = "";
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
					<input type="file" id="photo" ref={photoRef} />
				</div>
				<button type="submit">Create Post</button>
			</form>
		</main>
	);
};

export default NewPostPage;
