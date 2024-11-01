import axios, { CreateAxiosDefaults } from 'axios'

const options: CreateAxiosDefaults = {
	baseURL: process.env.SERVER_URL as string,
	headers: {
		'Content-Type': 'application/json'
	}
}

const optionsWithUpload: CreateAxiosDefaults = {
	baseURL: process.env.SERVER_URL as string,

	headers: {
		'Content-Type': 'multipart/form-data'
	}
}

export const axiosInstance = axios.create(options)
export const axiosInstanceWithUpload = axios.create(optionsWithUpload)
