import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = [
    { id: 1, title: 'First Post!', content: 'Hello!' },
    { id: 2, title: 'Second Post', content: 'More text' }
]

const postSlice = createSlice({
    name: 'Posts',
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action) {
                state.push(action.payload)
            },
            prepare(title, content) {
                return { payload: { id: nanoid(), title, content } }
            }
        },
        postUpdated: (state, action) => {
            const { id, title, content } = action.payload
            const post = state.find(post => post.id === id)

            if(post) {
                post.title = title
                post.content = content 
            }
        }
    }
})

export const { postAdded, postUpdated } = postSlice.actions

export default postSlice.reducer