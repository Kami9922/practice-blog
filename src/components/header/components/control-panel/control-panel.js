import React from 'react'
import styled from 'styled-components'
import { Icon } from '../../../icon/icon'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../../../button/button'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserRole } from '../../../../selectors/select-user-role'
import { ROLE } from '../../../../constants/role'
import { selectUserLogin } from '../../../../selectors/select-user-login'
import { logoutAction } from '../../../../actions/logout-action'
import { selectUserSession } from '../../../../selectors/select-user-session'

const RightAligned = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
`

const Username = styled.div`
	font-size: 18px;
	font-weight: bold;
`

const ControlPanelContainer = ({ className }) => {
	const navigate = useNavigate()

	const dispatch = useDispatch()

	const roleId = useSelector(selectUserRole)
	const login = useSelector(selectUserLogin)
	const session = useSelector(selectUserSession)

	return (
		<div className={className}>
			<RightAligned>
				{roleId === ROLE.GUEST ? (
					<Button>
						<Link to='/login'>Войти</Link>
					</Button>
				) : (
					<>
						<Username>{login}</Username>

						<Icon
							id='fa-sign-out'
							margin='0px 0px 0px 10px'
							onClick={() => dispatch(logoutAction(session))}
						/>
					</>
				)}
			</RightAligned>
			<RightAligned>
				<Icon
					onClick={() => navigate(-1)}
					id='fa-backward'
					margin='10px 0px 0px 0px'
				/>

				<Link to='/post'>
					<Icon
						id='fa-file-text-o'
						margin='10px 0px 0px 16px'
					/>
				</Link>
				<Link to='/users'>
					<Icon
						id='fa-users'
						margin='10px 0px 0px 16px'
					/>
				</Link>
			</RightAligned>
		</div>
	)
}

export const ControlPanel = styled(ControlPanelContainer)`
	// display: flex;
`
