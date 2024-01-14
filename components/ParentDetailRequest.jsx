import React from 'react';
import DetailMap from './DetailMap';
import { supabase } from '@/lib/supabase';

//get A Single request
async function getSingleRequest(id) {
	try {
		const { data, error } = await supabase.rpc('get_request_by_id', {
			request_id: id,
		});
		if (error) {
			throw new Error(error.message);
		}

		return data;
	} catch (error) {
		throw new Error(error.message);
	}
}


//Get drivers
async function getDivers() {
	try {
		const { data, error } = await supabase.rpc('fetch_drivers');
		if (error) {
			throw new Error(error.message);
		}

		return data;
	} catch (error) {
		throw new Error(error.message);
	}
}

export default async function ParentDetailRequest({ requestId }) {
	const singleRequestData = await getSingleRequest(requestId);
	// const driversData = await getDivers();
	// const nearbyDrivers = await getNearbyDrivers(requestId, 7000)
	// console.log(nearbyDrivers);
	// console.log(nearbyDrivers.length);
	// console.log(singleRequestData);
	return <DetailMap singleRequestData={singleRequestData} requestId={requestId} />;
}
