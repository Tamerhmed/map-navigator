import { supabase } from '@/lib/supabase';

async function getDrivers() {
	try {
		const { data, error } = await supabase.from('test_table').select();
		if (error) {
			throw new Error(error.message);
		}

		return data;
	} catch (error) {
		throw new Error(error.message);
	}
}

export default async function FetchServer() {
	const drivers = await getDrivers();

	return (
		<div>
			{drivers.map((driver) => (
				<h5 key={driver.id}>
					Name: {driver.name} *** Distance: {driver.distance}
				</h5>
			))}
		</div>
	);
}
