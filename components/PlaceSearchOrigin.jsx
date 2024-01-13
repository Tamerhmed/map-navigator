'use client';

import usePlacesAutocomplete, {
	getGeocode,
	getLatLng,
} from 'use-places-autocomplete';
import useOnclickOutside from 'react-cool-onclickoutside';
import { useEffect, useState } from 'react';

export default function PlaceSearchOrigin(props) {
	

	const {
		ready,
		value,
		suggestions: { status, data },
		setValue,
		clearSuggestions,
	} = usePlacesAutocomplete({
		requestOptions: {
			/* Define search scope here */
			// componentRestrictions: { country: 'aus' },
			// sw: -37.859025, 144.823238
			// ne:-37.75160694081848, 145.01618564762012

			locationRestriction: {
				east: 145.01618564762012, //longitude of eastern boundary
				north: -37.75160694081848, //latitude of northern boundary
				south: -37.859025,
				west: 144.823238, // longitude of western boundary
			},
		},
		debounce: 300,
	});
	const ref = useOnclickOutside(() => {
		// When the user clicks outside of the component, we can dismiss
		// the searched suggestions by calling this method
		clearSuggestions();
	});

	const handleInput = (e) => {
		// Update the keyword of the input element
		setValue(e.target.value);
	};

	const handleSelect =
		({ description }) =>
		() => {
			// When the user selects a place, we can replace the keyword without request data from API
			// by setting the second parameter to "false"
			setValue(description, false);
			clearSuggestions();

			// Get latitude and longitude via utility functions
			getGeocode({ address: description }).then((results) => {
				const { lat, lng } = getLatLng(results[0]);
				// console.log('📍 Coordinates: ', { lat, lng });
				props.setSearchOriginLatitude(lat);
				props.setSearchOriginLongitude(lng);
			});
		};

	useEffect(() => {
		if (props.searchOriginLatitude && props.searchOriginLongitude) {
      console.log(`retrived ${props.searchOriginLatitude} && ${props.searchOriginLongitude}`)
		}
	}, [props.searchOriginLatitude, props.searchOriginLongitude]);

	const renderSuggestions = () =>
		data.map((suggestion) => {
			const {
				place_id,
				structured_formatting: { main_text, secondary_text },
			} = suggestion;

			return (
				<li
					className='bg-blue-100 my-2 px-2 py-1 cursor-pointer rounded'
					key={place_id}
					onClick={handleSelect(suggestion)}
				>
					<strong>{main_text}</strong> <small>{secondary_text}</small>
				</li>
			);
		});

	return (
		<div ref={ref}>
			<input
				value={value}
				onChange={handleInput}
				disabled={!ready}
				className='w-full bg-black my-2 h-10 rounded-xl text-white font-bold p-2'
				type='text'
				placeholder='Your origin'
			/>
			{/* We can use the "status" to decide whether we should display the dropdown or not */}
			{status === 'OK' && <ul>{renderSuggestions()}</ul>}
		</div>
	);
}
