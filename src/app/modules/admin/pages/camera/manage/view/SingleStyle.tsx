import React from 'react';
import VedioPlayer from '../../../vedio-stream/components/LiveStream';

const SingleStyle = ({...props}) => {
    const { data } = props;
    return (
        <div className="col-md-12">
            <div>
                < VedioPlayer title={`camera ${1}`} />
            </div>
        </div>
    );
}

export default SingleStyle;
