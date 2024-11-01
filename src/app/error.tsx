'use client'

import { Button } from '@/components/ui/button'

interface ErrorProps {
	error: Error
	reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
	return (
		<div className='flex items-center justify-center'>
			<p className='text-red-500'>{`Something went wrong. ${error.message}`}</p>
			<Button onClick={() => reset()}>Try again</Button>
		</div>
	)
}
