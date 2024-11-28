import React from 'react'
import styled from 'styled-components'
import { Icon } from '../../../../components/icon/icon'
import { useDispatch, useSelector } from 'react-redux'
import { openModal } from '../../../../actions/open-modal'
import { CLOSE_MODAL } from '../../../../actions/close-modal'
import { useServerRequest } from '../../../../hooks/use-server-request'
import { useNavigate } from 'react-router-dom'
import { removePostAsync } from '../../../../actions/remove-post-async'
import { ROLE } from '../../../../constants/role'
import { checkAccess } from '../../../../utils/check-access'
import { selectUserRole } from '../../../../selectors/select-user-role'

const SpecialPanelContainer = ({ className, id, publishedAt, editButton }) => {
	const dispatch = useDispatch()
	const requestServer = useServerRequest()
	const navigate = useNavigate()

	const userRole = useSelector(selectUserRole)

	const onPostRemove = (id) => {
		dispatch(
			openModal({
				text: 'Удалить статью?',
				onConfirm: () => {
					dispatch(removePostAsync(requestServer, id)).then(() => navigate('/'))
					dispatch(CLOSE_MODAL)
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			})
		)
	}

	const isAdmin = checkAccess([ROLE.ADMIN], userRole)

	return (
		<div className={className}>
			<div className='published-at'>
				{publishedAt && (
					<Icon
						inactive={true}
						id='fa-calendar-o'
						margin='0px 10px 0px 0px'
						size='18px'
					/>
				)}
				{publishedAt}
			</div>
			{isAdmin && (
				<div className='buttons'>
					{editButton}
					{publishedAt && (
						<Icon
							id='fa-trash-o'
							margin='0px 0px 0px 10px'
							size='21px'
							onClick={() => onPostRemove(id)}
						/>
					)}
				</div>
			)}
		</div>
	)
}

export const SpecialPanel = styled(SpecialPanelContainer)`
	display: flex;
	justify-content: space-between;
	margin: ${({ margin }) => margin};

	& i {
		position: relative;
		top: -1px;
	}
	& .published-at {
		display: flex;
		font-size: 18px;
	}
	& .buttons {
		display: flex;
	}
`
