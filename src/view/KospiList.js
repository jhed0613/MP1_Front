import React from 'react';
import StockList from '../component/stock/StockList';

const KospiList = () => {
    return (
        <div>
            <StockList apiEndpoint='/stocks/kospi' title='kospi' />
        </div>
    );
}

export default KospiList;
