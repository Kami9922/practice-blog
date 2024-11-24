import styled from 'styled-components'
import { Icon } from '../../../../../components/icon/icon'
import { useDispatch } from 'react-redux'
import { removeCommentAsync } from '../../../../../actions/remove-comment-async'
import { useServerRequest } from '../../../../../hooks/use-server-request'
import { CLOSE_MODAL } from '../../../../../actions/close-modal'
import { openModal } from '../../../../../actions/open-modal'

const CommentContainer = ({
	className,
	postId,
	id,
	author,
	publishedAt,
	content,
}) => {
	const dispatch = useDispatch()
	const requestServer = useServerRequest()

	const onCommentRemove = (id) => {
		dispatch(
			openModal({
				text: 'Удалить комментарий?',
				onConfirm: () => {
					dispatch(removeCommentAsync(requestServer, postId, id))
					dispatch(CLOSE_MODAL)
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			})
		)
	}

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
			<Icon
				id='fa-trash-o'
				margin='0px 0px 0px 10px'
				size='21px'
				onClick={() => onCommentRemove(id)}
			/>
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
