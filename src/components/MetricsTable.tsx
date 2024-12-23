import React from 'react';
import { Table } from './ui/Table';
import { Campaign, AdSet, Ad } from '../types/meta';

interface MetricsTableProps {
  data: (Campaign | AdSet | Ad)[];
  onStatusChange: (id: string, status: 'ACTIVE' | 'PAUSED') => void;
  onRowClick?: (id: string) => void;
}

export function MetricsTable({ data, onStatusChange, onRowClick }: MetricsTableProps) {
  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <thead>
          <tr className="bg-gray-50">
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-right">Cost</th>
            <th className="p-2 text-right">Impressions</th>
            <th className="p-2 text-right">Clicks</th>
            <th className="p-2 text-right">Purchases</th>
            <th className="p-2 text-right">Purchase Value</th>
            <th className="p-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((item) => (
            <tr
              key={item.id}
              onClick={() => onRowClick?.(item.id)}
              className="hover:bg-gray-50 cursor-pointer"
            >
              <td className="p-2">{item.name}</td>
              <td className="p-2">
                <select
                  value={item.status}
                  onChange={(e) => onStatusChange(item.id, e.target.value as 'ACTIVE' | 'PAUSED')}
                  onClick={(e) => e.stopPropagation()}
                  className="p-1 border rounded"
                >
                  <option value="ACTIVE">Active</option>
                  <option value="PAUSED">Paused</option>
                </select>
              </td>
              <td className="p-2 text-right">${item.spend.toFixed(2)}</td>
              <td className="p-2 text-right">{item.impressions.toLocaleString()}</td>
              <td className="p-2 text-right">{item.clicks.toLocaleString()}</td>
              <td className="p-2 text-right">{item.purchases}</td>
              <td className="p-2 text-right">${item.purchase_value.toFixed(2)}</td>
              <td className="p-2 text-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onStatusChange(item.id, item.status === 'ACTIVE' ? 'PAUSED' : 'ACTIVE');
                  }}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  {item.status === 'ACTIVE' ? 'Pause' : 'Activate'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}