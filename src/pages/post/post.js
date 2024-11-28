import React, { useEffect, useLayoutEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { PostContent } from './components/post-content/post-content'
import { Comments } from './components/comments/comments'
import { useMatch, useParams } from 'react-router-dom'
import { loadPostAsync } from '../../actions/load-post-async'
import { useServerRequest } from '../../hooks/use-server-request'
import { selectPost } from '../../selectors/select-post'
import { PostForm } from './components/post-form/post-form'
import { RESET_POST_DATA } from '../../actions/reset-post-data'
import { Error } from '../../components/error/error'
import { PrivateContent } from '../../components/private-content/private-content'
import { ROLE } from '../../constants/role'

const PostContainer = ({ className }) => {
	const [error, setError] = useState(null)
	const [isLoading, setIsLoading] = useState(true)
	const post = useSelector(selectPost)
	const dispatch = useDispatch()
	const params = useParams()
	const isEditing = !!useMatch('/post/:id/edit')
	const isCreating = !!useMatch('/post')
	const requestServer = useServerRequest()

	useLayoutEffect(() => {
		dispatch(RESET_POST_DATA)
	}, [dispatch, isCreating])

	useEffect(() => {
		if (isCreating) {
			setIsLoading(false)
			return
		}

		dispatch(loadPostAsync(requestServer, params.id)).then((postData) => {
			setError(postData.error)
			setIsLoading(false)
		})
	}, [params.id, requestServer, dispatch, isCreating])

	if (isLoading) {
		return null
	}

	const SpecificPostPage =
		isCreating || isEditing ? (
			<PrivateContent
				serverError={error}
				access={[ROLE.ADMIN]}>
				<div className={className}>
					<PostForm post={post} />
				</div>
			</PrivateContent>
		) : (
			<>
				<div className={className}>
					<PostContent post={post} />
					<Comments
						comments={post.comments}
						postId={post.id}
					/>
				</div>
			</>
		)

	return error ? <Error error={error} /> : SpecificPostPage
}

export const Post = styled(PostContainer)`
	margin: 40px 0;
	padding: 0px 80px;
`
