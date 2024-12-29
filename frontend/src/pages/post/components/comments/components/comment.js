import styled from 'styled-components'
import { Icon } from '../../../../../components/icon/icon'
import { useDispatch, useSelector } from 'react-redux'
import { removeCommentAsync } from '../../../../../actions/remove-comment-async'
import { CLOSE_MODAL } from '../../../../../actions/close-modal'
import { openModal } from '../../../../../actions/open-modal'
import { selectUserRole } from '../../../../../selectors/select-user-role'
import { ROLE } from '../../../../../constants/role'
import PropTypes from 'prop-types'

const CommentContainer = ({
	className,
	postId,
	id,
	author,
	publishedAt,
	content,
}) => {
	const dispatch = useDispatch()

	const userRole = useSelector(selectUserRole)

	const onCommentRemove = (id) => {
		dispatch(
			openModal({
				text: 'Удалить комментарий?',
				onConfirm: () => {
					dispatch(removeCommentAsync(postId, id))
					dispatch(CLOSE_MODAL)
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			})
		)
	}

	const isAdminOrModerator = [ROLE.ADMIN, ROLE.MODERATOR].includes(userRole)

	return (
		<div className={className}>
			<div className='comment'>
				<div className='information-panel'>
					<div className='author'>
						<Icon
							inactive={true}
							id='fa-user-circle-o'
							margin='0px 10px 0px 0px'
							size='18px'
						/>
						{author}
					</div>
					<div className='published-at'>
						<Icon
							inactive={true}
							id='fa-calendar-o'
							margin='0px 10px 0px 0px'
							size='18px'
						/>
						{publishedAt}
					</div>
				</div>
				<div className='comment-text'>{content}</div>
			</div>
			{isAdminOrModerator && (
				<Icon
					id='fa-trash-o'
					margin='0px 0px 0px 10px'
					size='21px'
					onClick={() => onCommentRemove(id)}
				/>
			)}
		</div>
	)
}

export const Comment = styled(CommentContainer)`
	display: flex;
	margin-top: 10px;

	& .comment {
		border: 1px solid #000;
		width: 550px;
		padding: 5px 10px;
	}

	& .information-panel {
		display: flex;
		justify-content: space-between;
	}

	& .author {
		display: flex;
	}

	& .published-at {
		display: flex;
	}
`
Comment.propTypes = {
	postId: PropTypes.string.isRequired,
	id: PropTypes.number.isRequired,
	author: PropTypes.string.isRequired,
	publishedAt: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired,
}
