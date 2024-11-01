import StoreProvider from './StoreProvide'
import './globals.css'
import { Providers } from './providers'
import type { Metadata } from 'next'
import localFont from 'next/font/local'

import { Header } from '@/components/header'

import { SITE_DESCRIPTION, SITE_NAME } from '@/constants/seo-constants'

const geistSans = localFont({
	src: './fonts/GeistVF.woff',
	variable: '--font-geist-sans',
	weight: '100 900'
})
const geistMono = localFont({
	src: './fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
	weight: '100 900'
})

export const metadata: Metadata = {
	title: SITE_NAME,
	description: SITE_DESCRIPTION
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}
			>
				<StoreProvider>
					<Header />
					<Providers>{children}</Providers>
				</StoreProvider>
			</body>
		</html>
	)
}
