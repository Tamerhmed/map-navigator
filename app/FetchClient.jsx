'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function FetchClient() {
	const [drivers, setDrivers] = useState([]);

	useEffect(() => {

		async function getDrivers() {
			try {
				const { data, error } = await supabase.from('test_table').select();
				// console.log(data);
				setDrivers(data);
			} catch (error) {
				// console.error(error);
			}
		}
		getDrivers();
	}, []);
	return (
    <div>
      {drivers.map((driver)=>(
        <h5 key={driver.id}>Name: {driver.name} *** Distance: {driver.distance}</h5>
      ))}
    </div>
  );
}
