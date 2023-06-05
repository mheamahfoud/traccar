
import axios, { AxiosResponse } from 'axios'
import { ConvertStringToObject } from '../../../../../_metronic/helpers'
import { TripDriverQueryResponse } from './Model'
const getDriverInfo = (): Promise<any> => {
    return axios
      .get(`driver_info`)
      .then((d: any) => {
        return d.data?.data
      }
      )
}
const getOldTripList = (query: string, page: number): Promise<TripDriverQueryResponse> => {
    return axios
      .post(`old_trip_driver?${'page=' + page}`, {
        ...ConvertStringToObject(query)
      })
      .then((d: any) => {
        return {
          data: d.data?.data?.data,
          payload: {
            pagination: {
              page_num: d.data?.data?.current_page,
              page_size: d.data?.data?.per_page,
              links: d.data?.data?.links
            }
          }
        }
      })
  }
export {getDriverInfo,getOldTripList}
