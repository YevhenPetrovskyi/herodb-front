import { Hint } from './hint'
import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export const Header = () => {
	return (
		<header className='flex items-baseline justify-between p-5 mb-5 bg-indigo-500 '>
			<Link href='/'>
				<Hint label='Home'>
					<Image
						src={'/logo.png'}
						alt='logo'
						width={60}
						height={60}
					/>
				</Hint>
			</Link>
			<Link
				href='/create-superhero'
				className='flex items-center text-white hover:underline'
			>
				Create Superhero
				<ChevronRight className='ml-2 h-4 w-4' />
			</Link>
		</header>
	)
}
