import React, { useContext, useState } from 'react';
import { Modal } from './Modal';
import { EventsContext } from './Providers';
import {
  msInADay,
  CalendarEvent,
  RecurranceFrequency,
  RecurringCalendarEvent,
} from 'use-events-calendar-react';
import { CustomEventProps } from './App';

type EventFormProps = {
  event:
    | CalendarEvent<CustomEventProps>
    | RecurringCalendarEvent<CustomEventProps>;
  hideForm: () => void;
  visible: boolean;
};

type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;

type InputFocusEvent = React.FocusEvent<HTMLInputElement>;

type SubmitEvent = React.FormEvent;

const getInputValue = (e: InputChangeEvent | InputFocusEvent) => {
  return e.currentTarget.value;
};

const getInputNumberValue = (e: InputChangeEvent | InputFocusEvent) => {
  return Number(e.currentTarget.value);
};

const getCheckboxValue = (e: InputChangeEvent) => {
  return e.currentTarget.checked;
};

const formatDate = (date: Date) => {
  const year = `${date.getFullYear()}`;
  const month = `${date.getMonth() + 1}`;
  const day = `${date.getDate()}`;
  return `${year}-${month}-${day}`;
};

const formatDateTime = (dateTime: Date) => {
  const year = `${dateTime.getFullYear()}`;
  const month = `${dateTime.getMonth() + 1}`;
  const day = `${dateTime.getDate()}`;
  const hour = `${dateTime.getHours()}`;
  const minute = `${
    dateTime.getMinutes() < 10
      ? '0' + dateTime.getMinutes()
      : dateTime.getMinutes()
  }`;
  return `${year}-${month}-${day} ${hour}:${minute}`;
};

const getDateFromFormattedDateTime = (formattedDate: string) => {
  const formatRegex = /^(\d{4})-(\d{2})-(\d{2})\s(\d{1,2}):(\d{2})$/;

  const matches = formatRegex.exec(formattedDate);

  if (!matches) return;

  const [fullMatch, year, month, day, hour, minute] = matches;

  return new Date(
    Number(year),
    Number(month) - 1,
    Number(day),
    Number(hour),
    Number(minute),
    0
  );
};

const getDateFromFormattedDate = (formattedDate: string) => {
  const formatRegex = /^(\d{4})-(\d{2})-(\d{2})$/;

  const matches = formatRegex.exec(formattedDate);

  if (!matches) return;

  const [fullMatch, year, month, day] = matches;

  return new Date(Number(year), Number(month) - 1, Number(day || 1));
};

export const EventForm: React.FC<EventFormProps> = ({
  event,
  hideForm,
  visible,
}) => {
  const {
    events: { updateEvent, deleteEvent },
  } = useContext(EventsContext);

  const [allDay, setAllDay] = useState(true);

  const [title, setTitle] = useState<string>(event.title);

  const [description, setDescription] = useState<string>(
    event.description || ''
  );

  const [startDateInput, setStartDateInput] = useState<string>(
    formatDate(event.startDate)
  );

  const [startDate, setStartDate] = useState<Date>(event.startDate);
  const [startTimeHInput, setStartTimeHInput] = useState<number>(
    event.startDate.getHours()
  );

  const [endTimeHInput, setEndTimeHInput] = useState<number>(
    event.endDate.getHours()
  );

  const [startTimeMInput, setStartTimeMInput] = useState<number>(
    event.startDate.getMinutes()
  );

  const [endTimeMInput, setEndTimeMInput] = useState<number>(
    event.endDate.getMinutes()
  );

  const [endDateInput, setEndDateInput] = useState<string>(
    event.endDate ? formatDate(event.endDate) : ''
  );

  const [endDate, setEndDate] = useState<Date>(event.endDate);

  const [recurs, setRecurs] = useState<boolean>(
    'schedule' in event ? event.schedule.recurs : false
  );

  const [frequency, setFrequency] = useState<RecurranceFrequency | undefined>(
    'schedule' in event && recurs
      ? event.schedule.inclusion[0]?.frequency
      : undefined
  );

  const [weekdays, setWeekdays] = useState<string>(
    'schedule' in event
      ? event.schedule.inclusion[0]?.weekdays?.join(',') || ''
      : ''
  );

  const [limit, setLimit] = useState<number | undefined>(
    'schedule' in event ? event.schedule.inclusion[0]?.limit : undefined
  );

  const [interval, setInterval] = useState<number | undefined>(
    'schedule' in event ? event.schedule.inclusion[0]?.interval || 1 : 1
  );

  const getWeekdaysFromString = (string: string): number[] => {
    return string
      .split('')
      .filter((char, charIndex) => charIndex < 7 && Number(char))
      .map((char) => Number(char) % 7)
      .filter((v, i, a) => a.indexOf(v) === i);
  };

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    const value:
      | CalendarEvent<CustomEventProps>
      | RecurringCalendarEvent<CustomEventProps> = {
      ...event,
      title,
      description,
      startDate,
      endDate,
      allDay,
      ...(recurs
        ? {
            schedule: {
              recurs,
              inclusion: [
                {
                  recurs,
                  frequency,
                  limit,
                  weekdays: weekdays
                    ? getWeekdaysFromString(weekdays)
                    : undefined,
                },
              ],
              exclusion: [],
            },
          }
        : undefined),
    };
    updateEvent(value);
    hideForm();
  };

  const handleDelete = () => {
    deleteEvent(event);
    hideForm();
  };

  const changeTitle = (e: InputChangeEvent) => {
    const value = getInputValue(e);
    setTitle(value);
  };

  const changeDescription = (e: InputChangeEvent) => {
    const value = getInputValue(e);
    setDescription(value);
  };

  const changeAllDay = (e: InputChangeEvent) => {
    const value = getCheckboxValue(e);
    setAllDay(value);
  };

  const changeStartDateInput = (e: InputChangeEvent) => {
    const value = getInputValue(e);
    setStartDateInput(value);
  };

  const changeStartHInput = (e: InputChangeEvent) => {
    const value = getInputNumberValue(e);
    setStartTimeHInput(value);
    if (value >= 0 && value <= 23) {
      const newStartDate = new Date(startDate);
      newStartDate.setHours(value);
    }
  };

  const changeStartMInput = (e: InputChangeEvent) => {
    const value = getInputNumberValue(e);
    setStartTimeMInput(value);
    if (value >= 0 && value <= 59) {
      const newStartDate = new Date(startDate);
      newStartDate.setMinutes(value);
    }
  };

  const changeEndHInput = (e: InputChangeEvent) => {
    const value = getInputNumberValue(e);
    setEndTimeHInput(value);
    if (value >= 0 && value <= 23) {
      const newEndDate = new Date(endDate);
      newEndDate.setHours(value);
    }
  };

  const changeEndMInput = (e: InputChangeEvent) => {
    const value = getInputNumberValue(e);
    setEndTimeMInput(value);
    if (value >= 0 && value <= 23) {
      const newEndDate = new Date(endDate);
      newEndDate.setMinutes(value);
    }
  };

  const changeEndDateInput = (e: InputChangeEvent) => {
    const value = getInputValue(e);
    setEndDateInput(value);
  };

  const validateStartDate = (e: InputFocusEvent) => {
    const value = getInputValue(e);

    const candidateStartDate = new Date(value);

    const formattedDate = formatDate(candidateStartDate);

    const formatIsValid = !isNaN(candidateStartDate.getDay());

    if (!formatIsValid) {
      setStartDateInput(formatDate(event.startDate));
      return;
    }

    setStartDate(candidateStartDate);
    setStartDateInput(formattedDate);
  };

  const validateEndDate = (e: InputFocusEvent) => {
    const value = getInputValue(e);

    const candidateEndDate = getDateFromFormattedDate(value);

    if (!candidateEndDate) {
      setEndDateInput('');
      return;
    }

    const formattedDate = formatDate(candidateEndDate);

    const formatIsValid = !isNaN(candidateEndDate.getDay());

    if (!formatIsValid) {
      setEndDateInput('');
      return;
    }

    if (Number(candidateEndDate) - Number(event.startDate) > msInADay) {
      setEndDate(candidateEndDate);
      setEndDateInput(formattedDate);
    }
  };

  const toggleRepeat = () => {
    setRecurs(!recurs);
  };

  const changeFrequency = (e: React.FormEvent<HTMLOptionElement>) => {
    const newFrequency =
      RecurranceFrequency[e.currentTarget.value as RecurranceFrequency];
    setFrequency(newFrequency);
  };

  const changeLimit = (e: InputChangeEvent) => {
    const newLimit = Number(e.currentTarget.value);
    if (!isNaN(newLimit)) setLimit(newLimit);
  };
  const changeInterval = (e: InputChangeEvent) => {
    const newInterval = Number(e.currentTarget.value);
    if (!isNaN(newInterval)) setInterval(newInterval);
  };

  const changeWeekdays = (e: InputChangeEvent) => {
    const newWeekdays = getWeekdaysFromString(e.currentTarget.value);
    setWeekdays(newWeekdays.join(','));
  };

  if (!visible) return null;

  return (
    <Modal>
      <form onSubmit={handleSubmit} style={{ maxWidth: '80%' }}>
        <div>
          <Input name="eventTitle" value={title} onChange={changeTitle} />
          <Input
            name="eventDescription"
            value={description}
            onChange={changeDescription}
            placeholder={'description'}
          />
        </div>
        <Input
          name="allDayEvent"
          checked={allDay}
          label="All Day"
          type="checkbox"
          onChange={changeAllDay}
        />
        <div>
          <div style={{ fontSize: '1.2rem' }}>Start Date</div>
          <Input
            name="startDateInput"
            value={startDateInput}
            onChange={changeStartDateInput}
            onBlur={validateStartDate}
            placeholder={'start date'}
          />
          {!allDay ? (
            <div style={{ display: 'flex' }}>
              <Input
                name="startHourInput"
                value={startTimeHInput}
                onChange={changeStartHInput}
                placeholder={'hour'}
              />
              <Input
                name="startMinuteInput"
                value={startTimeMInput}
                onChange={changeStartMInput}
                placeholder={'minute'}
              />
            </div>
          ) : null}
        </div>
        <div>
          <div style={{ fontSize: '1.2rem' }}>End Date</div>
          <Input
            name="endDateInput"
            value={endDateInput || ''}
            onChange={changeEndDateInput}
            onBlur={validateEndDate}
            placeholder={'end date'}
          />
          {!allDay ? (
            <div style={{ display: 'flex' }}>
              <Input
                name="endHourInput"
                value={endTimeHInput}
                onChange={changeEndHInput}
                placeholder={'hour'}
              />
              <Input
                name="endMinuteInput"
                value={endTimeMInput}
                onChange={changeEndMInput}
                placeholder={'minute'}
              />
            </div>
          ) : null}
        </div>
        {recurs ? (
          <div>
            <select name="frequency">
              {Object.keys(RecurranceFrequency).map((freq, freqIndex) => (
                <option
                  key={`frequencyOption${freq}${freqIndex}`}
                  value={freq}
                  onChange={changeFrequency}
                >
                  {freq.toLowerCase()}
                </option>
              ))}
            </select>
            <Input
              name="recurInterval"
              value={interval}
              label="Interval"
              onChange={changeInterval}
            />
            <Input
              name="recurLimit"
              value={limit}
              label="Limit"
              onChange={changeLimit}
            />
            <Input
              name="weekdays"
              value={weekdays}
              label="Weekday ids"
              onChange={changeWeekdays}
            />
          </div>
        ) : (
          <button onClick={toggleRepeat}>repeat</button>
        )}
        <div>
          <button style={{ width: '100%' }} type="submit">
            save
          </button>
        </div>
        <div>
          <button style={{ width: '100%' }} onClick={hideForm}>
            cancel
          </button>
        </div>
        <div>
          <button style={{ width: '100%' }} onClick={handleDelete}>
            delete
          </button>
        </div>
      </form>
    </Modal>
  );
};

type InputProps = {
  label?: string;
};

const Input: React.FC<
  React.InputHTMLAttributes<HTMLInputElement> & InputProps
> = ({ label, ...props }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        color: '#1A237E',
      }}
    >
      {label ? (
        <label style={{ fontSize: '1.2rem' }} htmlFor={props.name}>
          {label}
        </label>
      ) : null}
      <input {...props} />
    </div>
  );
};
