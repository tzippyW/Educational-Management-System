
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addEvent } from "./EventsSlice"; 

const EventForm = ({ onClose, event }) => {
  const dispatch = useDispatch();
  const [eventData, setEventData] = useState({
    title: "",
    start: new Date(),
    end: new Date(),
    importance: "1",
    eventMessage: "",
  });

  useEffect(() => {
    if (event) {
      setEventData({
        title: event.title,
        start: new Date(event.start),
        end: new Date(event.end),
        importance: event.importance,
        eventMessage: event.eventMessage,
      });
    }
  }, [event]);

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    setEventData({ ...eventData, start: selectedDate, end: selectedDate });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const eventId = event ? event.id : Date.now(); 
    dispatch(addEvent({ ...eventData, id: eventId, visible: true }));
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} style={{ background: "#eee", padding: "10px", borderRadius: "8px", marginBottom: "10px" }}>
      <label>
        כותרת:
        <input type="text" name="title" value={eventData.title} onChange={handleChange} required />
      </label>
      <br />
      <label>
        פירוט אירוע:
        <input type="text" name="eventMessage" value={eventData.eventMessage} onChange={handleChange} required />
      </label>
      <br />
      <label>
        תאריך:
        <input type="date" name="start" value={eventData.start.toISOString().split('T')[0]} onChange={handleDateChange} required />
      </label>
      <br />
      <label>
        חשיבות:
        <select name="importance" value={eventData.importance} onChange={handleChange}>
          <option value="1">נמוכה</option>
          <option value="2">בינונית</option>
          <option value="3">גבוהה</option>
        </select>
      </label>
      <br />
      <button type="submit">✅ שמור אירוע</button>
      <button type="button" onClick={onClose}>❌ ביטול</button>
    </form>
  );
};

export default EventForm;
