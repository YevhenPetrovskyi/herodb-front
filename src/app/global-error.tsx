'use client'

import { Button } from '@/components/ui/button'

interface GlobalErrorProps {
	error: Error
	reset: () => void
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
	return (
		<html>
			<body>
				<div className='flex items-center justify-center w-full h-full'>
					<h1 className='text-red-500'>{`Global Error ${error.message}`}</h1>
					<Button onClick={() => reset()}>Try again</Button>
				</div>
			</body>
		</html>
	)
}
