import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Navigate } from "react-router-dom";
import Table from 'react-bootstrap/Table';


const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const storedToken = localStorage.getItem("token");
  const datauser = JSON.parse(storedToken);
  console.log('getToken: ', datauser.token);


  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/items');
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

  const addItem = async () => {
    const username = datauser.username
    console.log(name, description, username);
    try {
      const response = await axios.post('http://localhost:3001/api/items', { name, description, username });
      setItems([...items, response.data]);
      setName('');
      setDescription('');
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const updateItem = async (id, newName, newDescription) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/api/items/${id}`,
        { name: newName, description: newDescription }
      );
      setItems(items.map(item => item._id === id ? response.data : item));
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/items/${id}`);
      setItems(items.filter(item => item._id !== id));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  if (!datauser.token) {
    return <Navigate to="/login" replace />;
  }
  return (
    <>
      <h1>Dashboard: {datauser.username}</h1>
      <div>
        <h1>CRUD Application</h1>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={addItem}>Add Item</button>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id}>
                <td>{item.username}</td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>
                  <button onClick={() => updateItem(item._id, item.name, item.description)}>Update</button>
                  <button onClick={() => deleteItem(item._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  )
}

export default Dashboard
