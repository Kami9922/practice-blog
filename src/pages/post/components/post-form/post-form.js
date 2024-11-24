import styled from 'styled-components'
import { Icon } from '../../../../components/icon/icon'
import { Input } from '../../../../components/input/input'
import { SpecialPanel } from '../special-panel/special-panel'
import { useRef } from 'react'
import { sanitizeContent } from './utils/sanitize-content'
import { useDispatch } from 'react-redux'
import { savePostAsync } from '../../../../actions/save-post-async'
import { useNavigate } from 'react-router-dom'
import { useServerRequest } from '../../../../hooks/use-server-request'

const PostFormContainer = ({
	className,
	post: { id, title, imgUrl, content, publishedAt },
}) => {
	const imgRef = useRef(null)
	const titleRef = useRef(null)
	const contentRef = useRef(null)

	const dispatch = useDispatch()
	const navigate = useNavigate()
	const requestServer = useServerRequest()

	const onSave = () => {
		const newImgUrl = imgRef.current.value
		const newTitle = titleRef.current.value
		const newContent = sanitizeContent(contentRef.current.innerHTML)

		dispatch(
			savePostAsync(requestServer, {
				id,
				imgUrl: newImgUrl,
				title: newTitle,
				content: newContent,
			})
		).then(() => navigate(`/post/${id}`))
	}

	return (
		<div className={className}>
			<Input
				ref={imgRef}
				defaultValue={imgUrl}
				placeholder='Изображение...'
			/>
			<Input
				ref={titleRef}
				defaultValue={title}
				placeholder='Заголовок...'
			/>
			<SpecialPanel
				publishedAt={publishedAt}
				margin='20px 0'
				editButton={
					<Icon
						id='fa-floppy-o'
						size='21px'
						margin='0px 10px 0px 0px'
						onClick={onSave}
					/>
				}
			/>
			<div
				ref={contentRef}
				contentEditable={true}
				suppressContentEditableWarning={true}
				className='post-text'>
				{content}
			</div>
		</div>
	)
}

export const PostForm = styled(PostFormContainer)`
	& img {
		float: left;
		margin: 0 20px 10px 0;
	}

	& .post-text {
		font-size: 18px;
		white-space: pre-line;
	}
`
