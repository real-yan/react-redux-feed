import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { postAdded } from './postsSlice'

const AddPostForm = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const dispatch = useDispatch()

    const onTitleChange = e => setTitle(e.target.value)
    const onContentChange = e => setContent(e.target.value)

    const onSavePostHandler = () => {
        if(title && content) { 
            dispatch(postAdded(title, content))
            setTitle('')
            setContent('')
        }
    }

    return (
        <section>
            <h2>Add a New Post</h2>
            <form>
                <label htmlFor="postTitle">Post Title: </label>
                <input 
                    type="text" 
                    id="postTitle" 
                    name="postTitle" 
                    placeholder="What's on your mind?" 
                    value={title} 
                    onChange={onTitleChange}/>
                
                <label htmlFor="postContent">Content: </label>
                <textarea id="postContent" name="postContent" value={content} onChange={onContentChange}/>
            </form>
            <button type="button" onClick={onSavePostHandler}>Save</button>
        </section>
    )
}

export default AddPostForm