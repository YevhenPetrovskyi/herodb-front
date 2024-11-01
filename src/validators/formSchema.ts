import { z } from 'zod'

export const FormSchema = z.object({
	nickname: z
		.string()
		.max(20, 'Maximum 20 characters')
		.min(1, 'Field is required'),
	real_name: z
		.string()
		.max(20, 'Maximum 20 characters')
		.min(1, 'Field is required'),
	origin_description: z
		.string()
		.max(3000, 'Maximum 3000 characters')
		.min(1, 'Field is required'),
	superpowers: z
		.string()
		.max(300, 'Maximum 3000 characters')
		.min(1, 'Field is required'),
	catch_phrase: z.string().max(3000, 'Maximum 3000 characters').optional()
})
