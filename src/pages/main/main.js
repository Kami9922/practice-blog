import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useServerRequest } from '../../hooks/use-server-request'
import { PostCard } from './components/post-card/post-card'
import { PAGINTATION_LIMIT } from '../../constants/pagination-limit'
import { Pagination } from './components/pagination/pagination'

const MainContainer = ({ className }) => {
	const [posts, setPosts] = useState([])
	const [page, setPage] = useState(1)
	const requestServer = useServerRequest()

	useEffect(() => {
		requestServer('fetchPosts', page, PAGINTATION_LIMIT).then((posts) => {
			setPosts(posts.res)
		})
	}, [requestServer, page])
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
			<Pagination
				page={page}
				setPage={setPage}
			/>
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
