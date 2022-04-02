import { Button, Card, Input, Space } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { deletePost, getPost, setEdit, updatePost } from '../redux/features/postSlice'
import LoadingCard from './LoadingCard';
import { useEffect } from 'react';

const Home = () => {
    const [id, setId] = useState(null);
    const [newDesc, setNewDesc] = useState('');
    const dispatch = useDispatch();
    const { post, loading, error, edit, body } = useSelector(state => ({...state.app}));

    const fetchUserPost = () => {
        if(id){
            dispatch(getPost(id));
            setId('')
        }
    }

    useEffect(() => {
        setNewDesc(body);
    }, [body])

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
                    <div className="site-card-border-less-wrapper" style={{ textAlign: 'center'}}>
                    <Card type='inner' title={post[0]?.title} >
                      <p>User Id: {post[0]?.id} </p>
                      {edit ? (
                          <>
                           <Input.TextArea rows={4} value={newDesc} style={{ width: '400px'}} onChange={(e) => setNewDesc(e.target.value) }/>
                           <br />
                           <Space size={'middle'} style={{ marginLeft: '5px', marginTop: '5px' }}>
                            <Button type='primary' 
                            onClick={() => {
                                dispatch(updatePost({ id: post[0]?.id, body: newDesc }));
                                dispatch(setEdit({ edit: false, body: '' }));
                            }} >Save
                            </Button>
                            
                            <Button type='primary' danger onClick={() => dispatch(setEdit({ edit: false, body: '' }))}>Cancel</Button>
                           </Space>
                          </>
                          ) : (
                        <span>{post[0]?.body}</span>
                      )}
                    </Card>
                    {!edit ? (
                     <Space size='middle' style={{ marginTop: 30, marginLeft: 5, float: 'right', textAlign: 'center'}}>
                        <Button type='primary' danger onClick={() => dispatch(deletePost(post[0]?.id))} >Delete</Button>
                        <Button type='primary' onClick={() => dispatch(setEdit( {edit: true, body: post[0]?.body }))}>Edit</Button>
                     </Space>  
                    ) : null}  
                    </div>
                )}
                </>
            ) }
        </>
    )
}

export default Home;
