
import axios from 'axios'
import { SelectListQueryResponse } from './_models'

const getMakerList = (): Promise<SelectListQueryResponse> => {
    return axios
      .get(`all_vehicles_maker`)
      .then((d: any) => {
        return {
          data: d.data?.data,
        }
      })
  }

  const getColorList = (): Promise<SelectListQueryResponse> => {
    return axios
      .get(`all_vehicles_color`)
      .then((d: any) => {
        return {
          data: d.data?.data,
        }
      })
  }

  const getModelList = (): Promise<SelectListQueryResponse> => {
    return axios
      .get(`all_vehicles_model`)
      .then((d: any) => {
        return {
          data: d.data?.data,
        }
      })
  }

  const getGroupList = (): Promise<SelectListQueryResponse> => {
    return axios
      .get(`all_vehicles_group`)
      .then((d: any) => {
        return {
          data: d.data?.data,
        }
      })
  }


  const getTypeList = (): Promise<SelectListQueryResponse> => {
    return axios
      .get(`all_vehicles_type`)
      .then((d: any) => {
        return {
          data: d.data?.data,
        }
      })
  }


  const getEngineTypeList = (): Promise<SelectListQueryResponse> => {
    return axios
      .get(`all_engine_type`)
      .then((d: any) => {
        return {
          data: d.data?.data,
        }
      })
  }
export { getMakerList ,getColorList,getGroupList,getModelList,getTypeList ,getEngineTypeList}
