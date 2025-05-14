
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import EventForm from "../features/events/EventForm";
import { deleteEvent } from "../features/events/EventsSlice";
import { deleteUpdate } from "../features/update/UpdatesSlice";
import UpdateForm from "../features/update/UpdateForm";
import  "../App.css";
const localizer = momentLocalizer(moment);

function Events() {
  const dispatch = useDispatch();
  const updates = useSelector((state) => state.updates);
  const events = useSelector((state) => state.events.filter((event) => event.visible === true));

  const [showForm, setShowForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date()); 
  const [currentEvent, setCurrentEvent] = useState(null); 
  const [currentUpdate, setCurrentUpdate] = useState(null); 
  const [currentView, setCurrentView] = useState('month');

  // State עבור סינון
  const [filterVisible, setFilterVisible] = useState(false);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [filter, setFilter] = useState({
    fromDate: "",
    toDate: "",
    eventType: ""
  });

  const deleteE = (id) => {
    dispatch(deleteEvent({ id }));
  };
  const deleteU = (id) => {
    dispatch(deleteUpdate({ id }));
  };

  const handleFilterChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const applyFilter = () => {
    const from = filter.fromDate ? new Date(filter.fromDate) : null;
    const to = filter.toDate ? new Date(filter.toDate) : null;
    const type = filter.eventType;

    const filtered = events.filter(event => {
      const eventDate = new Date(event.start);
      return (
        (!from || eventDate >= from) &&
        (!to || eventDate <= to) &&
        (!type || event.type === type)
      );
    });

    setFilteredEvents(filtered);
  };

  const CustomEvent = ({ event }) => {
    const eventStyles = {
      "הגשות": { background: "#87cefa" },
      "מפגשים": { background: "#1e90ff" },
      "זום": { background: "#6495ed" },
      "update": { background: "#ffcccb" },
    };

    const defaultStyle = { background: "#E0E0E0" };
    const style = eventStyles[event.type] || defaultStyle;

    return (
      <div style={{ padding: "6px", borderRadius: "1px", ...style }}>
        <span style={{ fontSize: event.type === "update" ? "0.8em" : "0.9em", color: "#333" }}>
          {event.title}
          <br />
          {event.eventMessage}
        </span>
        <span style={{ fontSize: event.type === "update" ? "0.8em" : "0.6em", color: "#333" }}>
          {event.updateMessage}
        </span>
        <br />
        <button onClick={() => event.type === "update" ? deleteU(event.id) : deleteE(event.id)}>
          {event.type === "update" ? "מחיקת עדכון" : "מחיקת אירוע"}
        </button>
        {event.type === "update" ? (
          <button onClick={() => {
            setCurrentUpdate(event);
            setShowUpdateForm(true);
          }}>
            עדכון
          </button>
        ) : (
          <button onClick={() => {
            setCurrentEvent(event);
            setShowForm(true);
          }}>
            עדכון אירוע
          </button>
        )}
      </div>
    );
  };

  const combinedEvents = [
    ...events,
    ...updates.map(update => ({
      ...update,
      start: new Date(update.start),
      end: new Date(update.end),
      type: "update",
    })),
  ];

  return (
    <div>
      <button className="add-button" onClick={() => setShowForm(true)}>➕ הוספת אירוע</button>
      {showForm && <EventForm onClose={() => setShowForm(false)} event={currentEvent} />}
      <button className="add-button" onClick={() => setShowUpdateForm(true)}>➕ הוספת עידכון</button>
      {showUpdateForm && <UpdateForm onClose={() => setShowUpdateForm(false)} update={currentUpdate} />}

      <button className="add-button" onClick={() => setFilterVisible(!filterVisible)}>🔍 סינון</button>
      {filterVisible && (
        <div className="filter-form">
          <input type="date" name="fromDate" value={filter.fromDate} onChange={handleFilterChange} />
          <input type="date" name="toDate" value={filter.toDate} onChange={handleFilterChange} />
          <select name="eventType" value={filter.eventType} onChange={handleFilterChange}>
            <option value="">כל הסוגים</option>
            <option value="הגשות">הגשות</option>
            <option value="מפגשים">מפגשים</option>
            <option value="זום">זום</option>
          </select>
          <button onClick={applyFilter}>סנן</button>
        </div>
      )}

      {filteredEvents.length > 0 && (
        <div className="filtered-popup">
          <h3>תוצאות סינון</h3>
          {filteredEvents.map(event => (
            <div key={event.id}>{event.title} - {event.start.toLocaleDateString()}</div>
          ))}
        </div>
      )}

      <div style={{ height: "500px" }}>
      <Calendar
  localizer={localizer}
  events={combinedEvents}
  startAccessor="start"
  endAccessor="end"
  style={{ height: "700px" }}
  rtl={true}
  components={{ event: CustomEvent }}
  date={currentDate}
  onNavigate={(newDate) => setCurrentDate(newDate)}
  views={['month', 'week', 'day', 'agenda']}
  view={currentView} 
  onView={(view) => setCurrentView(view)}
/>
      </div>
    </div>
  );
}

export default Events;