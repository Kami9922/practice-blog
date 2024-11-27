import { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { useServerRequest } from '../../hooks/use-server-request'
import { PostCard } from './components/post-card/post-card'
import { PAGINTATION_LIMIT } from '../../constants/pagination-limit'
import { Pagination } from './components/pagination/pagination'
import { getLastPageFromLinks } from './utils/get-last-page-from-links'
import { Search } from './search'
import { debounce } from './utils/debounce'

const MainContainer = ({ className }) => {
	const [posts, setPosts] = useState([])
	const [page, setPage] = useState(1)
	const [lastPage, setLastPage] = useState(1)
	const [searchPhrase, setSearchPhrase] = useState('')
	const [shouldSearch, setShouldSearch] = useState(false)

	const requestServer = useServerRequest()

	useEffect(() => {
		requestServer('fetchPosts', searchPhrase, page, PAGINTATION_LIMIT).then(
			({ res: { posts, links } }) => {
				setPosts(posts)
				setLastPage(getLastPageFromLinks(links))
			}
		)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [requestServer, page, shouldSearch])

	const startDelayedSearch = useMemo(() => debounce(setShouldSearch, 2000), [])

	const onSearch = ({ target }) => {
		setSearchPhrase(target.value)
		startDelayedSearch(!shouldSearch)
	}

	return (
		<div className={className}>
			<div className='posts-and-search'>
				<Search
					searchPhrase={searchPhrase}
					onChange={onSearch}
				/>
				{posts.length > 0 ? (
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
				) : (
					<div className='no-posts-found'>Статьи не найдены</div>
				)}
			</div>
			{lastPage > 1 && posts.length > 0 && (
				<Pagination
					page={page}
					lastPage={lastPage}
					setPage={setPage}
				/>
			)}
		</div>
	)
}

export const Main = styled(MainContainer)`
	& .post-list {
		display: flex;
		flex-wrap: wrap;
		padding: 20px 20px 80px;
	}
	& .posts-and-search {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	& .no-posts-found {
		text-align: center;
		font-size: 18px;
		margin-top: 40px;
	}
`
