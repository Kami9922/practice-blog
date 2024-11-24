import { updateUserRole } from './operations/update-user-role'
import { addPostComment } from './operations/add-post-comment'
import { authorize } from './operations/authorize'
import { fetchPost } from './operations/fetch-post'
import { fetchRoles } from './operations/fetch-roles'
import { fetchUsers } from './operations/fetch-users'
import { logout } from './operations/logout'
import { register } from './operations/register'
import { removePostComment } from './operations/remove-post-comment'
import { removeUser } from './operations/remove-user'
import { updatePost } from './api/update-post'
import { savePost } from './operations/save-post'

export const server = {
	register,
	authorize,
	logout,
	fetchUsers,
	fetchRoles,
	fetchPost,
	updateUserRole,
	removeUser,
	addPostComment,
	removePostComment,
	updatePost,
	savePost,
}
