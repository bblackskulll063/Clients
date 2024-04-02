import { collection, doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { db } from '../config/firebase';
import { toast } from 'react-toastify';

const View = () => {

  const [CurrentClient, setCurrentClient] = useState();

  const ClientCollectionsRef = collection(db, "clients");
  const { id } = useParams();

  useEffect(() => {
    onSnapshot(ClientCollectionsRef, async (data) => {
      try {
        const filterData = data.docs.map((client) => ({
          ...client.data(),
          id: client.id,
        }));
        const dataForView = filterData.find((client) => client.id === id);
        setCurrentClient(dataForView);
      } catch (err) {
        toast.error(err)
      }
    })
  }, [id])

  return (
    <div className='view-page'>
      <div className="card">
        <div className="card-header">
        <p>Client Contact Details</p>
        </div>
        <div className="container">
            <div className="card-item d-flex">
                <strong>ID : </strong>
                <p>{CurrentClient?.id}</p>
            </div>
            <div className="card-item d-flex">
                <strong>Full Name : </strong>
                <p>{CurrentClient?.name}</p>
            </div>
            <div className="card-item d-flex">
                <strong>Email : </strong>
                <p>{CurrentClient?.email}</p>
        
            </div>
            <div className="card-item d-flex">
                <strong>Phone Number : </strong>
                <p>{CurrentClient?.phone}</p>
            </div>

            <a href="/">
              <button className='btn btn-info'>Go Back</button>
            </a>
          </div>
        </div>
      </div>
  )
}

export default View
