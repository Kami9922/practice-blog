import { ACTION_TYPE } from './action-type'
import { server } from '../bff/server'

export const logoutAction = (session) => {
	server.logout(session)
	return { type: ACTION_TYPE.LOGOUT }
}
