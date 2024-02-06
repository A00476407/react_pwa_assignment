import React, { useState, useEffect } from 'react';
import { insertData, getAllData, deleteData, updateData } from './DataManager';

const FormComponent = () => {
  const [item, setItem] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getAllData();
      setData(result);
    };

    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    insertData(item, false);
    setItem('');
    refreshList();
  };  

  const refreshList = async () => {
    const updatedData = await getAllData();
    setData(updatedData);
  };

  const handleDelete = async (id) => {
    await updateData(id, true);
    refreshList();
  };

  return (
    <>
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='Enter item'
        value={item}
        onChange={(e) => setItem(e.target.value)}
      />
      <button type='submit'>Submit</button>
    </form>
    <ul>
      {data.map((item) => (
        <li key={item.id}>
          {item.completed ? <span style={{textDecorationLine: 'line-through', textDecorationStyle: 'solid'}}>
          {item.item}</span>:item.item} {item.completed ? <></>:<button onClick={() => handleDelete(item.id)}> Completed</button>}
        </li>
      ))}
    </ul>
    </>
  );
};

export default FormComponent;