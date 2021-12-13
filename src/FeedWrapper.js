import React, { Component } from 'react';
import { parseTynanXML, parseSiversXML, parseZakasXML, sortByDate } from './utils.js';
import Spinner from './Spinner'

class FeedWrapper extends Component {
    state = {
        posts : [],
        unsortedPosts : []
    }

    componentDidMount(){
        fetch("https://feeds.feedburner.com/tynan?format=xml")
        .then(res => res.text())
        .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
        .then(data => {
            let newPosts = parseTynanXML(data);
            this.setState({
                posts: [],
                unsortedPosts: newPosts
            })
            fetch("https://sivers.org/en.atom")
            .then(res => res.text())
            .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
            .then(data => {

                let newPosts = parseSiversXML(data);
                let oldPosts = this.state.unsortedPosts;
                let updatedPosts = oldPosts.concat(newPosts);
                this.setState({
                    posts: [],
                    unsortedPosts: updatedPosts
                })
                fetch("https://feeds.feedburner.com/nczonline?format=xml")
                .then(res => res.text())
                .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
                .then(data => {

                    let newPosts = parseZakasXML(data);
                    let oldPosts = this.state.unsortedPosts;
                    let updatedPosts = oldPosts.concat(newPosts);
                    this.setState({
                        posts: [],
                        unsortedPosts: updatedPosts
                    })

                    let sortedPosts = this.state.unsortedPosts.sort(sortByDate).reverse();
                    this.setState({
                        posts: sortedPosts
                    })

                })
                .catch((error) => {
                    console.log(error);
                });

            })

        })

    }

    render() {
            const posts = this.state.posts.length ? (
                this.state.posts.map((post, index) => {
                    return (
                        <div className="feed-entry" key={index}>
                            <h5 className="entry-title">{post.title}</h5>
                            <span className="entry-author">{post.site}</span>
                            <p className="entry-content">{post.content}</p>
                            <p className="entry-date">{post.date}</p>
                            <a className="entry-link" href={post.url}>Read More</a>
                        </div>
                    )
                })
            ) : (
                <Spinner />
            )

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
