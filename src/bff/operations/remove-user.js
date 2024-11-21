import { deleteUser } from '../api/delete-user'
import { ROLE } from '../constants/role'
import { sessions } from '../sessions'

export const removeUser = async (hash, userId) => {
	const accessRoles = [ROLE.ADMIN]

	const access = await sessions.access(hash, accessRoles)

	if (!access) {
		return {
			error: 'Доступ запрещён',
			res: null,
		}
	}

	deleteUser(userId)

	return {
		error: null,
		res: true,
	}
}
