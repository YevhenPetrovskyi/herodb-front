import { useParams } from 'next/navigation'

export const useHeroId = () => {
	const { heroId } = useParams()
	return heroId
}
