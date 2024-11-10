import { getRoles } from '../api/get-roles'
import { sessions } from '../sessions'
import { ROLE } from '../constants/role'

export const fetchRoles = async (userSession) => {
	const accessRoles = [ROLE.ADMIN]

	if (!sessions.access(userSession, accessRoles)) {
		return {
			error: 'Доступ запрещён',
			res: null,
		}
	}

	const roles = await getRoles()

	return {
		error: null,
		res: roles,
	}
}
