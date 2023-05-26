import { ID, Response } from '../../../../../../../_metronic/helpers'

export type Terminal = {
  id: number,
  name:string,
  email:string,
  mypassword:string,
  station:string,
  station_id:number,
  longitude:string,
  latitude:string,
  permissions:any[]



}


export type TerminalQueryResponse = Response<Array<Terminal>>

export const initialVehicleModel: Terminal = {
  id: null,
  name:null,
  email:null,
  mypassword:null,
  station:null,
  station_id:null,
  longitude:null,
  latitude:null,
  permissions:[]
 
}



export type CarWorkingTime = {
  id: number,
  time_in:string,
  time_out: string,
  start:string,
  end:string,
  title:string


}


export type CarWorkingTimeQueryResponse = Response<Array<CarWorkingTime>>

export const initialCarsTImeModel: CarWorkingTime = {
  id: null,
  time_in:null,
  time_out: null,
  start:null,
  end:null,
  title:"test"

 
}




