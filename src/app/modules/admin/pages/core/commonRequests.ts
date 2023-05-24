
import axios from 'axios'
import { SelectList } from './models'


const getRegiosList = (): Promise<SelectList[]> => {
    return axios
        .get(`all_region`)
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


export { getRegiosList,getPassengers }
