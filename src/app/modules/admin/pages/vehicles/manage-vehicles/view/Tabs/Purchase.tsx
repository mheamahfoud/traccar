import { useIntl } from 'react-intl';
import InputDetail from '../../../../../components/fields/InputDetail';

const Purchase = ({...props}) => {
    const {data}=props;
    const intel = useIntl()
    return (
        <div
            className='d-flex flex-column scroll-y me-n7 pe-7'
        >

            <div className='separator separator-dashed my-5'></div>
            <div className='row'>
                <div className='col-md-6 col-sm-6 col-xs-12'>
                    <InputDetail
                        title={intel.formatMessage({ id: 'exp_name' })}
                        text={data['exp_name']|| ''}
                     
                    />
                </div>
                <div className='col-md-6 col-sm-6 col-xs-12'>
                    <InputDetail
                        title={intel.formatMessage({ id: 'exp_amount' })}
                        text={data['exp_amount']}
                       
                    />
                </div>

            

            </div>

        </div>
    );
}

export default Purchase;
