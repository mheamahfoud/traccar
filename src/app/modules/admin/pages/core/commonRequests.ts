
import axios from 'axios'
import { SelectList } from './models'
import { ID } from '../../../../../_metronic/helpers'


const getRegiosList = (): Promise<SelectList[]> => {
    return axios
        .get(`list_active_region`)
        .then((d: any) => {
            return d.data?.data.map((item) => {
                return {
                    value: item.parent,
                    text: item.name
                }
            })
        })
}


const getPassengers = (): Promise<SelectList[]> => {
    return axios
        .get(`list_passenger`)
        .then((d: any) => {
            return d.data?.data.map((item) => {
                return {
                    value: item.id,
                    text: item.name
                }
            })
        })
}


const getShiftList = (): Promise<SelectList[]> => {
    return axios
        .get(`list_active_shift`)
        .then((d: any) => {
            return d.data?.data.map((item) => {
                return {
                    value: item.id,
                    text: item.name
                }
            })
        })
}


const getVehicleList = (): Promise<SelectList[]> => {
    return axios
        .get(`list_active_vehicles`)
        .then((d: any) => {
            return d.data?.data.map((item) => {
                return {
                    value: item.id,
                    text: item.name
                }
            })
        })
}

const getDriverList = (): Promise<SelectList[]> => {
    return axios
        .get(`list_driver`)
        .then((d: any) => {
            return d.data?.data.map((item) => {
                return {
                    value: item.id,
                    text: item.name
                }
            })
        })
}

const getGroupListByRegion = (regio_id :ID): Promise<SelectList[]> => {
    return axios
        .get(`all_group_region/${regio_id}`)
        .then((d: any) => {
            return d.data?.data.map((item) => {
                return {
                    value: item.parent,
                    text: item.name
                }
            })
        })
}
export { getRegiosList, getPassengers,getShiftList,getVehicleList,getGroupListByRegion,getDriverList }
