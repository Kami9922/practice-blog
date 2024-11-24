import { selectUserRole } from '../../selectors/select-user-role'
import { ROLE } from '../constants/role'
import { sessions } from '../sessions'

export const updateUserRole = async (hash, userId, newUserRoleId) => {
	const accessRoles = [ROLE.ADMIN]

	const access = await sessions.access(hash, accessRoles)

	if (!access) {
		return {
			error: 'Доступ запрещён',
			res: null,
		}
	}

	selectUserRole(userId, newUserRoleId)

	return {
		error: null,
		res: true,
	}
}
