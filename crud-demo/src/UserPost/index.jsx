import { Button, Card, Input, Space } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { getPost } from '../redux/features/postSlice'
import LoadingCard from './LoadingCard';

const Home = () => {
    const [id, setId] = useState(null);
    const dispatch = useDispatch();
    const { post, loading, error } = useSelector(state => ({...state.app}));
    console.log(post, 'po');
    const fetchUserPost = () => {
        if(id){
            dispatch(getPost(id));
            setId('')
        }
    }

    return (
        <>
            <div className="container" style={{ textAlign: 'center'}}>
                <h2>Fetch Post</h2>
                <Input placeholder='Enter User Id' style={{ width: '300px'}} type="number" onChange={(e) => setId(e.target.value)} />
                <br />
                <br />
                <Space size='small' style={{ margin: 10 }} >
                    <Button type='primary' onClick={fetchUserPost} >Fetch User Post</Button>
                    <Link to={'/createPost'} ><Button type='primary'>Create User Post</Button></Link>
                </Space>
            </div>
            <br />
            <br />
            {loading ? (<LoadingCard count={1} />) : (
                <>
                {post.length > 0 && (
                    <div className="site-card-border-less-wrapper">
                    <Card type='inner' title={post[0]?.title} >
                      <p>User Id: {post[0]?.id} </p>
                      <span>{post[0]?.body}</span>
                    </Card>
                    <Space size='middle' style={{ marginTop: 30, marginLeft: 5, float: 'right', textAlign: 'center'}}>
                        <Button type='primary' danger >Delete</Button>
                        <Button type='primary' >Edit</Button>
                    </Space>    
                    </div>
                )}
                </>
            ) }
        </>
    )
}

export default Home;
