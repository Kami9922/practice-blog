import styled from 'styled-components'
import { Icon } from '../../../../components/icon/icon'
import { Input } from '../../../../components/input/input'
import { SpecialPanel } from '../special-panel/special-panel'
import { useLayoutEffect, useRef, useState } from 'react'
import { sanitizeContent } from './utils/sanitize-content'
import { useDispatch } from 'react-redux'
import { savePostAsync } from '../../../../actions/save-post-async'
import { useNavigate } from 'react-router-dom'
import { PROP_TYPE } from '../../../../constants/prop-type'

const PostFormContainer = ({
	className,
	post: { id, title, imageUrl, content, publishedAt },
}) => {
	const [imgUrlValue, setImgUrlValue] = useState(imageUrl)
	const [titleValue, setTitleValue] = useState(title)
	const contentRef = useRef(null)

	useLayoutEffect(() => {
		setImgUrlValue(imageUrl)
		setTitleValue(title)
	}, [imageUrl, title])

	const dispatch = useDispatch()
	const navigate = useNavigate()

	const onSave = () => {
		const newContent = sanitizeContent(contentRef.current.innerHTML)

		dispatch(
			savePostAsync(id, {
				imageUrl: imgUrlValue,
				title: titleValue,
				content: newContent,
			})
		).then(({ id }) => navigate(`/post/${id}`))
	}

	const onImgChange = ({ target }) => setImgUrlValue(target.value)
	const onTitleChange = ({ target }) => setTitleValue(target.value)

	return (
		<div className={className}>
			<Input
				value={imgUrlValue}
				placeholder='Изображение...'
				onChange={onImgChange}
			/>
			<Input
				value={titleValue}
				placeholder='Заголовок...'
				onChange={onTitleChange}
			/>
			<SpecialPanel
				id={id}
				publishedAt={publishedAt}
				margin='20px 0'
				editButton={
					<Icon
						id='fa-floppy-o'
						margin='0 10px 0 0'
						size='21px'
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
		min-height: 80px;
		border: 1px solid #000;
	}
`
PostForm.propTypes = {
	post: PROP_TYPE.POST.isRequired,
}
