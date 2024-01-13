'use client';

import { useState } from 'react';
import RequestForm from './RequestForm';
import MapRequest from './MapRequest';

export default function ParentRequest() {
	const [searchOriginLatitude, setSearchOriginLatitude] = useState(null);
	const [searchOriginLongitude, setSearchOriginLongitude] = useState(null);
	const [searchDestinationLatitude, setSearchDestinationLatitude] =
		useState(null);
	const [searchDestinationLongitude, setSearchDestinationLongitude] =
		useState(null);
	return (
		<div className='flex'>
			<div className='w-1/5'>
				<RequestForm
					searchOriginLatitude={searchOriginLatitude}
					searchOriginLongitude={searchOriginLongitude}
					setSearchOriginLatitude={setSearchOriginLatitude}
					setSearchOriginLongitude={setSearchOriginLongitude}
					searchDestinationLatitude={searchDestinationLatitude}
					searchDestinationLongitude={searchDestinationLongitude}
					setSearchDestinationLatitude={setSearchDestinationLatitude}
					setSearchDestinationLongitude={setSearchDestinationLongitude}
				/>
			</div>
			<div className='w-4/5'>
				<MapRequest
					searchOriginLatitude={searchOriginLatitude}
					searchOriginLongitude={searchOriginLongitude}
					setSearchOriginLatitude={setSearchOriginLatitude}
					setSearchOriginLongitude={setSearchOriginLongitude}
					searchDestinationLatitude={searchDestinationLatitude}
					searchDestinationLongitude={searchDestinationLongitude}
					setSearchDestinationLatitude={setSearchDestinationLatitude}
					setSearchDestinationLongitude={setSearchDestinationLongitude}
				/>
			</div>
		</div>
	);
}
