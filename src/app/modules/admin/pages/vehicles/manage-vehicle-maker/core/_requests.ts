
import axios, { AxiosResponse } from 'axios'
import { ConvertStringToObject, ID, ResponeApiCheck, Response, extractPageNumber } from '../../../../../../../_metronic/helpers'

import {  VehicleMaker, VehicleMakerQueryResponse } from './_models'
const getList = (query: string, page: number): Promise<VehicleMakerQueryResponse> => {
  return axios
    .post(`list_vehicles_maker?${'page=' + page}`, {
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

const create = (object: VehicleMaker) => {
  return axios
    .post('store_vehicle_maker', object)
    .then((response: AxiosResponse<ResponeApiCheck>) => response.data)
  //.then((response: Response<VehicleType>) => response.data)
}

const update = (object: VehicleMaker) => {
  return axios.post(`update_vehicle_maker/${object.id}`, object)
    .then((response: AxiosResponse<ResponeApiCheck>) => response.data)
  // .then((response: ResponeApiCheck) => response)
}


const deleteUser = (userId: ID): Promise<void> => {
  return axios.delete(`${'delete'}/${userId}`).then(() => { })
}

const deleteSelectedUsers = (userIds: Array<ID>): Promise<void> => {
  const requests = userIds.map((id) => axios.delete(`${'delete'}/${id}`))
  return axios.all(requests).then(() => { })
}

export { getList, deleteUser, deleteSelectedUsers, create, update }
