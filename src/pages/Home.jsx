import React, { useContext, useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import { db } from '../config/firebase';
import { collection, deleteDoc, doc, onSnapshot, query, where } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const [ClientList, setClientList] = useState([]);
    const ClientCollectionsRef = collection(db, "clients");
    const navigate = useNavigate();

    const userIDbyLocal = localStorage.getItem("user");
    const ClientRefWithQuery = query(ClientCollectionsRef, where("userId", "==", userIDbyLocal))


    const getCLientList = () => {
        onSnapshot(ClientRefWithQuery, async (data) => {
            try {
                const filterData = data.docs.map((client) => ({
                    ...client.data(),
                    id: client.id,
                }));
                setClientList(filterData)
            } catch (err) {
                console.error(err)
            }
        })
    }
    useEffect(() => {
        getCLientList();
        if(!localStorage.getItem('user')){
            navigate('/login');
        }
        return () => {
            setClientList({});
        }
    }, [])

    const deleteClient = async (id) => {

        if (window.confirm("Are you sure you want to delete this client?")) {
            try {
                
                await deleteDoc(doc(db, "clients", id));
                toast.success("Client Removed");
                getCLientList();

            } catch (err) {
                toast.error(err);
            }
        }
    }

    return (
        <div className='home-page container '>
            <h1> Clients</h1>
            <Table hover size="md">
                <thead >
                    <tr >
                        <th>No.</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {ClientList.length ? ClientList.map((client, index) => (
                        <tr key={client.id} >
                            <td>{index + 1}</td>
                            <td>{client.name}</td>
                            <td>{client.email}</td>
                            <td>{client.phone}</td>
                            <td>{client.status}</td>
                            <td className='w-25'>
                                <a href={`/update/${client.id}`}>
                                    <button className='btn btn-success'  ><FaEdit size={20} /></button>
                                </a>
                                <button className='btn btn-danger' onClick={() => deleteClient(client.id)} ><MdDelete size={20} /></button>
                                <a href={`/view/${client.id}`}>
                                    <button className='btn btn-secondary' >View</button>
                                </a>

                            </td>

                        </tr>
                    )) :
                        <tr></tr>
                    }

                </tbody>
            </Table>
        </div>
    )
}

export default Home
