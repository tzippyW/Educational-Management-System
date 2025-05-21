
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUpdate } from "./UpdatesSlice"; 

const UpdateForm = ({ onClose, update }) => {
  const dispatch = useDispatch();
  const [updateData, setUpdateData] = useState({
    title: "",
    start: new Date(),
    end: new Date(),
    updateMessage: "",
  });

  useEffect(() => {
    if (update) {
      setUpdateData({
        title: update.title,
        start: new Date(update.start),
        end: new Date(update.end),
        updateMessage: update.updateMessage,
      });
    }
  }, [update]);

  const handleChange = (e) => {
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    setUpdateData({ ...updateData, start: selectedDate, end: selectedDate });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updateId = update ? update.id : Date.now(); 
    dispatch(addUpdate({ ...updateData, id: updateId }));
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} style={{ background: "#eee", padding: "10px", borderRadius: "8px", marginBottom: "10px" }}>
      <label>
        עידכון:
        <input type="text" name="title" value={updateData.title} onChange={handleChange} required />
      </label>
      <br />
      <label>
        פירוט עידכון
        <input type="text" name="updateMessage" value={updateData.updateMessage} onChange={handleChange} required />
      </label>
      <br />
      <label>
        תאריך:
        <input type="date" name="start" value={updateData.start.toISOString().split('T')[0]} onChange={handleDateChange} required />
      </label>
      <br />
      <button type="submit">✅ שמור עידכון</button>
      <button type="button" onClick={onClose}>❌ ביטול</button>
    </form>
  );
};

export default UpdateForm;
