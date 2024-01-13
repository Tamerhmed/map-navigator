'use client';

import React, { useEffect } from 'react';
import { useState, useCallback, useRef } from 'react';
import {
	GoogleMap,
	useJsApiLoader,
	MarkerF,
	InfoWindowF,
	DirectionsRenderer,
} from '@react-google-maps/api';
import Image from 'next/image';
import Car from '../public/assets/car.png';

export default function MapRequest(props) {
	// Directions data
	const [directionsData, setDirectionsData] = useState(null);
	const containerStyle = {
		width: '100%',
		height: '90vh',
	};
	const options = {
		mapId: 'a4d68dd519046e0b',
		mapTypeControl: false,
		zoomControl: false,
		fullscreenControl: false,
		clickableIcons: false,
		scrollwheel: true,
		streetViewControl: false,
	};

	const center = {
		lat: -37.885834,
		lng: 145.082504,
	};

	const { isLoaded } = useJsApiLoader({
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
	});

	const mapRef = useRef(null);

	function panToUserOrigin() {
		const newPosition = {
			lat: props.searchOriginLatitude,
			lng: props.searchOriginLongitude,
		};

		const map = mapRef.current;
		map.panTo(newPosition);
	}

	useEffect(() => {
		if (props.searchOriginLatitude && props.searchOriginLongitude) {
			panToUserOrigin();
		}
	}, [props.searchOriginLatitude, props.searchOriginLongitude]);

	useEffect(() => {
		if (
			props.searchOriginLatitude !== null &&
			props.searchOriginLongitude !== null &&
			props.searchDestinationLatitude !== null &&
			props.searchDestinationLongitude
		) {
			// Using the directions API
			const requestOrigin = {
				lat: props.searchOriginLatitude,
				lng: props.searchOriginLongitude,
			};
			const requestDestination = {
				lat: props.searchDestinationLatitude,
				lng: props.searchDestinationLongitude,
			};
			const directionService = new window.google.maps.DirectionsService();
			directionService.route(
				{
					origin: requestOrigin,
					destination: requestDestination,
					travelMode: window.google.maps.TravelMode.DRIVING,
				},
				(result) => {
					console.log(result);
					setDirectionsData(result);
				}
			);
		}
	}, [
		props.searchOriginLatitude,
		props.searchOriginLongitude,
		props.searchDestinationLatitude,
		props.searchDestinationLongitude,
	]);

	return (
		<>
			{isLoaded ? (
				<GoogleMap
					mapContainerStyle={containerStyle}
					options={options}
					center={center}
					zoom={12}
					onClick={() => setIsInfoWindowOpen(false)}
					onLoad={(map) => (mapRef.current = map)}
				>
					{/* Child components, such as markers, info windows, etc. */}
					{props.searchOriginLatitude !== null &&
						props.searchOriginLongitude !== null && (
							<MarkerF
								position={{
									lat: props.searchOriginLatitude,
									lng: props.searchOriginLongitude,
								}}
							/>
						)}
					{directionsData && <DirectionsRenderer directions={directionsData}  options={{
						polylineOptions:{strokeColor:'red' ,strokeWeight: 4}
					}}/>}
				</GoogleMap>
			) : (
				<></>
			)}
		</>
	);
}
