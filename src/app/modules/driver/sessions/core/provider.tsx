import React, {Dispatch, FC, SetStateAction, useContext, useEffect, useRef, useState} from 'react'
import {WithChildren, calculateTimeDifference, convertTimeToMilliseconds} from '../../../../../_metronic/helpers'
import {SessionDriver} from './models'
import {Spinner} from '../../../../../_metronic/helpers/components/Spinner'
import {getMySession} from './requests'

interface Props {
  sessions: SessionDriver[]
  setSessions: Dispatch<SetStateAction<SessionDriver[] | undefined>>
  setRunningTime: Dispatch<SetStateAction<number | undefined>>
  setRunningSession: Dispatch<SetStateAction<boolean | undefined>>
  setTotalTime: Dispatch<SetStateAction<number | undefined>>
  setVehicleName: Dispatch<SetStateAction<string | undefined>>
  total_time: number
  running_time: number
  is_running: boolean
  vehicles_name: string
}
const initialState = {
  sessions: [],
  total_time: null,
  running_time: 0,
  is_running: false,
  vehicles_name: null,
  setRunningSession: () => {},
  setSessions: () => {},
  setRunningTime: () => {},
  setTotalTime: () => {},
  setVehicleName: () => {},
}

//localStorage.getItem('visibleColumns') ||
export const MYSESSIONContext = React.createContext<Props>(initialState)
const useSession = () => {
  return useContext(MYSESSIONContext)
}
export const SessionProvider: FC<WithChildren> = ({children}) => {
  const [sessions, setSessions] = useState<SessionDriver[] | undefined>()
  const [running_time, setRunningTime] = useState<number>()
  const [is_running, setRunningSession] = useState<boolean>(false)
  const [total_time, setTotalTime] = useState<number>(null)
  const [vehicles_name, setVehicleName] = useState<string>(null)
  return (
    <MYSESSIONContext.Provider
      value={{
        total_time,
        setTotalTime,
        is_running,
        setRunningSession,
        sessions,
        setSessions,
        running_time,
        setRunningTime,
        setVehicleName,
        vehicles_name,
      }}
    >
      {children}
    </MYSESSIONContext.Provider>
  )
}
const SessionProviderInit: FC<WithChildren> = ({children}) => {
  const {setSessions, setRunningTime, setRunningSession, setTotalTime, setVehicleName} =
    useSession()
  const didRequest = useRef(false)
  const [Loading, setLoading] = useState(true)
  // We should request user by authToken (IN OUR EXAMPLE IT'S API_TOKEN) before rendering the application
  useEffect(() => {
    const requestUser = async () => {
      try {
        const data: any = await getMySession()
        setSessions(data?.session)
        setVehicleName(data?.vehicles_name)
        setTotalTime(convertTimeToMilliseconds(data?.total_time))
        if (data?.session_first) {
          const timeDifference = calculateTimeDifference(
            data?.session_first?.date,
            data?.session_first?.start_time
          )
          setRunningSession(true)
          setRunningTime(timeDifference)
        } else {
          setRunningSession(false)
        }
        setLoading(false)
      } catch (error) {
        console.error(error)
        if (!didRequest.current) {
        }
      } finally {
        setLoading(false)
      }
    }
    requestUser()
  }, [])

  return Loading ? <Spinner /> : <>{children}</>
}
export {useSession, SessionProviderInit}

