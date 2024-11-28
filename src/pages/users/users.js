import styled from 'styled-components'
import { H2 } from '../../components/h2/h2'
// import { useDispatch } from 'react-redux'
import { UserRow } from './components/user-row/user-row'
import { TableRow } from './components/table-row/table-row'
import { useServerRequest } from '../../hooks/use-server-request'
import { useEffect, useState } from 'react'
import { PrivateContent } from '../../components/private-content/private-content'
import { ROLE } from '../../bff/constants/role'
import { checkAccess } from '../../utils/check-access'
import { useSelector } from 'react-redux'
import { selectUserRole } from '../../selectors/select-user-role'

const UsersContainer = ({ className }) => {
	const [users, setUsers] = useState([])
	const [roles, setRoles] = useState([])
	const [errorMessage, setErrorMessage] = useState(null)
	const [shouldUpdateUserList, setShouldUpdateUserList] = useState(false)

	const userRole = useSelector(selectUserRole)

	const requestServer = useServerRequest()

	useEffect(() => {
		if (!checkAccess([ROLE.ADMIN], userRole)) {
			return
		}

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
	}, [requestServer, shouldUpdateUserList, userRole])

	const onUserRemove = (userId) => {
		if (!checkAccess([ROLE.ADMIN], userRole)) {
			return
		}

		requestServer('removeUser', userId).then(() => {
			setShouldUpdateUserList(!shouldUpdateUserList)
		})
	}

	return (
		<PrivateContent
			access={[ROLE.ADMIN]}
			error={errorMessage}>
			<div className={className}>
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
			</div>
		</PrivateContent>
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
