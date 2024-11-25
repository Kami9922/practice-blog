import { getPosts } from '../api/get-posts'
import { getComments } from '../api/get-comments'
import { getCommentsCount } from '../utils/get-comments-count'

export const fetchPosts = async () => {
	const [posts, comments] = await Promise.all([getPosts(), getComments()])
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
