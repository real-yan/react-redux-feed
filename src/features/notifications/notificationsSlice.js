import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { client } from '../../api/client'

export const fetchNotifications = createAsyncThunk('notifications/fetchNotifications', async (_, { getState }) => {
    const allNotifications = selectAllNotifications(getState())
    const [latestNotification] = allNotifications
    const latestTimeStamp = latestNotification ? latestNotification.date : ''
    const response = await client.get(`fakeApi/notifications?since=${latestTimeStamp}`)
    return response.notifications
})

const notificationSlice = createSlice({
    name: 'Notifications',
    initialState: [],
    reducers: {
        allNotificationsRead: (state, action) => {
            state.forEach(notification => {
                notification.read = true
            })
        }
    },
    extraReducers: {
        [fetchNotifications.fulfilled]: (state, action) => {
            state.forEach(notification => {
                notification.isNew = !notification.read
            })
            state.push(...action.payload)
            state.sort((a, b) => { return b.date.localeCompare(a.date) })
        }
    }
})

export const { allNotificationsRead } = notificationSlice.actions

export const selectAllNotifications = state => state.notifications

export default notificationSlice.reducer