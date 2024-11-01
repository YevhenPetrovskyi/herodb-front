import { Thumbnail } from './thumbnail'

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious
} from '@/components/ui/carousel'

import { IHeroImage } from '@/shared/superhero-interface'

import unknownHero from '../../public/unknown-hero.jpg'

interface ImageGalleryProps {
	images: IHeroImage[] | null
}

export function ImageGallery({ images }: ImageGalleryProps) {
	if (!images || images.length === 0) {
		return (
			<div className='w-full max-w-md overflow-hidden'>
				<Thumbnail url={unknownHero.src} />
			</div>
		)
	}

	return (
		<Carousel className='w-full max-w-md'>
			<CarouselContent>
				{images.map(image => (
					<CarouselItem key={image.id}>
						<Thumbnail url={image.url} />
					</CarouselItem>
				))}
			</CarouselContent>
			{images.length > 1 && (
				<>
					<CarouselPrevious />
					<CarouselNext />
				</>
			)}
		</Carousel>
	)
}
