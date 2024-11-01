'use client'

import { Loader } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { ImageGallery } from '@/components/image-gallery'
import { Thumbnail } from '@/components/thumbnail'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/card'

import { useHeroId } from '@/hooks/use-hero-id'

import {
	selectHeroError,
	selectHeroStatus,
	selectHeroe
} from '@/store/hero/heroSlice'
import { fetchHero } from '@/store/hero/operations'
import { useAppDispatch } from '@/store/hooks'

export default function Superhero() {
	const router = useRouter()
	const heroId = useHeroId()
	const dispatch = useAppDispatch()

	const status = useSelector(selectHeroStatus)
	const error = useSelector(selectHeroError)
	const hero = useSelector(selectHeroe)

	useEffect(() => {
		if (heroId) {
			dispatch(fetchHero(heroId as string))
		}
	}, [dispatch, heroId])

	if (!hero || error) {
		return (
			<div className='flex flex-col items-center gap-3'>
				<p className='text-red-500 text-xl'>Hero not found</p>
				<Button>
					<Link href='/'>Back to homepage</Link>
				</Button>
			</div>
		)
	}

	if (status === 'loading') {
		return (
			<div className='flex items-center justify-center'>
				<Loader className='size-20 animate-spin text-indigo-500' />
			</div>
		)
	}

	return (
		<div className='flex items-center justify-center mb-9'>
			<Card>
				<CardHeader>
					<div className='flex justify-center items-center'>
						{hero.pictures ? (
							<ImageGallery images={hero.pictures} />
						) : (
							<Thumbnail url='@/images/hero.jpg' />
						)}
					</div>
					<CardTitle>{hero.nickname}</CardTitle>
					<CardDescription>{hero.real_name}</CardDescription>
				</CardHeader>
				<CardContent>
					<div className='flex flex-col gap-2'>
						<div>
							<h3>Hero description:</h3>
							<p className='text-sm'>{hero.origin_description}</p>
						</div>
						<div>
							<h3>Hero appearance:</h3>
							<p className='text-sm'>{hero.superpowers}</p>
						</div>
						{hero.catch_phrase && (
							<div>
								<h3>Catch phrase:</h3>
								<p className='text-sm'>{hero.catch_phrase}</p>
							</div>
						)}
					</div>
				</CardContent>
				<CardFooter className='flex justify-between'>
					<Button>Edit</Button>
					<Button variant='destructive'>Delete</Button>
				</CardFooter>
			</Card>
		</div>
	)
}
