import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchConfigUrl } from '../thunks/fetch.config-url'

interface ConfigState {
  url?: string
}

const initialState = { url: undefined } satisfies ConfigState as ConfigState

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    clear(state) {
      delete state.url
    },
    url(state, action: PayloadAction<string>) {
      state.url = action.payload
    }
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchConfigUrl.fulfilled, (state, action) => {
      // Add user to the state array
      state.url = action.payload
    })
  }
})

export const { clear: clearConfig, url: setUrlConfig } = configSlice.actions

export default configSlice.reducer

export const urlConfigSelector = ({ config }: { config: ConfigState }) => JSON.stringify(config)
