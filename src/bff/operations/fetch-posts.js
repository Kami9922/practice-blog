import { getPosts, getComments } from '../api/index'
import { getCommentsCount } from '../utils/get-comments-count'

export const fetchPosts = async (page, limit) => {
	const [posts, comments] = await Promise.all([
		getPosts(page, limit),
		getComments(),
	])
	// const posts = await getPosts()
	// const comments = await getComments()

	return {
		error: null,
		res: posts.map((post) => ({
			...post,
			commentsCount: getCommentsCount(comments, post.id),
		})),
	}
}
