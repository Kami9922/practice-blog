import styled from 'styled-components'
import { H2 } from '../../../../components/h2/h2'
import { Icon } from '../../../../components/icon/icon'

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
			<div className='special-panel'>
				<div className='published-at'>
					<Icon
						id='fa-calendar-o'
						margin='0px 10px 0px 0px'
						size='18px'
						onClick={() => {}}
					/>
					{publishedAt}
				</div>
				<div className='buttons'>
					<Icon
						id='fa-pencil-square-o'
						margin='0px 20px 0px 0px'
						size='21px'
						onClick={() => {}}
					/>
					<Icon
						id='fa-trash-o'
						size='21px'
						onClick={() => {}}
					/>
				</div>
			</div>
			<div className='post-text'>{content}</div>
		</div>
	)
}

export const PostContent = styled(PostContentContainer)`
	& img {
		float: left;
		margin: 0 20px 10px 0;
	}

	& .special-panel {
		display: flex;
		justify-content: space-between;
		margin: -20px 0 20px;
	}

	& .published-at {
		display: flex;
		font-size: 18px;
	}

	& i {
		position: relative;
		top: -1px;
	}

	& .buttons {
		display: flex;
	}

	& .post-text {
		font-size: 18px;
	}
`
