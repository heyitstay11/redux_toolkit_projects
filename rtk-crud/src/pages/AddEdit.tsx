import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAddContactMutation, useContactQuery, useUpdateContactMutation } from "../services/contactApi";
import "./AddEdit.css";

const initialState = {
    name: '',
    email: '',
    contact: ''
} 

const AddEdit = () => {
    const { id } = useParams();
    const [formValue, setFormValue] = useState(initialState);
    const [addContact] = useAddContactMutation();
    const [updateContact] = useUpdateContactMutation();
    const { data } = useContactQuery(id!);
    const [editMode, setEditMode] = useState(false);
    const { name, email, contact} = formValue;
    const navigate = useNavigate();
   

    useEffect(() => {
        if(id){
            setEditMode(true);
            if(data){
                setFormValue({...data});
            }
        }else{
            setEditMode(false);
            setFormValue({...initialState});
        }
    }, [id, data]);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if(!name && !email && !contact){
            toast.error('Please add Data');
        }else{
            if(editMode){
                return updateContact(formValue).then((res) => navigate('/'));
            }
             addContact(formValue).then((res) => { navigate('/')});
        }
    }

    return (
        <div className="" style={{ marginTop: '100px'}}>
            <form onSubmit={handleSubmit} style={{ margin: 'auto', padding: '15px', maxWidth: '400px', alignContent: 'center'}} >
               
                <label htmlFor="name">Name</label>
                <input type="text" id='name' name='name' placeholder="Enter Name ..." value={name} onChange={(e) => setFormValue({...formValue, name: e.target.value}) } />
                
                <label htmlFor="email">Email</label>
                <input type="email" id='email' name='email' placeholder="Enter Email ..." value={email} onChange={(e) => setFormValue({...formValue, email: e.target.value}) } />
                
                <label htmlFor="contact">Contact</label>
                <input type="number" id='contact' name='contact' placeholder="Enter Contact ..." value={contact} onChange={(e) => setFormValue({...formValue, contact : e.target.value}) } />

                <input type="submit" value={editMode ? 'Update': 'Add'} />

            </form>
        </div>
    )
}

export default AddEdit;