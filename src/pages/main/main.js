import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useServerRequest } from '../../hooks/use-server-request'
import { PostCard } from './components/post-card/post-card'

const MainContainer = ({ className }) => {
	const [posts, setPosts] = useState([])
	const requestServer = useServerRequest()

	useEffect(() => {
		requestServer('fetchPosts').then((posts) => {
			console.log('useEffect', posts.res)
			setPosts(posts.res)
		})
	}, [requestServer])
	console.log(posts)
	return (
		<div className={className}>
			<div className='post-list'>
				{posts.map(({ id, title, imgUrl, publishedAt, commentsCount }) => (
					<PostCard
						key={id}
						id={id}
						title={title}
						imgUrl={imgUrl}
						publishedAt={publishedAt}
						commentsCount={commentsCount}
					/>
				))}
			</div>
		</div>
	)
}

export const Main = styled(MainContainer)`
	& .post-list {
		display: flex;
		flex-wrap: wrap;
		padding: 20px;
	}
`
