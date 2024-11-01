import { createAsyncThunk } from '@reduxjs/toolkit'

import { getHeroes } from '@/services/hero-service'

export const fetchHeroes = createAsyncThunk(
	'heroes/fetchHeroes',
	async (values: { page: number; limit: number }, thunkApi) => {
		try {
			const data = await getHeroes(values.page, values.limit)
			return data
		} catch (error: any) {
			return thunkApi.rejectWithValue(error.message)
		}
	}
)
