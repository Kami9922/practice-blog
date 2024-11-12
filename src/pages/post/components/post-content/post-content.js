import styled from 'styled-components'
import { H2 } from '../../../../components/h2/h2'

const PostContentContainer = ({
	className,
	post: { id, title, imgUrl, content, publishedAt },
}) => {
	return (
		<div className={className}>
			<img
				src={imgUrl}
				alt={title}
			/>
			<H2>{title}</H2>
			<div className='special-panel'>{publishedAt}</div>
			<div>{content}</div>
		</div>
	)
}

export const PostContent = styled(PostContentContainer)``
