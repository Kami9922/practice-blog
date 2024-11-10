import { updateUserRole } from './api/update-user-role'
import { authorize } from './operations/authorize'
import { fetchRoles } from './operations/fetch-roles'
import { fetchUsers } from './operations/fetch-users'
import { logout } from './operations/logout'
import { register } from './operations/register'
import { removeUser } from './operations/remove-user'

export const server = {
	register,
	authorize,
	logout,
	fetchUsers,
	fetchRoles,
	updateUserRole,
	removeUser,
}
