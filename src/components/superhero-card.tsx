import { ImageGallery } from './image-gallery'
import { Button } from './ui/button'
import Link from 'next/link'

import { IHeroImage } from '@/shared/superhero-interface'

interface SuperheroCardProps {
	nickname: string
	images: IHeroImage[]
	id: number
}

export const SuperheroCard = ({ nickname, images, id }: SuperheroCardProps) => {
	return (
		<div className='flex flex-col items-center justify-center aspect-[3/4] w-full max-w-lg p-10 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
			<ImageGallery images={images} />
			<h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
				{nickname}
			</h5>
			<Button>
				<Link href={`/superhero/${id}`}>Learn more</Link>
			</Button>
		</div>
	)
}
