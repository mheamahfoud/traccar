import { ID, Response } from '../../../../../../../_metronic/helpers'

export enum TripType {
  Internal = 1,
  External = 2,
  Other = 3
}

export const tripTypeList = [
  {
    value: 1,
    text: 'Internal'
  }, {
    value: 2,
    text: 'External'
  }, {
    value: 3,
    text: 'Other'
  }
]
export type Trip = {
  id: ID,
  date: string,
  type: string,
  fromGroup: string,
  fromBuilding: string,
  toRegion: string,
  toGruop: number,
  toBuilding: string,
  count: number,


}


export type TripQueryResponse = Response<Array<Trip>>

export const initialTrip: Trip = {
  id: null,
  date: null,
  type: null,
  fromGroup: null,
  fromBuilding: null,
  toRegion: null,
  toGruop: null,
  toBuilding: null,
  count: null,

}
export type Path = {
  form: string,
  to: string,
  cars_id: string,
  other_to: string,
  time_in: string,
  passenger: number[]
}
export type AddTrip = {
  type: number,
  date: string,
  note: string,
  path: Path[]
}

export const initialPath: Path = {
  form: null,
  to: null,
  cars_id: null,
  other_to: null,
  time_in: null,
  passenger: []
}
export const initialAddTrip: AddTrip = {
  date: null,
  type: null,
  note: null,
  path: [{
    form: null,
    to: null,
    cars_id: null,
    other_to: null,
    time_in: null,
    passenger: []
  }]


}