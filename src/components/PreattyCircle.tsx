import React from 'react';

type Props = {
    color: string;
    className?: string;
    rotateDeg?: number;
}

export default function PreattyCircle({color, className, rotateDeg}: Props) {
    return (
        <div className={`h-32 w-32 rounded-full bg-red-500 ${className}`}
        style={{
            background: `conic-gradient(from 180deg at 50% 50%, #${color} 0deg, rgba(217, 217, 217, 0.00) 360deg)`,
            transform: `rotate(${rotateDeg ?? 0}deg)`
        }}/>

    );
}