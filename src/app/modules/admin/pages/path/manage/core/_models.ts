import {ID, Response} from '../../../../../../../_metronic/helpers'

export type Path = {
  id: number
  name: string
  count: string
  path_terminal: any[]
}

export type PathQueryResponse = Response<Array<Path>>

export const initialPathModel: Path = {
  id: null,
  name: null,
  count: '',
  path_terminal: [
    {
      terminal: null,
      priority: null,
      voice: null,
    },
  ],
}

export type AddPath = {
  name:string,
  count: number,
  terminal: any[
    
  ]
}

export const AddinitialPathModel: AddPath = {
  name: null,
  count: null,
  terminal: [
    {
      terminal: null,
      priority: null,
      voice: null,
    },
  ],
}
export const prorities = [
  {
    value: 1,
    text: '1',
  },
  {
    value: 2,
    text: '2',
  },
  {
    value: 3,
    text: '3',
  },
  {
    value: 4,
    text: '4',
  },
]
