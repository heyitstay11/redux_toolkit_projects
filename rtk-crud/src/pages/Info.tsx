import { Link, useParams } from 'react-router-dom';
import { useContactQuery } from '../services/contactApi';
import './Info.css';

const Info = () => {
    const { id } = useParams();
    const { data, error } = useContactQuery(id!);

    return (
        <div className="" style={{ marginTop: '100px'}}>
            <div className="card">
                <div className="card-header">
                    <p>User Contact Detail</p>
                </div>
                {
                    data && (
                        <div className="container">
                        <strong>Id</strong> &nbsp;
                        <span>{id}</span>
                        <br />
                        <br />
                        <strong>Name</strong> &nbsp;
                        <span>{data.name}</span>
                        <br />
                        <br />
                        <strong>Contact</strong> &nbsp;
                        <span>{data.contact}</span>
                        <br />
                        <br />
                        <strong>Email</strong> &nbsp;
                        <span>{data.email}</span>
                        <br />
                        <br />
                        <Link to='/'>
                            <button className="btn btn-edit">Go Back</button>
                        </Link>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Info;