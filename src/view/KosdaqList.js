import React from 'react';
import StockList from '../component/stock/StockList';

const KosdaqList = () => {
    return (
        <div>
            <StockList apiEndpoint='/stocks/kosdaq' title='kosdaq' />
        </div>
    );
}

export default KosdaqList;
