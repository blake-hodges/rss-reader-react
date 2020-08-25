import React, { Component } from 'react';

function Entry(props) {
    return (
        <div className="feed-entry">
            <h5 className="entry-title">{props.title}</h5>
            <span className="entry-author">{props.author}</span>
            <p className="entry-content">{props.content}</p>
            <p className="entry-date">{props.date}</p>
            <a className="entry-link" href={props.link}>Read Post</a>
        </div>
    )
}

export default Entry;
