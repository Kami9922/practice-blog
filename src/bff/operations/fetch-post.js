import { getPost } from '../api/get-post'

export const fetchPost = async (postId) => {
	const post = await getPost(postId)

	return {
		error: null,
		res: post,
	}
}
