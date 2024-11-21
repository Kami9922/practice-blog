import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { server } from '../../bff/server'
import { useState } from 'react'
import styled from 'styled-components'
import { Input } from '../../components/input/input'
import { Button } from '../../components/button/button'
import { Link, Navigate } from 'react-router-dom'
import { H2 } from '../../components/h2/h2'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../../actions/set-user'
import { selectUserRole } from '../../selectors/select-user-role'
import { ROLE } from '../../constants/role'
import { AuthFormError } from '../../components/auth-form-error/auth-form-error'
import { useResetForm } from '../../hooks/use-reset-form'

const authFormSchema = yup.object().shape({
	login: yup
		.string()
		.required('Заполните логин')
		.matches(/^\w+$/, 'Неверный логин. Допускаются только буквы и цифры')
		.min(3, 'Неверный логин. Минимум 3 символа')
		.max(15, 'Неверный логин. Максмиум 15 символов'),
	password: yup
		.string()
		.required('Заполните пароль')
		.matches(
			/^[\w#%]+$/,
			'Неверный пароль. Допускаются  буквы, цифры и знаки % #'
		)
		.min(6, 'Неверный пароль. Минимум 6 символов')
		.max(30, 'Неверный пароль. Максиум 30 символов'),
})

const StyledLink = styled(Link)`
	text-align: center;
	text-decoration: underline;
	margin: 20px 0;
	font-size: 18px;
`

const AuthorizationContainer = ({ className }) => {
	const dispatch = useDispatch()

	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
		},
		resolver: yupResolver(authFormSchema),
	})

	const [serverError, setServerError] = useState(null)

	const roleId = useSelector(selectUserRole)

	useResetForm(reset)

	const onSubmit = ({ login, password }) => {
		server.authorize(login, password).then(({ error, res }) => {
			if (error) {
				setServerError(`Ошибка запроса: ${error}`)
				return
			}

			dispatch(setUser(res))
			sessionStorage.setItem('userData', JSON.stringify(res))
		})
	}

	const formError = errors?.login?.message || errors?.password?.message
	const errorMessage = formError || serverError

	if (roleId !== ROLE.GUEST) {
		return <Navigate to='/'></Navigate>
	}

	return (
		<div className={className}>
			<H2>Авторизация</H2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input
					type='text'
					placeholder='Логин...'
					{...register('login', {
						onChange: () => setServerError(null),
					})}
				/>
				<Input
					type='password'
					placeholder='Пароль...'
					{...register('password', {
						onChange: () => setServerError(null),
					})}
				/>
				<Button
					type='submit'
					disabled={!!formError}>
					Авторизоваться
				</Button>
				{errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
				<StyledLink to='/register'>Регистрация</StyledLink>
			</form>
		</div>
	)
}

export const Authorization = styled(AuthorizationContainer)`
	display: flex;
	align-items: center;
	flex-direction: column;

	& > form {
		width: 260px;
		display: flex;
		flex-direction: column;
	}
`
