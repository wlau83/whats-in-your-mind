import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import axiosInstance from "../api/axiosInstance";
import "react-calendar/dist/Calendar.css";

const ThoughtCalendar = () => {
  const [value, setValue] = useState(new Date());
  const [recordDates, setRecordDates] = useState([]);
  const [selectedDateGroups, setSelectedDateGroups] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const formatDateLocal = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const formatDisplayDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    const date = new Date(Number(year), Number(month) - 1, Number(day));

    return date.toLocaleDateString(undefined, {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const fetchCalendarDates = async () => {
    try {
      const response = await axiosInstance.get("/api/thoughts/calendar/dates");
      setRecordDates(response.data.dates);
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Failed to load calendar dates."
      );
    }
  };

  const fetchThoughtsByDate = async (date) => {
    try {
      const response = await axiosInstance.get(`/api/thoughts/date/${date}`);
      setSelectedDateGroups(response.data.groups || []);
      setSelectedDate(date);
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
          "Failed to load thoughts for this date."
      );
    }
  };

  const handleDateChange = async (date) => {
    setValue(date);

    const dateString = formatDateLocal(date);
    await fetchThoughtsByDate(dateString);
  };

  const getTotalRecords = () => {
    return selectedDateGroups.reduce((total, group) => {
      let count = 0;

      if (group.originalThought) {
        count += 1;
      }

      count += group.followUps?.length || 0;

      return total + count;
    }, 0);
  };

  useEffect(() => {
    fetchCalendarDates();
  }, []);

  return (
    <div className="thought-calendar-card">
      <div className="calendar-header">
        <div>
          <h2>Calendar</h2>
          <p>Review your thoughts by date.</p>
        </div>
      </div>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <Calendar
        onChange={handleDateChange}
        value={value}
        tileClassName={({ date, view }) => {
          if (view === "month") {
            const dateString = formatDateLocal(date);

            if (recordDates.includes(dateString)) {
              return "has-thought";
            }
          }

          return null;
        }}
      />

      {selectedDate && (
        <div className="calendar-thoughts-panel">
          <div className="calendar-selected-date-header">
            <h3>{formatDisplayDate(selectedDate)}</h3>
            <span>{getTotalRecords()} record(s)</span>
          </div>

          {selectedDateGroups.length === 0 ? (
            <p className="calendar-empty-text">No thoughts on this date.</p>
          ) : (
            <div className="calendar-thread-list">
              {selectedDateGroups.map((group) => (
                <div
                  key={group.originalThought._id}
                  className="calendar-thread-group"
                >
                  <div className="calendar-original-item">
                    <div className="calendar-thought-meta-row">
                      <span className="thought-type-badge original">
                        Original
                      </span>

                      <small>
                        {new Date(
                          group.originalThought.createdAt
                        ).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </small>
                    </div>

                    <p className="calendar-thought-content">
                      {group.originalThought.content}
                    </p>

                    <div className="calendar-thought-footer">
                      <span>Mood: {group.originalThought.mood}</span>

                      {group.originalThought.tags?.length > 0 && (
                        <span>
                          Tags: {group.originalThought.tags.join(", ")}
                        </span>
                      )}
                    </div>
                  </div>

                  {group.followUps?.length > 0 && (
                    <div className="calendar-followup-list">
                      {group.followUps.map((followUp) => (
                        <div
                          key={followUp._id}
                          className="calendar-followup-item"
                        >
                          <div className="calendar-thought-meta-row">
                            <span className="thought-type-badge follow-up">
                              Follow-up
                            </span>

                            <small>
                              {new Date(followUp.createdAt).toLocaleTimeString(
                                [],
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )}
                            </small>
                          </div>

                          <p className="calendar-thought-content">
                            {followUp.content}
                          </p>

                          <div className="calendar-thought-footer">
                            <span>Mood: {followUp.mood}</span>

                            {followUp.tags?.length > 0 && (
                              <span>Tags: {followUp.tags.join(", ")}</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ThoughtCalendar;