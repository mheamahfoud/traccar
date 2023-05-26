
import axios, { AxiosResponse } from 'axios'
import { ConvertStringToObject, ID, ResponeApiCheck, SelectList, } from '../../../../../../../_metronic/helpers'
import { AddCarWorkingTime, CarWorkingTime, CarWorkingTimeQueryResponse } from './_models'
const getList = (query: string): Promise<CarWorkingTimeQueryResponse> => {

  return axios
    .post(`all_shift_cars`, {
      ...ConvertStringToObject(query)
    })
    .then((d: any) => {
      return {
        data: d.data?.data.map((item) => {
          return {
            ...item,
            start: new Date(item.time_in),
            end: new Date(item.time_out)
          }

        }),
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
    .post('store_shift_cars', object)
    .then((response: AxiosResponse<ResponeApiCheck>) => response.data)
  //.then((response: Response<VehicleType>) => response.data)
}

const dublicate = (object: any) => {
  alert(JSON.stringify(object))
  return axios.post(`update_shift_cars}`, object)
    .then((response: AxiosResponse<ResponeApiCheck>) => response.data)
  // .then((response: ResponeApiCheck) => response)
}

const update = (object: any) => {
  return axios.post(`update_shift_cars/${object.id}`, object)
    .then((response: AxiosResponse<ResponeApiCheck>) => response.data)
  // .then((response: ResponeApiCheck) => response)
}


const destroy = (id: ID): Promise<void> => {
  return axios.post(`${'destroy_terminal'}/${id}`).then(() => { })
}

const destroySelectedItems = (selectedIds: Array<ID>): Promise<void> => {
  const requests = selectedIds.map((id) => axios.post(`${'destroy_terminal'}/${id}`))
  return axios.all(requests).then(() => { })
}

const getEventDetail = (id: ID): Promise<any> => {
  return axios.get(`${'one_shift_cars'}/${id}`).then((res) => res?.data?.data)
}



const getRegionsBytype = (type_id:ID): Promise<SelectList[]> => {
  return axios
      .get(`list_active_region_type/${type_id}`)
      .then((d: any) => {
          return d.data?.data.map((item) => {
              return {
                  value: item.parent,
                  text: item.name
              }
          })
      })
}

const getShitEdit = (shift_id:ID): Promise<AddCarWorkingTime> => {
  return axios
      .get(`edit_shift_cars/${shift_id}`)
      .then((d: any) => {
          return d.data?.data
      })
}



export { getList, destroy, destroySelectedItems, create, update,dublicate, getEventDetail ,getRegionsBytype,getShitEdit}
