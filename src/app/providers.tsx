'use client'

import { type PropsWithChildren } from 'react'
import { Toaster } from 'sonner'

export function Providers({ children }: PropsWithChildren) {
	return (
		<div className='flex flex-col'>
			<Toaster />
			{children}
		</div>
	)
}
