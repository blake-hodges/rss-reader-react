import React, { Component } from 'react';
import { parseTynanXML, parseSiversXML, parseZakasXML } from './utils.js';

class FeedWrapper extends Component {
    state = {
        posts : []
    }

    componentDidMount(){
        fetch("https://cors-anywhere.herokuapp.com/http://feeds.feedburner.com/tynan?format=xml")
        .then(res => res.text())
        .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
        .then(data => {
            let posts = parseTynanXML(data);
            let oldPosts = this.state.posts;
            let updatedPosts = oldPosts.concat(posts);
            this.setState({
                posts: updatedPosts
            })
            fetch("https://cors-anywhere.herokuapp.com/https://sivers.org/en.atom")
            .then(res => res.text())
            .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
            .then(data => {

                let posts = parseSiversXML(data);
                let oldPosts = this.state.posts;
                let updatedPosts = oldPosts.concat(posts);
                this.setState({
                    posts: updatedPosts
                })
                fetch("https://cors-anywhere.herokuapp.com/http://feeds.feedburner.com/nczonline?format=xml")
                .then(res => res.text())
                .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
                .then(data => {

                    let posts = parseZakasXML(data);
                    let oldPosts = this.state.posts;
                    let updatedPosts = oldPosts.concat(posts);
                    this.setState({
                        posts: updatedPosts
                    })

                })

            })

        })

    }

    render() {
            const posts = this.state.posts.length ? (
                this.state.posts.map((post) => {
                    return (
                        <div className="feed-entry">
                            <h5 className="entry-title">{post.title}</h5>
                            <span className="entry-author">{post.site}</span>
                            <p className="entry-content">{post.content}</p>
                            <p className="entry-date">{post.date}</p>
                            <a className="entry-link" href={post.url}>Read More</a>
                        </div>
                    )
                })
            ) : (<p>no posts yet</p>)

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
