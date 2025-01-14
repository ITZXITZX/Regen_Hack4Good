'use client';
// next & react
import { useState, useEffect } from 'react';
// ui
import { ArrowPathIcon } from '@heroicons/react/24/outline';
// functions & state
import { useRefreshStore, useFilterStateStore } from '@/app/store';

export default function RefreshButton() {
  const setRefresh = useRefreshStore((state) => state.setRefresh);
  const { clearFilters } = useFilterStateStore();
  const [isSpinning, setIsSpinning] = useState<Boolean>(false);

  const handleClick = () => {
    setIsSpinning(true);
    setRefresh();
    clearFilters();
  };

  setTimeout(() => {
    setIsSpinning(false);
  }, 1000);

  useEffect(() => {}, []);

  return (
    <button
      onClick={() => handleClick()}
      className="w-12 rounded-md border-2 border-blue-500 bg-gray-200 text-blue-500 hover:bg-blue-500 hover:text-white"
    >
      <ArrowPathIcon
        className={`sort-icon ${isSpinning ? 'spin-animation' : ''}`}
      />
    </button>
  );
}
