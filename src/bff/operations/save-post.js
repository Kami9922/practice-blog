import { updatePost } from '../api/update-post'
import { ROLE } from '../constants/role'
import { sessions } from '../sessions'

export const savePost = async (hash, newPostData) => {
	const accessRoles = [ROLE.ADMIN]

	const access = await sessions.access(hash, accessRoles)

	if (!access) {
		return {
			error: 'Доступ запрещён',
			res: null,
		}
	}

	const updatedPost = await updatePost(newPostData)

	return {
		error: null,
		res: updatedPost,
	}
}
