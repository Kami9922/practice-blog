import { deleteComment, getComments, getPost } from '../api/index'
import { ROLE } from '../constants/role'
import { sessions } from '../sessions'
import { getPostCommentsWithAuthor } from '../utils/get-post-comments-with-author'

export const removePostComment = async (hash, postId, id) => {
	const accessRoles = [ROLE.ADMIN, ROLE.MODERATOR]

	const access = await sessions.access(hash, accessRoles)

	if (!access) {
		return {
			error: 'Доступ запрещён',
			res: null,
		}
	}

	await deleteComment(id)

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
