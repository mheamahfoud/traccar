
import axios, { AxiosResponse } from 'axios'
import { ConvertStringToObject, ID, ResponeApiCheck, SelectList, } from '../../../../../../../_metronic/helpers'
import { Trip, TripQueryResponse } from './_models'
const getList = (query: string, page: number): Promise<TripQueryResponse> => {
  return axios
    .post(`list_trip?${'page=' + page}`, {
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

const create = (object: any) => {
  return axios
    .post('store_trip', object)
    .then((response: AxiosResponse<ResponeApiCheck>) => response.data)
  //.then((response: Response<VehicleType>) => response.data)
}

const update = (object: any) => {
  return axios.post(`update_trip/${object.id}`, object)
    .then((response: AxiosResponse<ResponeApiCheck>) => response.data)
  // .then((response: ResponeApiCheck) => response)
}


const destroy = (id: ID): Promise<void> => {
  return axios.post(`${'destroy_trip'}/${id}`).then(() => { })
}

const destroySelectedItems = (selectedIds: Array<ID>): Promise<void> => {
  const requests = selectedIds.map((id) => axios.post(`${'destroy_trip'}/${id}`))
  return axios.all(requests).then(() => { })
}

const geRegionTripCars = (region_id: string): Promise<SelectList[]> => {
  return axios
    .get(`region_trip_cars/${region_id}`)
    .then((d: any) => {
      return d.data?.data.map((item) => {
        return {
          value: item.id,
          text: item.name
        }
      })
    })
}
const geRegionTrips = (region_id: string): Promise<SelectList[]> => {
  return axios
    .get(`region_trip/${region_id}`)
    .then((d: any) => {
      return d.data?.data.map((item) => {
        return {
          value: item.id,
          text: item.name
        }
      })
    })
}
const geExternalRegionTrips = (): Promise<SelectList[]> => {
  return axios
    .get(`external_region`)
    .then((d: any) => {
      return d.data?.data.map((item) => {
        return {
          value: item.id,
          text: item.name
        }
      })
    })
}
export { getList, destroy, destroySelectedItems, create, update,geRegionTrips,geRegionTripCars,geExternalRegionTrips }
