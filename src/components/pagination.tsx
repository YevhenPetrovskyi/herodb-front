import { Button } from './ui/button'

interface PaginationProps {
	currentPage: number
	totalPages: number
	onPageChange: (page: number) => void
}

export const Pagination = ({
	currentPage,
	totalPages,
	onPageChange
}: PaginationProps) => {
	const handlePageChange = (page: number) => {
		if (page >= 1 && page <= totalPages) {
			onPageChange(page)
		}
	}

	return (
		<div className='flex items-center space-x-2'>
			<Button
				onClick={() => handlePageChange(currentPage - 1)}
				disabled={currentPage === 1}
			>
				Prev
			</Button>

			<span>
				Page {currentPage} of {totalPages}
			</span>

			<Button
				onClick={() => handlePageChange(currentPage + 1)}
				disabled={currentPage === totalPages}
			>
				Next
			</Button>
		</div>
	)
}
