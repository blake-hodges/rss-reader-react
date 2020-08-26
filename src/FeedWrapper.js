import React, { Component } from 'react';

class FeedWrapper extends Component {
    state = {
        posts : []
    }

    componentDidMount(){
        //fetch("https://cors-anywhere.herokuapp.com/http://feeds.feedburner.com/tynan")
        fetch("https://jsonplaceholder.typicode.com/posts")
        .then(res => res.json())
        .then(data => {
            console.log(data);
            this.setState({
                posts: data
            })


        })
    }
    render() {

        const posts = this.state.posts.map(post => {
            return (
                <div className="feed-entry" key={post.id}>
                    <h5 className="entry-title">{post.title}</h5>
                    <span className="entry-author">Blake Hodges</span>
                    <p className="entry-content">{post.body}</p>
                    <p className="entry-date">June 10, 3000</p>
                    <a href="https://google.com" className="entry-link">Read More</a>
                </div>
            )
        })

        return (
            <div>
                <div className="feed-wrapper">
                    {posts}
                </div>
            </div>
        )
    }
}

export default FeedWrapper;
