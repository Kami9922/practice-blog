import { generateDate } from '../utils/generate-date'

export const addPost = ({ imgUrl, title, content }) =>
	fetch('http://localhost:3005/posts', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			img_url: imgUrl,
			published_at: generateDate(),
			title,
			content,
		}),
	}).then((createdPost) => createdPost.json())
