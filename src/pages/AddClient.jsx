import { addDoc, collection, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import {  db } from '../config/firebase';
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { HiStatusOnline } from "react-icons/hi";
import { useNavigate, useParams } from 'react-router-dom';

const initialeState = {
    name: '',
    email: '',
    phone: '',
    status: '',
};

const AddClient = () => {
    const [newClient, setnewClient] = useState(initialeState)
    const { name, email, phone, status } = newClient;
    const [ClientList, setClientList] = useState([]);

    const ClientCollectionsRef = collection(db, "clients");
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        onSnapshot(ClientCollectionsRef, async (data) => {
            try {
                const filterData = data.docs.map((client) => ({
                    ...client.data(),
                    id: client.id,
                }));
                setClientList(filterData);
            } catch (err) {
                console.error(err)
            }
        })
    }, [id])

    useEffect(() => {
        if (id) {
            const client = ClientList.find((client) => client.id === id);
            setnewClient({ ...client });
        }
        else {
            setnewClient({ ...initialeState });
        }

        return () => {
            setnewClient({ ...initialeState });
        }
    }, [id, ClientList])


    const onSubmitNewClient = async (e) => {
        if (!name || !email || !phone || !status) {
            toast.error("Please fill all the fields")
        }
        else if(!id){
            try {
                await addDoc(ClientCollectionsRef, {
                    name: name,
                    email: email,
                    phone: phone,
                    status: status,
                    userId: localStorage.getItem('user')
                })
                toast.success("Client added successfully")
                setnewClient(initialeState);
            } catch (err) {
                toast.error(err);
            }
                
        }
        else {
            const datatoUpdate = doc(db, "clients",id);
            await updateDoc(datatoUpdate, {
                name: name,
                email: email,
                phone: phone,
                status: status,
            })
                .then(() => {
                    toast.success("Update Successfully")
                    setnewClient(initialeState);
                    navigate("/home");
                })
                .catch((error) => {
                    toast.error(error.message)
                })
        }
    };

    const handleOnChange = (e) => {
        setnewClient({
            ...newClient,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className='container add-client-page'>
            <div className='addClient-form' >
                <div className="form-group d-flex">
                    <FaUser size={25} className='icons' />
                    <input type="text" className="form-control" placeholder='Full Name' name='name' value={name} onChange={handleOnChange} />
                </div>
                <div className="form-group d-flex">
                    <MdEmail size={30} className='icons' />
                    <input type="text" className="form-control" placeholder='Email' name='email' value={email || ''} onChange={handleOnChange} />
                </div>
                <div className="form-group d-flex">
                    <FaPhoneAlt size={25} className='icons' />
                    <input type="text" className="form-control" placeholder='Phone Number' name='phone' value={phone || ''} onChange={handleOnChange} />
                </div>
                <div className="form-group d-flex">
                    <HiStatusOnline size={30} className='icons' />
                    <input type="text" className="form-control" placeholder='Status' name='status' value={status || ''} onChange={handleOnChange} />
                </div>
                <button type="submit" className="btn" onClick={onSubmitNewClient}>{id?"Update":"Save"}</button>
            </div>
        </div>
    )
}

export default AddClient
