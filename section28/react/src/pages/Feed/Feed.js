import React, { Component, Fragment } from 'react';

import Post from '../../components/Feed/Post/Post';
import Button from '../../components/Button/Button';
import FeedEdit from '../../components/Feed/FeedEdit/FeedEdit';
import Input from '../../components/Form/Input/Input';
import Paginator from '../../components/Paginator/Paginator';
import Loader from '../../components/Loader/Loader';
import ErrorHandler from '../../components/ErrorHandler/ErrorHandler';
import './Feed.css';
import image from '../../components/Image/Image';

const SITE = 'http://localhost:8080'

class Feed extends Component {
  state = {
    isEditing: false,
    posts: [],
    totalPosts: 0,
    editPost: null,
    status: '',
    postPage: 1,
    postsLoading: true,
    editLoading: false
  };

  componentDidMount() {
    let graphqlQuery = {
      query: `
        {
          getUser {
            status
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
        if (resData.errors) {
          console.log(resData.errors);
          throw new Error("Failed to fetch status.");
        }
        this.setState({ status: resData.data.getUser.status });
      })
      .catch(this.catchError);

    this.loadPosts();
  }

  loadPosts = direction => {
    if (direction) {
      this.setState({ postsLoading: true, posts: [] });
    }
    let page = this.state.postPage;
    if (direction === 'next') {
      page++;
      this.setState({ postPage: page });
    }
    if (direction === 'previous') {
      page--;
      this.setState({ postPage: page });
    }

    let graphqlQuery = {
      variables: {
        page: page
      },
      query: `
      query FetchPosts($page: Int!){
        getPosts(page: $page) {
          totalItems
          posts {
            _id
            title
            imageUrl
            content
            creator {
              name
            }
            createdAt
          }
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
        resData = resData.data.getPosts;
        console.log(resData);
        this.setState({
          posts: resData.posts.map((post) => {
            return {
              ...post,
              imagePath: post.imageurl
            }
          }),
          totalPosts: resData.totalItems,
          postsLoading: false
        });
      })
      .catch(this.catchError);
  };

  statusUpdateHandler = event => {
    event.preventDefault();
    let graphqlQuery = {
      variables: {
        status: this.state.status
      },
      query: `
        mutation SetStatus($status: String!) {
          setStatus(newStatus: $status) {
            status
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
        console.log(resData);
      })
      .catch(this.catchError);
  };

  newPostHandler = () => {
    this.setState({ isEditing: true });
  };

  startEditPostHandler = postId => {
    this.setState(prevState => {
      const loadedPost = { ...prevState.posts.find(p => p._id === postId) };

      return {
        isEditing: true,
        editPost: loadedPost
      };
    });
  };

  cancelEditHandler = () => {
    this.setState({ isEditing: false, editPost: null });
  };

  finishEditHandler = postData => {
    this.setState({
      editLoading: true
    });
    // Set up data (with image!)
    const formData = new FormData()
    formData.append('image', postData.image)
    if (this.state.editPost) {
      formData.append('image', this.state.editPost.imagePath)
    }
    fetch(`${SITE}/post-image`, {
      method: 'PUT',
      body: formData,
      headers: {
        'Authorization': `Bearer ${this.props.token}`
      }
    })
    .then(res => {
      return res.json();
    })
    .then(resData => {
      console.log('fileUpload resData', resData);
      const imageUrl = resData.filePath;

      let graphqlQuery = {
        variables: {
          title: postData.title,
          content: postData.content,
          imageUrl: imageUrl
        },
        query: `
          mutation CreatePost($title: String!, $content: String!, $imageUrl: String!) {
            createPost(input: {
              title: $title,
              content: $content,
              imageUrl: $imageUrl
            }) {
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
      if (this.state.editPost) {
        graphqlQuery = {
          variables: {
            postId: this.state.editPost._id,
            title: postData.title,
            content: postData.content,
            imageUrl: imageUrl ? imageUrl : "undefined"
          },
          query: `
          mutation UpdatePost($postId: ID!, $title: String!, $content: String!, $imageUrl: String!) {
            updatePost(
              postId: $postId, 
              input: {
                title: $title,
                content: $content,
                imageUrl: $imageUrl
              }) {
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
      }
      console.log(graphqlQuery);
      return fetch(`${SITE}/graphql`, {
        method: "POST",
        body: JSON.stringify(graphqlQuery),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.props.token}`
        }
      })
    })
    .then(res => {
      return res.json();
    })
    .then(resData => {
      console.log('resData', resData);
      if (resData.errors && resData.code === 401) {
        throw new Error('Validation failed.');
      }
      if (resData.errors) {
        console.log(resData.errors);
        throw new Error("Login failed!");
      }
      if (this.state.editPost) {
        resData = resData.data.updatePost;
      } else {
        resData = resData.data.createPost;
      }
      const post = {
        _id: resData._id,
        title: resData.title,
        content: resData.content,
        creator: resData.creator,
        createdAt: resData.createdAt,
        imagePath: resData.imageUrl
      };
      this.setState(prevState => {
        let updatedPosts = [...prevState.posts];
        let updatedTotalPosts = prevState.totalPosts;
        if (prevState.editPost) {
          const postIndex = prevState.posts.findIndex(
            p => p._id === prevState.editPost._id
          );
          updatedPosts[postIndex] = post;
        } else {
          updatedTotalPosts += 1;
          if (prevState.posts.length >= 2) {
            updatedPosts.pop();
          }
          updatedPosts.unshift(post);
        }
        return {
          posts: updatedPosts,
          isEditing: false,
          editPost: null,
          editLoading: false,
          totalPosts: updatedTotalPosts
        };
      });        
    })
    .catch(err => {
      console.log(err);
      this.setState({
        isEditing: false,
        editPost: null,
        editLoading: false,
        error: err
      });
    });
  };

  statusInputChangeHandler = (input, value) => {
    this.setState({ status: value });
  };

  deletePostHandler = postId => {
    this.setState({ postsLoading: true });
    const graphqlQuery = {
      variables: {
        postId: postId
      },
      query: `
      mutation DeletePost($postId: String!) {
        deletePost (postId: $postId) {
          message
        }
      } 
      `
    }
    
    fetch(`${SITE}/graphql`, {
      method: 'POST',
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
        console.log(resData);
        this.loadPosts();
        // this.setState(prevState => {
        //   const updatedPosts = prevState.posts.filter(p => p._id !== postId);
        //   return { posts: updatedPosts, postsLoading: false };
        // });
      })
      .catch(err => {
        console.log(err);
        this.setState({ postsLoading: false });
      });
  };

  errorHandler = () => {
    this.setState({ error: null });
  };

  catchError = error => {
    this.setState({ error: error });
  };

  render() {
    return (
      <Fragment>
        <ErrorHandler error={this.state.error} onHandle={this.errorHandler} />
        <FeedEdit
          editing={this.state.isEditing}
          selectedPost={this.state.editPost}
          loading={this.state.editLoading}
          onCancelEdit={this.cancelEditHandler}
          onFinishEdit={this.finishEditHandler}
        />
        <section className="feed__status">
          <form onSubmit={this.statusUpdateHandler}>
            <Input
              type="text"
              placeholder="Your status"
              control="input"
              onChange={this.statusInputChangeHandler}
              value={this.state.status}
            />
            <Button mode="flat" type="submit">
              Update
            </Button>
          </form>
        </section>
        <section className="feed__control">
          <Button mode="raised" design="accent" onClick={this.newPostHandler}>
            New Post
          </Button>
        </section>
        <section className="feed">
          {this.state.postsLoading && (
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <Loader />
            </div>
          )}
          {this.state.posts.length <= 0 && !this.state.postsLoading ? (
            <p style={{ textAlign: 'center' }}>No posts found.</p>
          ) : null}
          {!this.state.postsLoading && (
            <Paginator
              onPrevious={this.loadPosts.bind(this, 'previous')}
              onNext={this.loadPosts.bind(this, 'next')}
              lastPage={Math.ceil(this.state.totalPosts / 2)}
              currentPage={this.state.postPage}
            >
              {this.state.posts.map(post => (
                <Post
                  key={post._id}
                  id={post._id}
                  author={post.creator.name}
                  date={new Date(post.createdAt).toLocaleDateString('en-US')}
                  title={post.title}
                  image={post.imageUrl}
                  content={post.content}
                  onStartEdit={this.startEditPostHandler.bind(this, post._id)}
                  onDelete={this.deletePostHandler.bind(this, post._id)}
                />
              ))}
            </Paginator>
          )}
        </section>
      </Fragment>
    );
  }
}

export default Feed;
