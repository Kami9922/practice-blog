import { ROLE } from '../constants/role'
import { removeComment } from './session/remove-comment'
export const createSession = (roleId) => {
	const session = {
		logout() {
			Object.keys(session).forEach((key) => {
				delete session[key]
			})
		},
	}

	const { ADMIN, MODERATOR, READER } = ROLE

	switch (roleId) {
		case ADMIN: {
			session.removeComment = removeComment
			break
		}
		case MODERATOR: {
			session.removeComment = removeComment
			break
		}
		case READER: {
			break
		}
		default:
	}
	return session
}
