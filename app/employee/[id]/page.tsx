'use client';

import dynamic from 'next/dynamic';
import { organizationData } from '@/lib/mock-data';
import { Employee } from '@/lib/types';

// Dynamically import the client component
const EmployeeClientPage = dynamic(() => import('./EmployeeClientPage'), { ssr: false });

export default function Page() {
  return <EmployeeClientPage />;
}

export async function generateStaticParams() {
  function collectEmployeeIds(employee: Employee): string[] {
    const ids = [employee.id];
    if (employee.children) {
      for (const child of employee.children) {
        ids.push(...collectEmployeeIds(child));
      }
    }
    return ids;
  }

  const allIds = collectEmployeeIds(organizationData);
  return allIds.map(id => ({ id }));
}
