import { Button, Input, Space } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    const [id, setId] = useState(null);
    const fetchUserPost = () => {

    }

    return (
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
    )
}

export default Home;
