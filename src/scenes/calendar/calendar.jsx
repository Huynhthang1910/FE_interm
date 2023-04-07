<<<<<<< HEAD
import React from "react";
import Scheduler from "devextreme-react/scheduler";
import { CheckBox } from "devextreme-react/check-box";
import notify from "devextreme/ui/notify";

import { data } from "../../data/data";

const currentDate = new Date(2021, 3, 29);
const views = ["day", "week"];

class Calendar extends React.Component {
constructor(props) {
    super(props);
    this.state = {
    allowAdding: true,
    allowDeleting: true,
    allowResizing: true,
    allowDragging: true,
    allowUpdating: true,
    };
    this.onAllowAddingChanged = this.onAllowAddingChanged.bind(this);
    this.onAllowDeletingChanged = this.onAllowDeletingChanged.bind(this);
    this.onAllowResizingChanged = this.onAllowResizingChanged.bind(this);
    this.onAllowDraggingChanged = this.onAllowDraggingChanged.bind(this);
    this.onAllowUpdatingChanged = this.onAllowUpdatingChanged.bind(this);
    this.showAddedToast = this.showAddedToast.bind(this);
    this.showUpdatedToast = this.showUpdatedToast.bind(this);
    this.showDeletedToast = this.showDeletedToast.bind(this);
}

render() {
    return (
    <React.Fragment>
        <Scheduler
        timeZone="America/Los_Angeles"
        dataSource={data}
        views={views}
        defaultCurrentView="week"
        defaultCurrentDate={currentDate}
        startDayHour={9}
        endDayHour={19}
        height={600}
        editing={this.state}
        onAppointmentAdded={this.showAddedToast}
        onAppointmentUpdated={this.showUpdatedToast}
        onAppointmentDeleted={this.showDeletedToast}
        />
        <div className="options">
        <div className="caption">Options</div>
        <div className="options-container">
            <div className="option">
            <CheckBox
                defaultValue={this.state.allowAdding}
                text="Allow adding"
                onValueChanged={this.onAllowAddingChanged}
            />
            </div>
            <div className="option">
            <CheckBox
                defaultValue={this.state.allowDeleting}
                text="Allow deleting"
                onValueChanged={this.onAllowDeletingChanged}
            />
            </div>
            <div className="option">
            <CheckBox
                defaultValue={this.state.allowUpdating}
                text="Allow updating"
                onValueChanged={this.onAllowUpdatingChanged}
            />
            </div>
            <div className="option">
            <CheckBox
                defaultValue={this.state.allowResizing}
                text="Allow resizing"
                onValueChanged={this.onAllowResizingChanged}
                disabled={!this.state.allowUpdating}
            />
            </div>
            <div className="option">
            <CheckBox
                defaultValue={this.state.allowDragging}
                text="Allow dragging"
                onValueChanged={this.onAllowDraggingChanged}
                disabled={!this.state.allowUpdating}
            />
            </div>
        </div>
        </div>
    </React.Fragment>
    );
}

onAllowAddingChanged(e) {
    this.setState({ allowAdding: e.value });
}

onAllowDeletingChanged(e) {
    this.setState({ allowDeleting: e.value });
}

onAllowResizingChanged(e) {
    this.setState({ allowResizing: e.value });
}

onAllowDraggingChanged(e) {
    this.setState({ allowDragging: e.value });
}

onAllowUpdatingChanged(e) {
    this.setState({ allowUpdating: e.value });
}

showToast(event, value, type) {
    notify(`${event} "${value}" task`, type, 800);
}

showAddedToast(e) {
    this.showToast("Added", e.appointmentData.text, "success");
}

showUpdatedToast(e) {
    this.showToast("Updated", e.appointmentData.text, "info");
}

showDeletedToast(e) {
    this.showToast("Deleted", e.appointmentData.text, "warning");
}
}

=======
import { Eventcalendar,toast, getJson,snackbar, setOptions, Popup, Button, Input, Textarea, Switch, Datepicker, SegmentedGroup, SegmentedItem,  localeVi } from '@mobiscroll/react';
import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import { Box } from '@mui/material';

setOptions({
  locale: localeVi,
  theme: 'ios',
  themeVariant: 'light'
});

const now = new Date();
const defaultEvents = [{
  id: 1,
  start: '2023-03-08T13:00',
  end: '2023-03-08T13:45',
  title: 'Lunch @ Butcher\'s',
  description: '',
  allDay: false,
  free: true,
  color: '#009788'
}, {
  id: 2,
  start: '2023-03-29T15:00',
  end: '2023-03-29T16:00',
  title: 'General orientation',
  description: '',
  allDay: false,
  free: false,
  color: '#ff9900'
}, {
  id: 3,
  start: '2023-03-28T18:00',
  end: '2023-03-28T22:00',
  title: 'Dexter BD',
  description: '',
  allDay: false,
  free: true,
  color: '#3f51b5'
}, {
  id: 4,
  start: '2023-03-30T10:30',
  end: '2023-03-30T11:30',
  title: 'Stakeholder mtg.',
  description: '',
  allDay: false,
  free: false,
  color: '#f44437'
}];

const viewSettings = {
  calendar: { labels: true }
};
const responsivePopup = {
  medium: {
      display: 'anchored',
      width: 400,
      fullScreen: false,
      touchUi: false
  }
};
const colorPopup = {
  medium: {
      display: 'anchored',
      touchUi: false,
      buttons: []
  }
}
const colors = ['#ffeb3c', '#ff9900', '#f44437', '#ea1e63', '#9c26b0', '#3f51b5', '', '#009788', '#4baf4f', '#7e5d4e'];
const today = new Date();

const Calendar = () => {
    const [myEventss, setEvents] = React.useState([]);
    const myInvalid = [{
      recurring: {
        repeat: 'daily',
        until: today
      }
    }];

    React.useEffect(() => {
      getJson('https://trial.mobiscroll.com/events/?vers=5', (events) => {
        for (const event of events) {
          // convert dates to date objects
          event.start = event.start ? new Date(event.start) : event.start;
          event.end = event.end ? new Date(event.end) : event.end;
          // mark past events as fixed by setting the event.editable property to false
          event.editable = event.start && today < event.start;
        }
        setEvents(events);
      }, 'jsonp');
    }, []);
    const [myEvents, setMyEvents] = React.useState(defaultEvents);
    const [tempEvent, setTempEvent] = React.useState(null);
    const [isOpen, setOpen] = React.useState(false);
    const [isEdit, setEdit] = React.useState(false);
    const [anchor, setAnchor] = React.useState(null);
    const [start, startRef] = React.useState(null);
    const [end, endRef] = React.useState(null);
    const [popupEventTitle, setTitle] = React.useState('');
    const [popupEventDescription, setDescription] = React.useState('');
    const [popupEventAllDay, setAllDay] = React.useState(true);
    const [popupEventDate, setDate] = React.useState([]);
    const [popupEventStatus, setStatus] = React.useState('busy');
    const [mySelectedDate, setSelectedDate] = React.useState(now);
    const [colorPickerOpen, setColorPickerOpen] = React.useState(false);
    const [colorAnchor, setColorAnchor] = React.useState(null);
    const [selectedColor, setSelectedColor] = React.useState('');
    const [tempColor, setTempColor] = React.useState('');
    const colorPicker = React.useRef();
    const colorButtons = React.useMemo(() => [
        'cancel',
        {
            text: 'Set',
            keyCode: 'enter',
            handler: () => {
                setSelectedColor(tempColor);
                setColorPickerOpen(false);
            },
            cssClass: 'mbsc-popup-button-primary'
        }
    ], [tempColor]);

    const saveEvent = React.useCallback(() => {
        const newEvent = {
            id: tempEvent.id,
            title: popupEventTitle,
            description: popupEventDescription,
            start: popupEventDate[0],
            end: popupEventDate[1],
            allDay: popupEventAllDay,
            status: popupEventStatus,
            color: tempEvent.color,
        };
        if (isEdit) {
            // update the event in the list
            const index = myEvents.findIndex(x => x.id === tempEvent.id);;
            const newEventList = [...myEvents];

            newEventList.splice(index, 1, newEvent);
            setMyEvents(newEventList);
            // here you can update the event in your storage as well
            // ...
        } else {
            // add the new event to the list
            setMyEvents([...myEvents, newEvent]);
            // here you can add the event to your storage as well
            // ...
        }
        setSelectedDate(popupEventDate[0]);
        // close the popup
        setOpen(false);
    }, [isEdit, myEvents, popupEventAllDay, popupEventDate, popupEventDescription, popupEventStatus, popupEventTitle, tempEvent, selectedColor]);

    const deleteEvent = React.useCallback((event) => {
        setMyEvents(myEvents.filter(item => item.id !== event.id));
        setTimeout(() => {
            snackbar({
                button: {
                    action: () => {
                        setMyEvents(prevEvents => [...prevEvents, event]);
                    },
                    text: 'Undo'
                },
                message: 'Event deleted'
            });
        });
    }, [myEvents]);

    const loadPopupForm = React.useCallback((event) => {
        setTitle(event.title);
        setDescription(event.description);
        setDate([event.start, event.end]);
        setAllDay(event.allDay || false);
        setStatus(event.status || 'busy');
        setSelectedColor(event.color || '');
    }, []);

    // handle popup form changes

    const titleChange = React.useCallback((ev) => {
        setTitle(ev.target.value);
    }, []);

    const descriptionChange = React.useCallback((ev) => {
        setDescription(ev.target.value);
    }, []);

    const allDayChange = React.useCallback((ev) => {
        setAllDay(ev.target.checked);
    }, []);

    const dateChange = React.useCallback((args) => {
        setDate(args.value);
    }, []);

    const statusChange = React.useCallback((ev) => {
        setStatus(ev.target.value);
    }, []);

    const onDeleteClick = React.useCallback(() => {
        deleteEvent(tempEvent);
        setOpen(false);
    }, [deleteEvent, tempEvent]);

    // scheduler options

    const onSelectedDateChange = React.useCallback((event) => {
        setSelectedDate(event.date);
    });

    const onEventClick = React.useCallback((args) => {
        setEdit(true);
        setTempEvent({ ...args.event });
        // fill popup form with event data
        loadPopupForm(args.event);
        setAnchor(args.domEvent.target);
        setOpen(true);
    }, [loadPopupForm]);

    const onEventCreated = React.useCallback((args) => {
        // createNewEvent(args.event, args.target)
        setEdit(false);
        setTempEvent(args.event)
        // fill popup form with event data
        loadPopupForm(args.event);
        setAnchor(args.target);
        // open the popup
        setOpen(true);
    }, [loadPopupForm]);

    const onEventDeleted = React.useCallback((args) => {
        deleteEvent(args.event)
    }, [deleteEvent]);

    const onEventUpdated = React.useCallback((args) => {
        // here you can update the event in your storage as well, after drag & drop or resize
        // ...
    }, []);

    // datepicker options
    const controls = React.useMemo(() => popupEventAllDay ? ['date'] : ['datetime'], [popupEventAllDay]);
    const respSetting = React.useMemo(() => popupEventAllDay ? {
        medium: {
            controls: ['calendar'],
            touchUi: false
        }
    } : {
            medium: {
                controls: ['calendar', 'time'],
                touchUi: false
            }
        }, [popupEventAllDay]);

    // popup options
    const headerText = React.useMemo(() => isEdit ? 'Edit event' : 'New Event', [isEdit]);
    const popupButtons = React.useMemo(() => {
        if (isEdit) {
            return [
                'cancel',
                {
                    handler: () => {
                        saveEvent();
                    },
                    keyCode: 'enter',
                    text: 'Save',
                    cssClass: 'mbsc-popup-button-primary'
                }
            ];
        }
        else {
            return [
                'cancel',
                {
                    handler: () => {
                        saveEvent();
                    },
                    keyCode: 'enter',
                    text: 'Add',
                    cssClass: 'mbsc-popup-button-primary'
                }
            ];
        }
    }, [isEdit, saveEvent]);

    const onClose = React.useCallback(() => {
        if (!isEdit) {
            // refresh the list, if add popup was canceled, to remove the temporary event
            setMyEvents([...myEvents]);
        }
        setOpen(false);
    }, [isEdit, myEvents]);

    const selectColor = React.useCallback((color) => {
        setTempColor(color)
    }, []);

    const openColorPicker = React.useCallback((ev) => {
        selectColor(selectedColor || '');
        setColorAnchor(ev.currentTarget);
        setColorPickerOpen(true);
    }, [selectColor, selectedColor]);

    const changeColor = React.useCallback((ev) => {
        const color = ev.currentTarget.getAttribute('data-value');
        selectColor(color);
        if (!colorPicker.current.s.buttons.length) {
            setSelectedColor(color);
            setColorPickerOpen(false);
        }
    }, [selectColor, setSelectedColor]);

    const { current: view } = React.useRef({ calendar: { labels: true } });

    const onEventCreateFailed = React.useCallback((args) => {
      if (!args.originEvent) {
        toast({
          message: 'Can\'t create event in the past'
        });
      }
    }, []);

    const onEventUpdateFailed = React.useCallback((args) => {
      if (!args.oldEventOccurrence) {
        toast({
          message: 'Can\'t move event in the past'
        });
      }
    }, []);

    const onEventCreate = React.useCallback((args) => {
      const oldEvent = args.originEvent;
      const start = oldEvent && oldEvent.start ? oldEvent.start : null;

      // handle recurring events
      if (start && start < today) {
        toast({
          message: 'Can\'t move past event'
        });
        return false;
      }
    }, []);

    const onEventUpdate = React.useCallback((args) => {
      const oldEvent = args.oldEvent;
      const start = oldEvent && oldEvent.start ? oldEvent.start : null;
      const oldEventOccurrence = args.oldEventOccurrence;
      const occurrenceStart = oldEventOccurrence && oldEventOccurrence.start ? oldEventOccurrence.start : null;

      // handle recurring events
      if ((start && start < today) || (occurrenceStart && occurrenceStart < today)) {
        return false;
      }
    }, []);

    return (
        <div>
            <Eventcalendar
              className="md-disallow-past-event-creation"
              view={view}
              data={myEvents}
              invalid={myInvalid}
              clickToCreate={'double'}
              dragToCreate={true}
              dragToMove={true}
              dragToResize={true}
              selectedDate={mySelectedDate}
              onSelectedDateChange={onSelectedDateChange}
                 onEventCreateFailed={onEventCreateFailed}
      onEventUpdateFailed={onEventUpdateFailed}
      onEventCreate={onEventCreate}
      onEventUpdate={onEventUpdate}
              onEventClick={onEventClick}
              onEventCreated={onEventCreated}
              onEventDeleted={onEventDeleted}
              onEventUpdated={onEventUpdated}
            />
            <Popup
            display="bottom"
            fullScreen={true}
            contentPadding={false}
            headerText={headerText}
            anchor={anchor}
            buttons={popupButtons}
            isOpen={isOpen}
            onClose={onClose}
            responsive={responsivePopup}
        >
            <div className="mbsc-form-group">
                <Input label="Title" value={popupEventTitle} onChange={titleChange} />
                <Textarea label="Description" value={popupEventDescription} onChange={descriptionChange} />
            </div>
            <div className="mbsc-form-group">
                <Switch label="All-day" checked={popupEventAllDay} onChange={allDayChange} />
                <Input ref={startRef} label="Starts" />
                <Input ref={endRef} label="Ends" />
                <Datepicker
                    select="range"
                    controls={controls}
                    touchUi={true}
                    startInput={start}
                    endInput={end}
                    showRangeLabels={false}
                    responsive={respSetting}
                    onChange={dateChange}
                    value={popupEventDate}
                />
                <div onClick={openColorPicker} className="event-color-c">
                    <div className="event-color-label">Color</div>
                    <div className="event-color" style={{ background: selectedColor }}></div>
                </div>
                <SegmentedGroup onChange={statusChange}>
                    <SegmentedItem value="busy" checked={popupEventStatus === 'busy'}>Show as busy</SegmentedItem>
                    <SegmentedItem value="free" checked={popupEventStatus === 'free'}>Show as free</SegmentedItem>
                </SegmentedGroup>
                {isEdit ? <div className="mbsc-button-group"><Button className="mbsc-button-block" color="danger" variant="outline" onClick={onDeleteClick}>Delete event</Button></div> : null}
            </div>
        </Popup>
        <Popup
            display="bottom"
            contentPadding={false}
            showArrow={false}
            showOverlay={false}
            anchor={colorAnchor}
            isOpen={colorPickerOpen}
            buttons={colorButtons}
            responsive={colorPopup}
            ref={colorPicker}
        >
            <div className="crud-color-row">
                {colors.map((color, index) => {
                    if (index < 5) {
                        return <div key={index} onClick={changeColor} className={"crud-color-c " + (tempColor === color ? 'selected' : '')} data-value={color}>
                            <div className="crud-color mbsc-icon mbsc-font-icon mbsc-icon-material-check" style={{ background: color }}></div>
                        </div>
                    } else return null;
                })}
            </div>
            <div className="crud-color-row">
                {colors.map((color, index) => {
                    if (index >= 5) {
                        return <div key={index} onClick={changeColor} className={"crud-color-c " + (tempColor === color ? 'selected' : '')} data-value={color}>
                            <div className="crud-color mbsc-icon mbsc-font-icon mbsc-icon-material-check" style={{ background: color }}></div>
                        </div>
                    } else return null;
                })}
            </div>
        </Popup>
        </div>
    );
};
>>>>>>> origin/minhnha

export default Calendar;
