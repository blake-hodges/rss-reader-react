import React, { Component } from 'react';
import { parseTynanXML, parseSiversXML, parseZakasXML, sortByDate } from './utils.js';

class FeedWrapper extends Component {
    state = {
        posts : [],
        unsortedPosts : []
    }

    componentDidMount(){
        fetch("https://cors-anywhere.herokuapp.com/http://feeds.feedburner.com/tynan?format=xml")
        .then(res => res.text())
        .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
        .then(data => {
            let posts = this.state.posts;
            let newPosts = parseTynanXML(data);
            this.setState({
                posts: [],
                unsortedPosts: newPosts
            })
            fetch("https://cors-anywhere.herokuapp.com/https://sivers.org/en.atom")
            .then(res => res.text())
            .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
            .then(data => {

                let posts = parseSiversXML(data);
                let oldPosts = this.state.unsortedPosts;
                let updatedPosts = oldPosts.concat(posts);
                this.setState({
                    posts: [],
                    unsortedPosts: updatedPosts
                })
                fetch("https://cors-anywhere.herokuapp.com/http://feeds.feedburner.com/nczonline?format=xml")
                .then(res => res.text())
                .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
                .then(data => {

                    let posts = parseZakasXML(data);
                    let oldPosts = this.state.unsortedPosts;
                    let updatedPosts = oldPosts.concat(posts);
                    this.setState({
                        posts: [],
                        unsortedPosts: updatedPosts
                    })

                    let sortedPosts = this.state.unsortedPosts.sort(sortByDate).reverse();
                    this.setState({
                        posts: sortedPosts
                    })

                })
                .catch((error) => console.log(error));

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
