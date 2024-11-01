'use client'

import { Loader } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { SuperheroCard } from '@/components/superhero-card'

import { fetchHeroes } from '@/store/heroes/operations'
import { useAppDispatch } from '@/store/hooks'

import {
	selectHeroes,
	selectHeroesError,
	selectHeroesStatus,
	selectTotalPages
} from '../store/heroes/heroesSlice'

export default function Home() {
	const dispatch = useAppDispatch()

	const [page, setPage] = useState(1)

	const status = useSelector(selectHeroesStatus)
	const totalPages = useSelector(selectTotalPages)
	const error = useSelector(selectHeroesError)
	const heroes = useSelector(selectHeroes)

	useEffect(() => {
		dispatch(fetchHeroes({ page, limit: 5 }))
	}, [page, dispatch])

	useEffect(() => {
		localStorage.setItem('page', String(page))
	}, [page])

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

	return (
		<div className='mb-5'>
			<div className='flex flex-wrap items-center justify-center gap-10'>
				{heroes.map(superhero => (
					<SuperheroCard
						key={superhero.id}
						id={superhero.id}
						nickname={superhero.nickname}
						images={superhero.pictures}
					/>
				))}
			</div>
		</div>
	)
}
