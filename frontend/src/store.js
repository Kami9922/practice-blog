import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { thunk } from 'redux-thunk'
import { usersReducer } from './reducers/users-reducer'
import { userReducer } from './reducers/user-reducer'
import { postReducer } from './reducers/post-reducer'
import { postsReducer } from './reducers/posts-reducer'
import { appReducer } from './reducers/app-reducer'

const composeEnchancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const reducer = combineReducers({
	app: appReducer,
	user: userReducer,
	users: usersReducer,
	post: postReducer,
	posts: postsReducer,
})

export const store = createStore(
	reducer,
	composeEnchancers(applyMiddleware(thunk))
)
