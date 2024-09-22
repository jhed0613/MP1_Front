import React from 'react';

export const DiffAmount = ({ diffAmount }) => {
    if (diffAmount.startsWith('상승')) {
        return <span className="up-arrow">▲ {diffAmount.slice(2)}</span>;
    } else if (diffAmount.startsWith('하락')) {
        return <span className="down-arrow">▼ {diffAmount.slice(2)}</span>;
    } else if (diffAmount.startsWith('보합')) {
        return <span className="no-change">- {diffAmount.slice(2)}</span>;
    } else {
        return <span>{diffAmount}</span>; // 기본값으로 표시
    }
};

export const DayRange = ({ dayRange }) => {
    if (dayRange.startsWith('-')) {
        return <span className="day-range blue">{dayRange}</span>;
    } else if (dayRange.startsWith('+')) {
        return <span className="day-range red">{dayRange}</span>;
    } else {
        return <span className="day-range">{dayRange}</span>;
    }
};
