import React, { Component } from 'react';

class FeedWrapper extends Component {
    state = {
        posts: [
            {
                title: "title one",
                author: "Blake",
                date: "May 7, 1991",
                content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
                link: "https://google.com"
            },
            {
                title: "title two",
                author: "Ben",
                date: "June 8, 2000",
                content: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.",
                link: "https://bing.com"
            },
            {
                title: "title three",
                author: "AG",
                date: "December 39, 2000",
                content: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
                link: "https://duckduckgo.com"
            }
        ]
    }
    render() {
        const posts = this.state.posts.map((item, index) => {
            return (
                <div className="feed-entry">
                    <h5 className="entry-title">{item.title}</h5>
                    <span className="entry-author">{item.author}</span>
                    <p className="entry-content">{item.content}</p>
                    <p className="entry-date">{item.date}</p>
                    <a href={item.link} className="entry-author">Read More</a>
                </div>
            )
    });

        return (
            <div>
                <div className="feed-wrapper">{posts}</div>
            </div>
        )
    }
}

export default FeedWrapper;
