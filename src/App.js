import { Route, Routes } from 'react-router-dom'
import './App.css'
import styled from 'styled-components'
import { Header } from './components/header/header'
import { Footer } from './components/footer/footer'
import { Authorization } from './pages/authorization/authorization'

const Content = styled.div`
	padding: 120px 0;
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
	return (
		<AppColumn>
			<Header />
			<Content>
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
						element={<div>Регистрация</div>}
					/>
					<Route
						path='/users'
						element={<div>Пользователи</div>}
					/>
					<Route
						path='/post'
						element={<div>Новая статья</div>}
					/>
					<Route
						path='/post/:postId'
						element={<div>Статья</div>}
					/>
					<Route
						path='*'
						element={<div>Ошибка</div>}
					/>
				</Routes>
			</Content>
			<Footer />
		</AppColumn>
	)
}

export default App
