import React, { useEffect, useState } from 'react';
import './clock.css';  // 스타일 파일 추가

const Clock = () => {
    const [currentDateTime, setCurrentDateTime] = useState('');

    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();
            const options = {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            };
            const formattedDateTime = now.toLocaleDateString('ko-KR', options);
            setCurrentDateTime(formattedDateTime);
        };

        updateDateTime();
        const intervalId = setInterval(updateDateTime, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <span className="clock">
            {currentDateTime}
        </span>
    );
}

export default Clock;
