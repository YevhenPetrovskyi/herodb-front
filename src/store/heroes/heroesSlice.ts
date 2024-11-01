import { fetchHeroes } from './operations'
import { createSlice } from '@reduxjs/toolkit'

import { IHero } from '@/shared/superhero-interface'

import type { RootState } from '@/store/store'

interface HeroesState {
	items: IHero[]
	status: 'idle' | 'loading' | 'failed' | 'succeeded'
	error: string | undefined
	totalPages: number
}

const initialState: HeroesState = {
	items: [],
	status: 'idle',
	error: undefined,
	totalPages: 0
}

export const heroesSlice = createSlice({
	name: 'heroes',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(fetchHeroes.pending, state => {
				state.status = 'loading'
			})
			.addCase(fetchHeroes.fulfilled, (state, action) => {
				state.status = 'succeeded'
				state.items = action.payload.heroes
				state.totalPages = action.payload.totalPages
			})
			.addCase(fetchHeroes.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.error.message
			})
	}
})

export const selectHeroes = (state: RootState) => state.heroes.items
export const selectTotalPages = (state: RootState) => state.heroes.totalPages
export const selectHeroesStatus = (state: RootState) => state.heroes.status
export const selectHeroesError = (state: RootState) => state.heroes.error

export default heroesSlice.reducer
