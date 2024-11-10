import styled from 'styled-components'
import { H2 } from '../../components/h2/h2'
// import { useDispatch } from 'react-redux'
import { UserRow } from './components/user-row/user-row'
import { TableRow } from './components/table-row/table-row'
import { useServerRequest } from '../../hooks/use-server-request'
import { useEffect, useState } from 'react'
import { Content } from '../../components/content/content'
import { ROLE } from '../../bff/constants/role'

const UsersContainer = ({ className }) => {
	// const dispatch = useDispatch()
	const [users, setUsers] = useState([])
	const [roles, setRoles] = useState([])
	const [errorMessage, setErrorMessage] = useState(null)
	const [shouldUpdateUserList, setShouldUpdateUserList] = useState(false)

	const requestServer = useServerRequest()

	useEffect(() => {
		Promise.all([
			requestServer('fetchUsers'),
			requestServer('fetchRoles'),
		]).then(([usersRes, rolesRes]) => {
			if (usersRes.error || rolesRes.error) {
				setErrorMessage(usersRes.error || rolesRes.error)
				return
			}

			setUsers(usersRes.res)

			setRoles(rolesRes.res)
		})
	}, [requestServer, shouldUpdateUserList])

	const onUserRemove = (userId) => {
		requestServer('removeUser', userId).then(() => {
			setShouldUpdateUserList(!shouldUpdateUserList)
		})
	}

	return (
		<div className={className}>
			<Content error={errorMessage}>
				<H2>Пользователи</H2>
				<div>
					<TableRow>
						<div className='login-column'>Логин</div>
						<div className='registered-at-column'>Дата регистрации</div>
						<div className='role-column'>Роль</div>
					</TableRow>

					{users.map(({ id, login, registeredAt, roleId }) => (
						<UserRow
							id={id}
							key={id}
							login={login}
							registeredAt={registeredAt}
							roleId={roleId}
							roles={roles.filter(({ id: roleId }) => roleId !== ROLE.GUEST)}
							onUserRemove={() => onUserRemove(id)}
						/>
					))}
				</div>
			</Content>
		</div>
	)
}

export const Users = styled(UsersContainer)`
	display: flex;
	align-items: center;
	font-size: 18px;
	margin: 0 auto;
	flex-direction: column;
	width: 570px;
`
