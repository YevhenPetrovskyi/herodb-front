import { deleteHeroById, fetchHero } from './operations'
import { createSlice } from '@reduxjs/toolkit'

import { IHero } from '@/shared/superhero-interface'

import type { RootState } from '@/store/store'

interface HeroesState {
	item: IHero
	status: 'idle' | 'loading' | 'failed' | 'succeeded'
	error: string | undefined
}

const initialState: HeroesState = {
	item: {} as IHero,
	status: 'idle',
	error: undefined
}

export const heroSlice = createSlice({
	name: 'hero',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(fetchHero.pending, state => {
				state.status = 'loading'
			})
			.addCase(fetchHero.fulfilled, (state, action) => {
				state.status = 'succeeded'
				state.item = action.payload
			})
			.addCase(fetchHero.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.error.message
			})
			.addCase(deleteHeroById.fulfilled, (state, action) => {
				state.status = 'succeeded'
				state.item = {} as IHero
			})
	}
})

export const selectHeroe = (state: RootState) => state.hero.item
export const selectHeroStatus = (state: RootState) => state.hero.status
export const selectHeroError = (state: RootState) => state.hero.error

export default heroSlice.reducer
