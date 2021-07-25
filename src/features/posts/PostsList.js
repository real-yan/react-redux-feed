import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { selectAllPosts, fetchPosts } from './postsSlice'

import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionButtons from './ReactionButtons'

const PostsList = () => {
    const dispatch = useDispatch()   
    const posts = useSelector(selectAllPosts)
    
    const postStatus = useSelector(state => state.posts.status)
    const error = useSelector(state => state.posts.error)

    useEffect(() => {
        postStatus === 'idle' && dispatch(fetchPosts())
    }, [postStatus, dispatch]);
    
    const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))

    return (
        <section className="posts-list">
            <h2>Posts</h2>    
            
            { postStatus === 'loading' && <div className="loader">Loading...</div> }

            { postStatus === 'succeeded' && orderedPosts.map(post => (
                <article className="post-excerpt" key={post.id}>
                    <h3>{post.title}</h3>
                    <span>
                        <PostAuthor userId={post.user} />
                        <TimeAgo timestamp={post.date} />
                    </span>
                    <p className="post-content">{ post.content.substring(0, 100) }</p>
                    <ReactionButtons post={post} />
                    <Link to={`/posts/${post.id}`} className="button muted-button">
                        View Post
                    </Link>
                </article>
            ))}

            { postStatus === 'failed' && <div>{error}</div> }
        </section>
    )
}

export default PostsList