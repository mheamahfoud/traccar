import React from 'react';
import VedioPlayer from '../../../vedio-stream/components/LiveStream';

const SplitStyle = ({ ...props }) => {
    const { data } = props;
    return (
        <>
            <div className="col-md-10">
                < VedioPlayer title={`camera ${1}`} />
            </div>
            <div className="col-md-2">
                <div className="row">
                    <>
                        {
                            data.map((item, index) => {
                                return (
                                    <div className="col-md-12">
                                        < VedioPlayer title={`camera ${index}`} />
                                    </div>
                                )
                            })
                        }
                    </>
                </div>
            </div>
        </>
    );
}

export default SplitStyle;
