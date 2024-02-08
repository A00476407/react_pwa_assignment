import React, { useState, useEffect } from 'react';
import { insertData, getAllData, deleteData, updateData, prioritizeData } from './DataManager';
import { IconContext } from 'react-icons'
import { FaStar, FaTrashAlt, FaRegCheckCircle, FaRegCircle} from 'react-icons/fa'

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
    insertData(item, false, false);
    setItem('');
    refreshList();
  };  

  // get all the data again and setData (to refresh UI)
  const refreshList = async () => {
    const updatedData = await getAllData();
    setData(updatedData);
  };

  // update the item to completed and cancel the 'star'
  const handleUpdate = async (id) => {
    await updateData(id, true, false);
    refreshList();
  };

  // prioritize the item (starred)
  const handlePrioritize = async (id, starred) => {
    await prioritizeData(id, starred);
    refreshList();
  };

  // delete the item
  const handleDelete = async (id) => {
    await deleteData(id);
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
      /> <button type='submit'>Add</button>
    </form>
    
    <ul>
      {data.map((item) => (
        <li key={item.id}>
          {/* Star icon will not be shown if the item is completed. For starred incompleted item, the star color is yellow. Otherwise, it is grey. */}
          {item.completed ? <></> : item.starred ? 
            <button id="starButton" onClick={() => handlePrioritize(item.id, false)}><IconContext.Provider value={{ color: '#FFA500', size: '18px' }}><FaStar /></IconContext.Provider></button> : 
            <button id="starButton" onClick={() => handlePrioritize(item.id, true)}><IconContext.Provider value={{ color: 'grey', size: '18px' }}><FaStar /></IconContext.Provider></button>}
          {/* For completed item, text is crossed-out. */}
          {item.completed ? <span style={{textDecorationLine: 'line-through', textDecorationStyle: 'solid'}}> {item.item} </span>:<span>{item.item} </span>} 
          {/* For incompleted item, show a checkbox icon. */}
          {item.completed ? <></> :
            <button id="checkButton" onClick={() => handleUpdate(item.id)}><IconContext.Provider value={{ color: 'grey', size: '18px' }}><FaRegCheckCircle /></IconContext.Provider></button>}
          {/* Show a trash bin icon for deletion function. */}
          <button id="trashButton" onClick={() => handleDelete(item.id)}><IconContext.Provider value={{ color: 'Black', size: '18px' }}><FaTrashAlt /></IconContext.Provider></button>
        </li>
      ))}
    </ul>
    </>
  );
};

export default FormComponent;