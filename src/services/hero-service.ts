import { IHero, IHeroes } from '@/shared/superhero-interface'

import { axiosInstance, axiosInstanceWithUpload } from '../api/api-instance'

export const getHeroes = async (page: number, limit: number) => {
	const { data } = await axiosInstance<IHeroes>({
		params: {
			page,
			limit
		},
		url: '/heroes',
		method: 'GET'
	})

	return data
}

export const getHeroById = async (id: string) => {
	const { data } = await axiosInstance<IHero>({
		url: `/heroes/${id}`,
		method: 'GET'
	})

	return data
}

export const createSuperhero = async (formData: FormData) => {
	const { data } = await axiosInstanceWithUpload<IHero>({
		url: '/heroes',
		method: 'POST',
		data: formData
	})

	return data
}

export const updateSuperhero = async (formData: FormData, id: number) => {
	const { data } = await axiosInstanceWithUpload<IHero>({
		url: `/heroes/${id}`,
		method: 'PUT',
		data: formData
	})

	return data
}

export const deleteHero = async (id: string) => {
	const { data } = await axiosInstance<IHero>({
		url: `/heroes/${id}`,
		method: 'DELETE'
	})

	return data
}
