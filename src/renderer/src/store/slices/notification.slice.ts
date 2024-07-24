import { fetchConfigUrl } from '../thunks'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface NotificationState {
  messages: string[]
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
      state.messages.push(action.error?.message ?? JSON.stringify(action.error))
    })
  }
})

export const { clear: clearNotifications, remove: removeNotification } = notificationSlice.actions

export const reducerNotification = notificationSlice.reducer

export const selectNotifications = ({ notification }: { notification: NotificationState }) =>
  notification.messages.filter((p) => !!p).map((p) => p!)
