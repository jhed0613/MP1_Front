import React from 'react';
import StockDetail from '../component/stock/StockDetail';

const KosdaqDetail = () => {
    return (
        <div>
            
            <StockDetail apiEndpoint='/stocks/kosdaq' isKospi={false} title='kosdaq'/>
        </div>
    );
}

export default KosdaqDetail;