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
import { supabase } from '@/lib/supabase';

export default function DetailMap(props) {
	console.log(props);
	// Directions data
	const [directionsData, setDirectionsData] = useState(null);
	//input data value
	const [radiusValue, setRadiusValue] = useState(0);
	const[nearbyDrivers, setNearbyDrivers] = useState([]);
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

	// const center = {
	// 	lat: -37.885834,
	// 	lng: 145.082504,
	// };

	const center = {
		lat: -37.76637248815241,
		lng: 144.91489505969741,
	};

	const { isLoaded } = useJsApiLoader({
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
	});

	const mapRef = useRef(null);

	useEffect(() => {
		if (props.singleRequestData) {
			console.log(props.singleRequestData);
		}
	}, [props.singleRequestData]);

	const matchOrigin = props.singleRequestData[0].origin.match(
		/POINT\(([^ ]+) ([^ ]+)\)/
	);
	const matchDestination = props.singleRequestData[0].destination.match(
		/POINT\(([^ ]+) ([^ ]+)\)/
	);

	const originLatitude = parseFloat(matchOrigin[2]);
	const originLongitude = parseFloat(matchOrigin[1]);

	const destinationLatitude = parseFloat(matchDestination[2]);
	const destinationLongitude = parseFloat(matchDestination[1]);

	useEffect(() => {
		if (
			originLatitude !== null &&
			originLongitude !== null &&
			destinationLatitude !== null &&
			destinationLongitude
		) {
			// Using the directions API
			const requestOrigin = {
				lat: originLatitude,
				lng: originLongitude,
			};
			const requestDestination = {
				lat: destinationLatitude,
				lng: destinationLongitude,
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
		originLatitude,
		originLongitude,
		destinationLatitude,
		destinationLongitude,
	]);

	// Function to extract coordinates
	const extractCoordinates = (str) => {
		const regex = /POINT\((-?\d+\.\d+)\s(-?\d+\.\d+)\)/;
		const matches = str.match(regex);

		if (matches && matches.length === 3) {
			const [, coordTwo, coordOne] = matches;
			return {
				coordTwo: parseFloat(coordTwo),
				coordOne: parseFloat(coordOne),
			};
		}
		return null;
	};
	//car icon
	const carIcon = {
		url: '/assets/car.png',
		scaledSize: { width: 50, height: 50 },
	};

	// Get nearby drivers
	useEffect(() => {
		// if (props.requestId && radiusValue !== '') {
		// 	async function getNearbyDrivers() {
		// 		try {
		// 			const { data, error } = await supabase.rpc('get_nearby_drivers', {
		// 				request_id: props.requestId,
		// 				radius_meters: radiusValue,
		// 			});

		// 			console.log(radiusValue, props.requestId);

		// 			if (error) {
		// 				throw new Error(error.message);
		// 			} else {
		// 				// return data;
		// 				console.log(data);
		// 				// setNearbyDrivers(data);
		// 			}
		// 		} catch (error) {
		// 			throw new Error(error.message);
		// 		}
		// 	}
		// }
			// Get drivers
			async function getDrivers() {
				try {
					const { data, error } = await supabase.rpc('fetch_drivers');
					if (error) {
						throw new Error(error.message);
					}

					// return data;
					console.log(data);
					setNearbyDrivers(data);
				} catch (error) {
					throw new Error(error.message);
				}
			}
			getDrivers();
			// getNearbyDrivers();
		
	}, [props.requestId]);

	// //get nearby drivers
	// async function getNearbyDrivers() {
	// 	try {
	// 		const { data, error } = await supabase.rpc('get_nearby_drivers', {
	// 			request_id: props.requestId,
	// 			radius_meters: radiusValue,
	// 		});
	// 		if (error) {
	// 			throw new Error(error.message);
	// 		}
	// 		// return data;
	// 		console.log(data);
	// 	} catch (error) {
	// 		throw new Error(error.message);
	// 	}
	// }

	//Get drivers
	// async function getDrivers() {
	// 	try {
	// 		const { data, error } = await supabase.rpc('fetch_drivers');
	// 		if (error) {
	// 			throw new Error(error.message);
	// 		}

	// 		// return data;
	// 		setRadiusValue(data)
	// 	} catch (error) {
	// 		throw new Error(error.message);
	// 	}
	// }

	return (
		<>
			{isLoaded ? (
				<div className='relative'>
					<GoogleMap
						mapContainerStyle={containerStyle}
						options={options}
						center={center}
						zoom={12}
						// onClick={() => setIsInfoWindowOpen(false)}
						onLoad={(map) => (mapRef.current = map)}
					>
						{/* Child components, such as markers, info windows, etc. */}
						{originLatitude !== null && originLongitude !== null && (
							<MarkerF
								position={{
									lat: originLatitude,
									lng: originLongitude,
								}}
							/>
						)}
						{directionsData && (
							<DirectionsRenderer
								directions={directionsData}
								options={{
									polylineOptions: { strokeColor: 'red', strokeWeight: 4 },
								}}
							/>
						)}
						{/* displaying the drivers data */}
						{nearbyDrivers.map((driver) => {
							const coordinates = extractCoordinates(driver.driver_position);
							return (
								<MarkerF
									key={driver.id}
									position={{
										lat: coordinates.coordOne,
										lng: coordinates.coordTwo,
									}}
									icon={carIcon}
								/>
							);
						})}
					</GoogleMap>
					<div className='flex gap-2 justify-start  items-center absolute top-2 left-5 w-2/5 h-10'>
						{/* <input
							placeholder='enter radius (meters)'
							type='number'
							className='w-full h-full p-2 bg-black text-white'
							value={radiusValue}
							onChange={(e) => setRadiusValue(e.target.value)}
						/>  */}
						<button
							// onClick={getNearbyDrivers}
							className='bg-blue-500 px-8 py-2  text-white font-bold rounded'
						>
							{nearbyDrivers.length} drivers within your range
						</button>
					</div>
				</div>
			) : (
				<></>
			)}
		</>
	);
}
