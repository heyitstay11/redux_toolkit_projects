import { Button, Card, Input, Space } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createPost } from '../redux/features/postSlice';
import LoadingCard from './LoadingCard';

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [showPost, setShowPost] = useState(false);
    const dispatch = useDispatch();
    const { post, loading } = useSelector(state => ({...state.app}));

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createPost({ title, body}));
        setTitle(''); setBody('');
        setShowPost(true);
    }

    const Post = () => {
        return (
            <>
            {loading ? (<LoadingCard count={1} />) : (
                <div className="site-card-border-less-wrapper">
                    <Card type='inner' title={post[0]?.title}>
                        <p> User Id: { post[0].id } </p>
                        <span> {post[0]?.body} </span>
                    </Card>
                </div>
            )}
            </>
        )
    }

    return (
       <div className="" style={{ textAlign: 'center'}}>
           <form onSubmit={handleSubmit}>
               <h1>Create Post</h1>
               <Input style={{ width: '400px' }}
                placeholder='Enter Title' type={'text'} onChange={(e) => setTitle(e.target.value)} value={title} />
                <br />
                <br />
                <Input.TextArea style={{ width: '400px' }} size='large'
                    placeholder='Enter Description' onChange={(e) => setBody(e.target.value)} value={body} 
                />
                 <br />
                <br />
                <Space style={{ margin : '10px'}}>
                    <Button type='primary' htmlType='submit'>
                        Submit
                    </Button>
                    <Link to='/' style={{ margin : '10px'}}>Go Back</Link>
                </Space>
           </form>
           <br />
            <br />
            {(showPost && post[0]) && (<Post />)}
       </div>
    )
}

export default CreatePost;
