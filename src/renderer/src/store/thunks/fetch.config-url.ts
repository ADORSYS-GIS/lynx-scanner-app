import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchConfigUrl = createAsyncThunk('config/fetchUrl', async () => {
  const rest: string = await window.electron.ipcRenderer.invoke('server-url')
  return rest
})
