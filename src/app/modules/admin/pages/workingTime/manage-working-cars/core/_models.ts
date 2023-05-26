import { ID, Response } from '../../../../../../../_metronic/helpers'

export type Terminal = {
  id: number,
  name: string,
  email: string,
  mypassword: string,
  station: string,
  station_id: number,
  longitude: string,
  latitude: string,
  permissions: any[]



}


export type TerminalQueryResponse = Response<Array<Terminal>>

export const initialVehicleModel: Terminal = {
  id: null,
  name: null,
  email: null,
  mypassword: null,
  station: null,
  station_id: null,
  longitude: null,
  latitude: null,
  permissions: []

}



export type CarWorkingTime = {
  id: number,
  start: string,
  end: string,
  title: string
}


export type CarWorkingTimeQueryResponse = Response<Array<CarWorkingTime>>

export const initialCarsTImeModel: CarWorkingTime = {
  id: null,
  start: null,
  end: null,
  title: "test"


}

export type AddCarWorkingTime = {
  shift_id: string,
  vehicles_id: string,
  type: string,
  region_id: string,
  group_id: string,
  date: string


}

export const initialAddCarWorkingTimeModel: AddCarWorkingTime = {
  shift_id: '',
  vehicles_id: '',
  type: '',
  region_id: '',
  group_id: '',
  date: ''
}


export const WorkingDayType = [
  {
    value:1,
    text:'Internal'
  },
  {
    value:2,
    text:'External'
  }
]


