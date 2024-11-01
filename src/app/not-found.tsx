'use client'

import Link from 'next/link'

export default function NotFound() {
	return (
		<div className='flex flex-col items-center justify-center w-full h-full'>
			<h1>404</h1>
			<p>
				<Link href='/'>Go back home</Link>
			</p>
		</div>
	)
}
