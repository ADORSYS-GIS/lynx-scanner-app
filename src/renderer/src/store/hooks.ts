import { useCallback } from 'react'
import { fetchConfigUrl } from './thunks'
import { useAppDispatch } from './types'

export function useFetchConfigUrl() {
  const dispatch = useAppDispatch()
  return useCallback(() => {
    dispatch(fetchConfigUrl())
  }, [dispatch])
}
