import { deleteComment } from '../api/delete-comment'
import { deletePost } from '../api/delete-post'
import { getComments } from '../api/get-comments'
import { ROLE } from '../constants/role'
import { sessions } from '../sessions'

export const removePost = async (hash, id) => {
	const accessRoles = [ROLE.ADMIN]

	const access = await sessions.access(hash, accessRoles)

	if (!access) {
		return {
			error: 'Доступ запрещён',
			res: null,
		}
	}

	await deletePost(id)

	const comments = await getComments(id)

	await Promise.all(
		comments.map(({ id: commentId }) => deleteComment(commentId))
	)

	return {
		error: null,
		res: true,
	}
}
