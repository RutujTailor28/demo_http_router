import React, { Component } from 'react';
import axios from 'axios'
import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {

    state = {
        posts: [],
        selectedPostId: null
    }

    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/posts').then(response  => {
            const posts = response.data.slice(0,4);
            const updatesPosts = posts.map(post => {
                return {
                    ...post,
                    author:'Rutuj'
                }
            })
            this.setState({posts:updatesPosts})
        });
    }

    postSelectedHandler = (id) => {
        this.setState({selectedPostId:id});
    };

    render () {

        const posts = this.state.posts.map(post => {
                return <Post title={post.title} key={post.id} author={post.author} clicked={() => this.postSelectedHandler(post.id)}/>
        });
        return (
            <div className='Blog'>
                <header>
                    <nav>
                        <ul>
                            <li><a href='/'>Home</a> </li>
                            <li><a href='/new-post'>New Post</a> </li>
                        </ul>
                    </nav>
                </header>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId}/>
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;