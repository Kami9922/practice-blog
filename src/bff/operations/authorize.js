import { getUser } from '../api/get-user'
import { sessions } from '../sessions'

export const authorize = async (authLogin, authPassword) => {
	const user = await getUser(authLogin)

	if (!user) {
		return {
			error: 'Такой пользователь на найден',
			res: null,
		}
	}

	const { id, login, password, roleId } = user

	if (authPassword !== password) {
		return {
			error: 'Неверный пароль',
			res: null,
		}
	}

	return {
		error: null,
		res: {
			id,
			login,
			roleId,
			session: sessions.create(user),
		},
	}
}
