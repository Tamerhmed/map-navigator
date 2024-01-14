import ParentDetailRequest from '@/components/ParentDetailRequest';
import React from 'react';

export const metadata = {
    title: 'Trip Details | Next course',
    description: 'More information about you trip request | Connect with a driver',
}

export default function RequestDetailPage({params}) {
    const {id} =params;
   
  return (
    <ParentDetailRequest requestId={id}/>
  )
}
