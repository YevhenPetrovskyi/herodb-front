import heroSlice from './hero/heroSlice'
import heroesSlice from './heroes/heroesSlice'
import { combineReducers, configureStore } from '@reduxjs/toolkit'

const rootReducer = combineReducers({
	hero: heroSlice,
	heroes: heroesSlice
})

export const makeStore = () => {
	return configureStore({
		reducer: rootReducer
	})
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
