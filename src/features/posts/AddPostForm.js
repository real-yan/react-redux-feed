import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { postAdded } from './postsSlice'

const AddPostForm = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [userId, setUserId] = useState('')

    const dispatch = useDispatch()

    const users = useSelector(state => state.users)

    const onTitleChange = e => setTitle(e.target.value)
    const onContentChange = e => setContent(e.target.value)
    const onAuthorChange = e => setUserId(e.target.value)

    const canSave = !!title && !!content && !!userId

    const onSavePostHandler = () => { 
        dispatch(postAdded(title, content, userId))
        setTitle('')
        setContent('')
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

                <label htmlFor="postAuthor">Author: </label>
                <select id="postAuthor" value={userId} onChange={onAuthorChange}>
                    <option value=""></option>
                    { users.map(user => (
                        <option key={user.id} value={user.id}> 
                            { user.name }
                        </option>
                    )) }
                </select>
                
                <label htmlFor="postContent">Content: </label>
                <textarea id="postContent" name="postContent" value={content} onChange={onContentChange}/>
            </form>
            <button type="button" onClick={onSavePostHandler} disabled={!canSave}>Save</button>
        </section>
    )
}

export default AddPostForm