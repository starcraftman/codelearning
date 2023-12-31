import React, { Component } from 'react';

import Image from '../../../components/Image/Image';
import './SinglePost.css';

const SITE = 'http://localhost:8080'

class SinglePost extends Component {
  state = {
    title: '',
    author: '',
    date: '',
    image: '',
    content: ''
  };

  componentDidMount() {
    const postId = this.props.match.params.postId;
    console.log('mounted', `${SITE}/feed/post/${postId}`)

    let graphqlQuery = {
      query: `
      {
        getPost(postId:  "${postId}") {
          _id
          title
          content
          imageUrl
          creator {
            name
          }
          createdAt
        }
      }
      `
    }
    fetch(`${SITE}/graphql`, {
      method: "POST",
      body: JSON.stringify(graphqlQuery),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.props.token}`
      }
    })
      .then(res => {
        return res.json();
      })
      .then(resData => {
        console.log('returned', resData);
        resData = resData.data.getPost;
        console.log('resdat', resData)
        this.setState({
          title: resData.title,
          author: resData.creator.name,
          image: `${SITE}/${resData.imageUrl}`,
          date: new Date(resData.createdAt).toLocaleDateString('en-US'),
          content: resData.content
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <section className="single-post">
        <h1>{this.state.title}</h1>
        <h2>
          Created by {this.state.author} on {this.state.date}
        </h2>
        <div className="single-post__image">
          <Image contain imageUrl={this.state.image} />
        </div>
        <p>{this.state.content}</p>
      </section>
    );
  }
}

export default SinglePost;
