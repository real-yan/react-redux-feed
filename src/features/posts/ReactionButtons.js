import React from 'react'
import { useDispatch } from 'react-redux'

import { reactionAdded } from './postsSlice'

const reactionEmoji = {
    thumbsUp: '👍',
    hooray: '🎉',
    heart: '❤️'
}

const ReactionButtons = ({ post }) => {
    const dispatch = useDispatch()
    
    return (
        <div>
            { Object.entries(reactionEmoji).map(([name, emoji]) => 
                {
                    return (
                        <button 
                            key={name} 
                            type="button" 
                            className="muted-button reaction-button" 
                            onClick={() => 
                                dispatch(reactionAdded({postId: post.id, reaction: name}))
                            }>
                            { emoji } { post.reactions[name] }
                        </button>
                    )     
                }) 
            }
        </div>
    )
}

export default ReactionButtons