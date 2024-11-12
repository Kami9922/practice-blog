import { transformPost } from '../transformers/transform-post'

export const getPost = async (postId) =>
	fetch(`http://localhost:3005/posts/${postId}`)
		.then((loadedPost) => loadedPost.json())
		.then((loadedPost) => loadedPost && transformPost(loadedPost))
