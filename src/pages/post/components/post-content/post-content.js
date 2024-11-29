import styled from 'styled-components'
import { H2 } from '../../../../components/h2/h2'
import { Icon } from '../../../../components/icon/icon'
import { SpecialPanel } from '../special-panel/special-panel'
import { useNavigate } from 'react-router-dom'
import { PROP_TYPE } from '../../../../constants/prop-type'

const PostContentContainer = ({
	className,
	post: { id, title, imgUrl, content, publishedAt },
}) => {
	const navigate = useNavigate()

	return (
		<div className={className}>
			<img
				src={imgUrl}
				alt={title}
			/>
			<H2>{title}</H2>
			<SpecialPanel
				id={id}
				publishedAt={publishedAt}
				margin='-20px 0 20px'
				editButton={
					<Icon
						id='fa-pencil-square-o'
						margin='0px 10px 0px 0px'
						size='21px'
						onClick={() => navigate(`/post/${id}/edit`)}
					/>
				}
			/>
			<div className='post-text'>{content}</div>
		</div>
	)
}

export const PostContent = styled(PostContentContainer)`
	& img {
		float: left;
		margin: 0 20px 10px 0;
	}

	& .post-text {
		font-size: 18px;
		white-space: pre-line;
	}
`
PostContent.propTypes = {
	post: PROP_TYPE.POST.isRequired,
}
