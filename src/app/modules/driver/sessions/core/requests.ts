import { MySessionDriver } from './models';
import axios, { AxiosResponse } from 'axios'

const getMySession = (): Promise<MySessionDriver> => {
    return axios
      .get(`my_session`)
      .then((d: any) => {
        return d.data?.data
      }
      )
}

export {getMySession}