import { addComment, getPost } from '../api/index'
import { ROLE } from '../constants/role'
import { sessions } from '../sessions'
import { getPostCommentsWithAuthor } from '../utils/get-post-comments-with-author'
export const addPostComment = async (hash, userId, postId, content) => {
	const accessRoles = [ROLE.ADMIN, ROLE.MODERATOR, ROLE.READER]

	const access = await sessions.access(hash, accessRoles)

	if (!access) {
		return {
			error: 'Доступ запрещён',
			res: null,
		}
	}

	await addComment(userId, postId, content)

	const post = await getPost(postId)

	const commentsWithAuthor = await getPostCommentsWithAuthor(postId)

	return {
		error: null,
		res: {
			...post,
			comments: commentsWithAuthor,
		},
	}
}
