import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'
import { client } from '../../api/client'

const initialState = {
    posts: [],
    status: 'idle',
    error: null
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await client.get('/fakeApi/posts')
    return response.posts
})

export const addNewPost = createAsyncThunk('posts/addNewPost', async initialPost => {
    const response = await client.post('/fakeApi/posts', { post: initialPost })
    return response.post
})

const postSlice = createSlice({
    name: 'Posts',
    initialState,
    reducers: {
        postAdded: {
            reducer: (state, action) => {
                state.posts.push(action.payload)
            },
            prepare: (title, content, userId) => {
                return { 
                    payload: { 
                        id: nanoid(), 
                        date: new Date().toISOString(), 
                        title, 
                        content, 
                        user: userId, 
                        reactions: {thumbsUp: 0, hooray: 0, heart: 0}
                    } 
                }
            }
        },
        postUpdated: (state, action) => {
            const { id, title, content } = action.payload
            const post = state.posts.find(post => post.id === id)

            if(post) {
                post.title = title
                post.content = content 
            }
        },
        reactionAdded: (state, action) => {
            const { postId, reaction } = action.payload
            const post = state.posts.find(post => post.id === postId)

            if(post) {
                post.reactions[reaction]++
            }
        }
    },
    extraReducers: {
        [fetchPosts.pending]: (state, action) => {
            state.status = 'loading'
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            state.posts = state.posts.concat(action.payload)
        },
        [fetchPosts.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        },
        [addNewPost.fulfilled]: (state, action) => {
            state.posts.push(action.payload)
        }
    }
})

export const { postAdded, postUpdated, reactionAdded } = postSlice.actions

export default postSlice.reducer

export const selectAllPosts = state => state.posts.posts

export const selectPostById = (state, postId) => state.posts.posts.find(post => post.id === postId)