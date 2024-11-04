'use client'

import { Loader } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { Pagination } from '@/components/pagination'
import { SuperheroCard } from '@/components/superhero-card'
import { Button } from '@/components/ui/button'

import { fetchHeroes } from '@/store/heroes/operations'
import { useAppDispatch, useAppSelector } from '@/store/hooks'

import {
	selectHeroes,
	selectHeroesError,
	selectHeroesStatus,
	selectTotalPages
} from '../store/heroes/heroesSlice'

export default function Home() {
	const dispatch = useAppDispatch()

	const PAGE_LIMIT = 5

	const [page, setPage] = useState(1)

	const status = useAppSelector(selectHeroesStatus)
	const totalPages = useAppSelector(selectTotalPages)
	const error = useAppSelector(selectHeroesError)
	const heroes = useAppSelector(selectHeroes)

	useEffect(() => {
		dispatch(fetchHeroes({ page, limit: PAGE_LIMIT }))
	}, [page, dispatch])

	if (status === 'loading') {
		return (
			<div className='flex items-center justify-center'>
				<Loader className='size-20 animate-spin text-indigo-500' />
			</div>
		)
	}

	if (status === 'failed') {
		return (
			<div className='flex items-center justify-center'>
				<p className='text-red-500 font-semibold'>{error}</p>
			</div>
		)
	}

	if (heroes.length === 0) {
		return (
			<div className='flex flex-col items-center justify-center gap-4'>
				<p>No heroes found. You can create one</p>
				<Link href='/create-superhero'>
					<Button>Create Superhero</Button>
				</Link>
			</div>
		)
	}

	return (
		<div className='mb-5 flex flex-col items-center'>
			<div className='flex flex-wrap items-center justify-center gap-10 mb-10'>
				{heroes.map(superhero => (
					<SuperheroCard
						key={superhero.id}
						id={superhero.id}
						nickname={superhero.nickname}
						images={superhero.pictures}
					/>
				))}
			</div>

			{totalPages > 1 && (
				<Pagination
					currentPage={page}
					totalPages={totalPages}
					onPageChange={setPage}
				/>
			)}
		</div>
	)
}
