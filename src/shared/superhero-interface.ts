export interface IHeroImage {
	id: number
	name: string
	url: string
	hero_id: number
}

export interface IHero {
	id: number
	nickname: string
	real_name: string
	origin_description: string
	superpowers: string
	catch_phrase?: string | null
	pictures: IHeroImage[]
}

export interface IHeroes {
	totalPages: number
	heroes: IHero[]
}
