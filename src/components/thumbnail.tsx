/* eslint-disable @next/next/no-img-element */
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog'

interface ThumbnailProps {
	url: string
}

export const Thumbnail = ({ url }: ThumbnailProps) => {
	return (
		<Dialog>
			<DialogTrigger>
				<DialogDescription className='sr-only'>
					Click to zoom in
				</DialogDescription>
				<div className='relative overflow-hidden my-2 cursor-zoom-in h-[500px]'>
					<img
						src={url}
						alt='hero image'
						className='object-cover size-full'
					/>
				</div>
			</DialogTrigger>
			<DialogContent className='max-w-[500px] border-none bg-transparent p-0 shadow-none'>
				<DialogTitle className='sr-only'>Hero Image</DialogTitle>
				<img
					src={url}
					alt='hero image'
					className='rounded-md object-cover size-full'
					width={800}
					height={800}
				/>
			</DialogContent>
		</Dialog>
	)
}
