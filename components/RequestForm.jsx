import React from 'react';
import PlaceSearchOrigin from './PlaceSearchOrigin';
import PlaceSearchDestination from './PlaceSearchDestination';
import { supabase } from '@/lib/supabase';

export default function RequestForm(props) {
	async function handleSubmit(e) {
		e.preventDefault();
		const { data,error } = await supabase.from('requests').insert(
			{
				origin: `POINT(${props.searchOriginLongitude} ${props.searchDestinationLongitude})`,
				destination: `POINT(${props.searchDestinationLongitude} ${props.searchDestinationLatitude})`,
			},
		).select();

		if (error) {
			console.error(error);
		}

		window.location.href = `/request/${data[0].id}`;
	}

	return (
		<form
			className='flex flex-col mt-5 mx-2'
			onSubmit={handleSubmit}
		>
			<PlaceSearchOrigin
				searchOriginLatitude={props.searchOriginLatitude}
				searchOriginLongitude={props.searchOriginLongitude}
				setSearchOriginLatitude={props.setSearchOriginLatitude}
				setSearchOriginLongitude={props.setSearchOriginLongitude}
			/>
			{props.searchOriginLatitude && props.searchOriginLongitude && (
				<PlaceSearchDestination
					searchDestinationLatitude={props.searchDestinationLatitude}
					searchDestinationLongitude={props.searchDestinationLongitude}
					setSearchDestinationLatitude={props.setSearchDestinationLatitude}
					setSearchDestinationLongitude={props.setSearchDestinationLongitude}
				/>
			)}
			<div className='flex items-center justify-center'>
				<button
					className='bg-blue-600 text-white font-bold py-2 px-10 rounded-2xl disabled:cursor-not-allowed'
					disabled={
						props.searchOriginLatitude &&
						props.searchOriginLongitude &&
						props.searchDestinationLatitude &&
						props.searchDestinationLongitude
							? false
							: true
					}
				>
					Submit
				</button>
			</div>
		</form>
	);
}
