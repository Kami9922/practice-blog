import { Route, Routes } from 'react-router-dom'
import './App.css'
import styled from 'styled-components'
import { Header } from './components/header/header'
import { Footer } from './components/footer/footer'
import { Authorization } from './pages/authorization/authorization'
import { Registration } from './pages/registration/registration'
import { Users } from './pages/users/users'
import { Post } from './pages/post/post'
import { useLayoutEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from './actions/set-user'

const Page = styled.div`
	padding: 120px 0 20px;
`
// const H2 = styled.h2`
// 	text-align: center;
// `
const AppColumn = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 1000px;
	min-height: 100%;
	background-color: #fff;
	margin: 0 auto;
`

const App = () => {
	const dispatch = useDispatch()

	useLayoutEffect(() => {
		const currentUserDataJSON = sessionStorage.getItem('userData')

		if (!currentUserDataJSON) {
			return
		}

		const currentUserData = JSON.parse(currentUserDataJSON)

		dispatch(
			setUser({
				...currentUserData,
				roleId: Number(currentUserData.roleId),
			})
		)
	}, [dispatch])

	return (
		<AppColumn>
			<Header />
			<Page>
				<Routes>
					<Route
						path='/'
						element={<div>Главная страницы</div>}
					/>
					<Route
						path='/login'
						element={<Authorization />}
					/>
					<Route
						path='/register'
						element={<Registration />}
					/>
					<Route
						path='/users'
						element={<Users />}
					/>
					<Route
						path='/post'
						element={<div>Новая статья</div>}
					/>
					<Route
						path='/post/:id'
						element={<Post />}
					/>
					<Route
						path='*'
						element={<div>Ошибка</div>}
					/>
				</Routes>
			</Page>
			<Footer />
		</AppColumn>
	)
}

export default App
