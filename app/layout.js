import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'Ride Request App',
	description:
		'An application allowing users to effortlessly reserve and organize transportation services.',
};

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<head>
				<script
					defer
					src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
				></script>
			</head>
			<body className={inter.className}>
				<Header />
				{children}
			</body>
		</html>
	);
}
