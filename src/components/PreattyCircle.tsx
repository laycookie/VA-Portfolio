import React from 'react';

type Props = {
    color: string;
    className?: string;
    scale?: number;
    id?: string;
}

export default function PreattyCircle({color, className, scale, id}: Props) {
    return (
        <div className={`h-32 w-32 rounded-full bg-red-500 ${className}`} id={id}
        style={{
            background: `conic-gradient(from 180deg at 50% 50%, #${color} 0deg, rgba(217, 217, 217, 0.00) 360deg)`,
            scale: scale ?? 1
        }}/>

    );
}