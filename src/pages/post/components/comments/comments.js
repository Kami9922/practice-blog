import React, { useState } from 'react'
import styled from 'styled-components'
import { Icon } from '../../../../components/icon/icon'
import { Comment } from './components/comment'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserId } from '../../../../selectors/select-user-id'
import { useServerRequest } from '../../../../hooks/use-server-request'
import { addCommentAsync } from '../../../../actions/add-comment-async'
import { selectUserRole } from '../../../../selectors/select-user-role'
import { ROLE } from '../../../../constants/role'

const CommentsContainer = ({ className, comments, postId }) => {
	const [newComment, setNewComment] = useState('')

	const userId = useSelector(selectUserId)
	const userRole = useSelector(selectUserRole)

	const requestServer = useServerRequest()

	const dispatch = useDispatch()

	const onNewCommentAdd = (userId, postId, content) => {
		dispatch(addCommentAsync(requestServer, userId, postId, content))
		setNewComment('')
	}

	const isGuest = userRole === ROLE.GUEST

	return (
		<div className={className}>
			{!isGuest && (
				<div className='new-comment'>
					<textarea
						name='comment'
						value={newComment}
						placeholder='Комментарий...'
						onChange={({ target }) => setNewComment(target.value)}></textarea>
					<Icon
						id='fa-paper-plane-o'
						margin='0px 0px 0px 10px'
						size='21px'
						onClick={() => onNewCommentAdd(userId, postId, newComment)}
					/>
				</div>
			)}
			<div className='comments'>
				{comments.map(({ id, author, content, publishedAt }) => (
					<Comment
						key={id}
						postId={postId}
						id={id}
						author={author}
						content={content}
						publishedAt={publishedAt}
					/>
				))}
			</div>
		</div>
	)
}

export const Comments = styled(CommentsContainer)`
	width: 580px;
	margin: 20px auto;

	& .new-comment {
		display: flex;
		width: 100%;
		margin: 20px 0 0px;
	}

	& .new-comment textarea {
		resize: none;
		height: 120px;
		font-size: 18px;
		width: 550px;
	}
`
