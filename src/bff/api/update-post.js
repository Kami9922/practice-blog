export const updatePost = ({ id, imgUrl, title, content }) =>
	fetch(`http://localhost:3005/posts/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			img_url: imgUrl,
			title,
			content,
		}),
	}).then((loadedPost) => loadedPost.json())
