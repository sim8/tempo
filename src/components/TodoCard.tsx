import React from 'react';

export default function Todo({
  className = '',
  ...divProps
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`flex items-center p-4 bg-slate-700 rounded-lg mb-2 ${className}`}
      {...divProps}
    />
  );
}
