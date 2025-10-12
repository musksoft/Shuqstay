import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../calendarStyles.css"

const TenantEvents = ({ events, onEventAdd, onEventDelete }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAdd = () => {
    if (!title.trim()) {
      alert("Title is required");
      return;
    }

    onEventAdd({
      title,
      description,
      date: selectedDate,
    });

    setTitle("");
    setDescription("");
  };

  const todaysEvents = events.filter(
    (ev) => ev.date.toDateString() === selectedDate.toDateString()
  );

  return (
    <div className="p-4">
      {/* Calendar */}
      <div className="flex justify-center">
        <Calendar
          value={selectedDate}
          onChange={setSelectedDate}
          className="calendar-custom bg-[#f7e6d4] p-4 rounded-lg shadow-md w-full max-w-4xl text-lg"
          tileClassName={({ date, view }) => {
            const isSelected =
              date.toDateString() === selectedDate.toDateString();
            const isToday =
              date.toDateString() === new Date().toDateString();

            return `${
              isSelected
                ? "bg-[#8B4513] text-white rounded-tl-xl"
                : isToday
                ? "border border-[#8B4513] text-[#8B4513] font-semibold"
                : ""
            }`;
          }}
          formatMonthYear={(locale, date) => (
            <span className="text-[#8B4513] font-italiana text-2xl text-center block">
              {date.toLocaleString("default", { month: "long", year: "numeric" })}
            </span>
          )}
        />
      </div>

      {/* Event List */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">
        Events for {selectedDate.toDateString()}
      </h2>

      {todaysEvents.length > 0 ? (
        todaysEvents.map((ev) => (
          <div key={ev.id} className="p-4 bg-[#fef3e6] rounded-lg my-2 shadow">
            <h4 className="font-semibold text-[#8B4513]">{ev.title}</h4>
            <p className="text-sm text-gray-700">{ev.description}</p>
            <button
              onClick={() => onEventDelete(ev.id)}
              className="mt-2 px-3 py-1 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No events for this day.</p>
      )}

      {/* Add Event */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">Add New Event</h3>
        <input
          type="text"
          placeholder="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="block border border-gray-300 p-2 rounded mb-2 w-full"
        />
        <textarea
          placeholder="Event Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="block border border-gray-300 p-2 rounded mb-2 w-full"
        />
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-[#8B4513] text-white rounded"
        >
          Add Event
        </button>
      </div>
    </div>
  );
};

export default TenantEvents;
