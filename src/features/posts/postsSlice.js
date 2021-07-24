import { createSlice, nanoid } from '@reduxjs/toolkit'
import { sub } from 'date-fns'

const initialState = [
    { 
        id: '1', 
        title: 'First Post!', 
        content: 'Hello!', 
        date: sub(new Date(), { minutes: 10 }).toISOString(),
        reactions: {
            thumbsUp: 2,
            hooray: 1,
            heart: 3
        } 
    }, { 
        id: '2', 
        title: 'Second Post', 
        content: 'More text',
        date: sub(new Date(), { minutes: 10 }).toISOString(),
        reactions: {
            thumbsUp: 5,
            hooray: 0,
            heart: 2
        }   
    }
]

const postSlice = createSlice({
    name: 'Posts',
    initialState,
    reducers: {
        postAdded: {
            reducer: (state, action) => {
                state.push(action.payload)
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
            const post = state.find(post => post.id === id)

            if(post) {
                post.title = title
                post.content = content 
            }
        },
        reactionAdded: (state, action) => {
            const { postId, reaction } = action.payload
            const post = state.find(post => post.id === postId)

            if(post) {
                post.reactions[reaction]++
            }
        }
    }
})

export const { postAdded, postUpdated, reactionAdded } = postSlice.actions

export default postSlice.reducer