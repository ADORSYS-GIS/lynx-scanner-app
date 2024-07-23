import { fetchConfigUrl } from '../thunks/fetch.config-url'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface NotificationState {
  messages: (string | undefined)[]
}

const initialState = { messages: [] } satisfies NotificationState as NotificationState

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    clear(state) {
      state.messages = []
    },
    remove(state, action: PayloadAction<string>) {
      state.messages = state.messages.filter((p) => p !== action.payload)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchConfigUrl.rejected, (state, action) => {
      state.messages.push(action.error?.message)
    })
  }
})

export const { clear: clearNotifications, remove: removeNotification } = notificationSlice.actions

export default notificationSlice.reducer

export const selectNotifications = ({ notification }: { notification: NotificationState }) =>
  notification.messages.filter((p) => !!p).map((p) => p!)
