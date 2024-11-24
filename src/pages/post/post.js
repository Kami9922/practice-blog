import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { PostContent } from './components/post-content/post-content'
import { Comments } from './components/comments/comments'
import { useMatch, useParams } from 'react-router-dom'
import { loadPostAsync } from '../../actions/load-post-async'
import { useServerRequest } from '../../hooks/use-server-request'
import { selectPost } from '../../selectors/select-post'
import { PostForm } from './components/post-form/post-form'

const PostContainer = ({ className }) => {
	const post = useSelector(selectPost)
	const dispatch = useDispatch()
	const params = useParams()
	const isEditing = useMatch('/post/:id/edit')
	const requestServer = useServerRequest()

	useEffect(() => {
		dispatch(loadPostAsync(requestServer, params.id))
	}, [params.id, requestServer, dispatch])

	return (
		<div className={className}>
			{isEditing ? (
				<PostForm post={post} />
			) : (
				<>
					<PostContent post={post} />
					<Comments
						comments={post.comments}
						postId={post.id}
					/>
				</>
			)}
		</div>
	)
}

export const Post = styled(PostContainer)`
	margin: 40px 0;
	padding: 0px 80px;
`
