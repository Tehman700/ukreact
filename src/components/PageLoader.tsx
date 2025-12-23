import { memo } from 'react';

export const PageLoader = memo(() => (
  <div className="flex items-center justify-center min-h-screen bg-white">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
      <p className="text-sm text-gray-600">Loading...</p>
    </div>
  </div>
));

PageLoader.displayName = 'PageLoader';
