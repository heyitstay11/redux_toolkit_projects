import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useContactsQuery, useDeleteContactMutation } from "../services/contactApi";
import { toast } from 'react-toastify';
import './Home.css';

const Home = () => {
    const { data, isLoading, error } = useContactsQuery();
    const [ deleteContact ] = useDeleteContactMutation();
    useEffect(() => {
        if(error){
            toast.error('Something went error ')
        }
    },[error]);

    if(isLoading){
        return (
            <div className="">Loading .....</div>
        )
    }

    const handleDelete = async (id: string) => {
        await deleteContact(id);
    }

    return (
        <div className="" style={{ marginTop: '100px', textAlign: 'center'}}>
            <Link to='/addContact'><div className="btn btn-add">Add Contact</div></Link>
            <br />
            <br />
            <table className="styled-table">
                <thead>
                    <tr>
                        <th style={{ textAlign: 'center'}} >Number</th>
                        <th style={{ textAlign: 'center'}} >Name</th>
                        <th style={{ textAlign: 'center'}} >Email</th>
                        <th style={{ textAlign: 'center'}} >Contact</th>
                        <th style={{ textAlign: 'center'}} >Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((item: any, index: number) => {
                        const { id, name, email, contact } = item;
                        return (
                            <tr key={id}>
                                <th scope="row">{index + 1}</th>
                                <td>{name}</td> 
                                <td>{email}</td> 
                                <td>{contact}</td> 
                                <td>
                                    <Link to={`/editContact/${id}`}>
                                        <div className="btn btn-edit">Edit</div>
                                    </Link>
                                    <button className="btn btn-delete" onClick={() => handleDelete(id)}>
                                        Delete
                                    </button>
                                    <Link to={`/info/${id}`}>
                                        <div className="btn btn-view">Info</div>
                                    </Link>
                                </td> 
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Home;