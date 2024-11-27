import { getPosts, getComments } from '../api/index'
import { getCommentsCount } from '../utils/get-comments-count'

export const fetchPosts = async (searchPhrase, page, limit) => {
	const [{ posts, links }, comments] = await Promise.all([
		getPosts(searchPhrase, page, limit),
		getComments(),
	])
	// const posts = await getPosts()
	// const comments = await getComments()
	return {
		error: null,
		res: {
			posts: posts.map((post) => ({
				...post,
				commentsCount: getCommentsCount(comments, post.id),
			})),
			links,
		},
	}
}
