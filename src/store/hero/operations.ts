import { createAsyncThunk } from '@reduxjs/toolkit'

import {
	createSuperhero,
	deleteHero,
	getHeroById
} from '@/services/hero-service'

export const fetchHero = createAsyncThunk(
	'hero/fetchHero',
	async (id: string, thunkApi) => {
		try {
			const data = await getHeroById(id)
			return data
		} catch (error: any) {
			return thunkApi.rejectWithValue(error.message)
		}
	}
)

export const deleteHeroById = createAsyncThunk(
	'hero/deleteHero',
	async (id: string, thunkApi) => {
		try {
			const data = await deleteHero(id)

			return data
		} catch (error: any) {
			return thunkApi.rejectWithValue(error.message)
		}
	}
)

export const createHero = createAsyncThunk(
	'hero/createHero',
	async (formData: FormData, thunkApi) => {
		try {
			const data = await createSuperhero(formData)
			return data
		} catch (error: any) {
			return thunkApi.rejectWithValue(error.message)
		}
	}
)
