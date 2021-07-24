import React from 'react'
import { parseISO, formatDistanceToNow } from 'date-fns'

const TimeAgo = ({ timestamp }) => {
    let timeAgo = ''

    if(timestamp) {
        const timePeriod = formatDistanceToNow(parseISO(timestamp))
        timeAgo = `${timePeriod} ago`
    }

    return (
        <span title={timestamp}>
            &nbsp;<i>{timeAgo}</i>
        </span>
    )
}

export default TimeAgo