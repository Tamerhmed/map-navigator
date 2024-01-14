import Image from 'next/image';
import FetchServer from './FetchServer';
import Link from 'next/link';

export default function Home() {
	return (
		<main className='flex items-center justify-center h-80'>
			<Link
				href={'/request'}
				className='bg-blue-600 px-6 py-2 text-white font-bold rounded-2xl'
			>
				Make a trip request
			</Link>
		</main>
	);
}
