import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { postUpdated } from './postsSlice'

const EditPostForm = ({ match }) => {
    const { postId } = match.params

    const post = useSelector(state => 
        state.posts.find(post => post.id === postId)
    )

    const [title, setTitle] = useState(post.title)
    const [content, setContent] = useState(post.content)

    const dispatch = useDispatch()
    const history = useHistory()

    const onTitleChange = e => setTitle(e.target.value)
    const onContentChange = e => setContent(e.target.value)

    const onSavePostHandler = () => {
        if(title && content) {
            dispatch(postUpdated({id: postId, title, content}))
            history.push(`/posts/${postId}`)
        }
    }

    return (
        <section>
            <h2>Edit Post</h2>
            <form>
                <label htmlFor="postTitle">Post Title: </label>
                <input 
                    type="text" 
                    id="postTitle" 
                    name="postTitle" 
                    placeholder="What's on your mind?"
                    value={title}
                    onChange={onTitleChange} />
                
                <label htmlFor="postContent">Content: </label>
                <input 
                    type="text" 
                    id="postContent" 
                    name="postContent" 
                    value={content}
                    onChange={onContentChange} />
            </form>
            <button type="button" onClick={onSavePostHandler}>Save</button>
        </section>
    )
}

export default EditPostForm