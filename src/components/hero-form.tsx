import { Hint } from './hint'
import { Button } from './ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from './ui/card'
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from './ui/form'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { FormSchema } from '@/validators/formSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { XIcon } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

import { Form } from '@/components/ui/form'

import { useConfirm } from '@/hooks/use-confirm'

import { selectHeroStatus } from '@/store/hero/heroSlice'
import { createHero } from '@/store/hero/operations'
import { useAppDispatch, useAppSelector } from '@/store/hooks'

type ImageWithId = {
	file: File
	id: string
}

export const HeroForm = () => {
	const router = useRouter()
	const dispatch = useAppDispatch()

	const [images, setImages] = useState<ImageWithId[]>([])
	const [isDragging, setIsDragging] = useState(false)
	const imageElementRef = useRef<HTMLInputElement>(null)

	const [ConfirmDialog, confirm] = useConfirm(
		'Are you sure you want to exit?',
		'The entered data will not be saved'
	)

	const status = useAppSelector(selectHeroStatus)
	const isLoading = status === 'loading'

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			nickname: '',
			real_name: '',
			origin_description: '',
			superpowers: '',
			catch_phrase: ''
		}
	})

	useEffect(() => {
		const handleDocumentDragOver = (event: DragEvent) => {
			event.preventDefault()
		}
		const handleDocumentDrop = (event: DragEvent) => {
			event.preventDefault()
		}

		document.addEventListener('dragover', handleDocumentDragOver)
		document.addEventListener('drop', handleDocumentDrop)

		return () => {
			document.removeEventListener('dragover', handleDocumentDragOver)
			document.removeEventListener('drop', handleDocumentDrop)
		}
	}, [])

	const uploadImage = (newFiles: FileList) => {
		const newImages = Array.from(newFiles).map(file => ({
			file,
			id: `${file.name}-${Date.now()}-${Math.random()}`
		}))
		setImages(prevImages => [...prevImages, ...newImages])
	}

	const removeImage = (id: string) => {
		setImages(prevImages => prevImages.filter(img => img.id !== id))
	}

	const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault()
		setIsDragging(false)
		if (event.dataTransfer.files) {
			uploadImage(event.dataTransfer.files)
		}
	}

	const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault()
		setIsDragging(true)
	}

	const handleDragLeave = () => {
		setIsDragging(false)
	}

	const handleCancel = async () => {
		const ok = await confirm()

		if (!ok) {
			return
		}

		form.reset()

		if (imageElementRef.current) {
			imageElementRef.current.value = ''
			setImages([])
		}
	}

	const onSubmit = (values: z.infer<typeof FormSchema>) => {
		const formData = new FormData()

		formData.append('nickname', values.nickname)
		formData.append('real_name', values.real_name)
		formData.append('origin_description', values.origin_description)
		formData.append('superpowers', values.superpowers)
		formData.append('catch_phrase', values.catch_phrase || '')

		images.forEach(f => {
			formData.append('pictures', f.file)
		})

		dispatch(createHero(formData))
			.unwrap()
			.then(data => {
				toast.success('Hero created successfully')
				router.push(`/superhero/${data.id}`)
			})
	}
	return (
		<>
			<ConfirmDialog />
			<Card className='w-[600px] shadow-md mb-10'>
				<CardHeader>
					<CardTitle>Create Hero</CardTitle>
					<CardDescription>You can create a new hero</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form
							id='hero-form'
							onSubmit={form.handleSubmit(onSubmit)}
						>
							<FormField
								control={form.control}
								name='nickname'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Hero nickname</FormLabel>
										<FormControl>
											<Input
												{...field}
												placeholder='Nickname'
												type='text'
												disabled={isLoading}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='real_name'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Hero real name</FormLabel>
										<FormControl>
											<Input
												{...field}
												placeholder='Real name'
												type='text'
												disabled={isLoading}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='origin_description'
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											Origin description
										</FormLabel>
										<FormControl>
											<Textarea
												{...field}
												placeholder='Origin description...'
												disabled={isLoading}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='superpowers'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Superpowers</FormLabel>
										<FormControl>
											<Textarea
												{...field}
												placeholder='Superpowers...'
												disabled={isLoading}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='catch_phrase'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Catch phrase</FormLabel>
										<FormControl>
											<Textarea
												{...field}
												placeholder='Catch phrase...'
												disabled={isLoading}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</form>
					</Form>

					<div className='mt-4'>
						{images.length > 0 && (
							<div className='p-2 flex flex-wrap gap-2'>
								{images.map(({ file, id }) => (
									<div
										key={id}
										className='relative size-[100px] flex items-center justify-center group/image'
									>
										<Hint label='Remove image'>
											<button
												onClick={() => removeImage(id)}
												className='hidden group-hover/image:flex rounded-full bg-black/70 hover:bg-black absolute -top-2.5 -right-2.5 text-white size-6 z-[4] border-2 border-white items-center justify-center'
											>
												<XIcon className='size-3.5' />
											</button>
										</Hint>
										<Image
											src={URL.createObjectURL(file)}
											alt='Uploaded'
											fill
											className='rounded-xl overflow-hidden border object-cover'
										/>
									</div>
								))}
							</div>
						)}
						<input
							type='file'
							multiple
							accept='image/*'
							ref={imageElementRef}
							onChange={event => {
								if (event.target.files) {
									uploadImage(event.target.files)
									event.target.value = ''
								}
							}}
							className='hidden'
							disabled={isLoading}
						/>

						<div
							onDrop={handleDrop}
							onDragOver={handleDragOver}
							onDragLeave={handleDragLeave}
							className={`mt-4 border-2 border-dashed p-4 rounded-lg text-center ${
								isDragging
									? 'border-blue-500 bg-blue-100'
									: 'border-gray-300'
							}`}
						>
							<p className='mb-2'>Drag & drop files here, or</p>
							<Button
								onClick={() => imageElementRef.current?.click()}
								disabled={isLoading}
							>
								Upload
							</Button>
						</div>
					</div>
				</CardContent>
				<CardFooter className='flex items-center justify-between'>
					<Button
						variant='destructive'
						disabled={isLoading}
						onClick={handleCancel}
					>
						Cancel
					</Button>
					<Button type='submit' form='hero-form' disabled={isLoading}>
						Create
					</Button>
				</CardFooter>
			</Card>
		</>
	)
}
