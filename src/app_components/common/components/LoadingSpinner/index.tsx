import React from 'react';

export default function LoadingSpinner({
    color = 'text-gray-500',
    className = '',
}: {
    color?: string,
    className?: string,
}) {
    return (
        <div className={`animate-spin rounded-full h-8 w-8 border-t-2 border-gray-100 ${color} ${className}`}>
        </div>
    );
};