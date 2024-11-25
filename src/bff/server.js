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
import { savePost } from './operations/save-post'
import { removePost } from './operations/remove-post'
import { fetchPosts } from './operations/fetch-posts'

export const server = {
	register,
	authorize,
	logout,
	fetchUsers,
	fetchRoles,
	fetchPost,
	fetchPosts,
	updateUserRole,
	removeUser,
	addPostComment,
	removePostComment,
	savePost,
	removePost,
}
