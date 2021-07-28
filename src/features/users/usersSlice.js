import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { client } from '../../api/client'

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await client.get('/fakeApi/users')
    return response.users
})

const usersSlice = createSlice({
    name: 'Users',
    initialState: [],
    reducers: {},
    extraReducers: {
        [fetchUsers.fulfilled]: (_state, action) => {
            return action.payload
        }
    }
})

export const selectAllUsers = state => state.users

export const selectUserById = (state, userId) => state.users.find(user => user.id === userId) 

export default usersSlice.reducer