import { configureStore } from '@reduxjs/toolkit'
import { reducerConfig, reducerNotification } from './slices'
import { emptySplitApi } from './empty.api'
import logger from 'redux-logger'
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
  reducer: {
    notification: reducerNotification,
    config: reducerConfig,
    // Add the generated reducer as a specific top-level slice
    [emptySplitApi.reducerPath]: emptySplitApi.reducer
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(emptySplitApi.middleware, logger)
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)
