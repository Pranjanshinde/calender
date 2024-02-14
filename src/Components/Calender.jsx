import React from 'react'
import { formatDate } from '@fullcalendar/core';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS,createEventId } from '../event';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,Button
  } from '@chakra-ui/react';
  import { useDisclosure } from '@chakra-ui/react';
  import { useState } from 'react';



export default function Calender () {

  const [para,setPara]=useState({
    weekendsVisible: true,
    currentEvents: [],
    name:"",
    starttime:"",
    endtime:""
  });
  let { isOpen, onOpen, onClose } = useDisclosure();

//   console.log(onOpen);

  const handleWeekendsToggle = () => {
    setPara({
      weekendsVisible: !para.weekendsVisible
    })
  }
  
  let  handleDateSelect = (selectInfo) => {
    let title = prompt('Please enter a new title for your event')
    let calendarApi = selectInfo.view.calendar

    calendarApi.unselect() // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      })
    }
  }

 let handleEventClick = (clickInfo) => {
    // if (alert(`${clickInfo.event.title}`)) {
        onOpen();
        console.log(clickInfo.event.start,clickInfo.event.start);
        setPara({...para,name:clickInfo.event.title,starttime:`${clickInfo.event.start}`,endtime:`${clickInfo.event.end}`});
    // }
  //   clickInfo.event.remove()
      // return (
      //         <>
             
      //         </>
      // )
      

  }

 let handleEvents = (events) => {
    setPara({
      currentEvents: events
    })
  }
     
      return (
        <div className='demo-app'>
            <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>description:{para.name}</ModalHeader>
          <ModalHeader>start-time:{para.starttime}</ModalHeader>
          <ModalHeader>End-time:{para.endtime}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* <Lorem count={2} /> */}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            {/* <Button variant='ghost'>Secondary Action</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
          {/* {renderSidebar()}      */}
          <div className='demo-app-main'>
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
              }}
              nowIndicator={true}
              initialView='dayGridMonth'
              editable={true}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={true}
              weekends={para.weekendsVisible}
              initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
              select={handleDateSelect}
              eventContent={renderEventContent} // custom render function
              eventClick={handleEventClick}
              eventsSet={handleEvents}
              className="calendar-container" // called after events are initialized/added/changed/removed
              /* you can update a remote database when these fire:
              eventAdd={function(){}}
            //   eventChange={function(){}}
              eventRemove={function(){}}
              */
            />
          </div>
        </div>
      )
    
  
   function renderSidebar() {
      return (
        <div className='demo-app-sidebar'>
          <div className='demo-app-sidebar-section'>
            <h2>Instructions</h2>
            <ul>
              <li>Select dates and you will be prompted to create a new event</li>
              <li>Drag, drop, and resize events</li>
              <li>Click an event to delete it</li>
            </ul>
          </div>
          <div className='demo-app-sidebar-section'>
            <label>
              <input
                type='checkbox'
                checked={para.weekendsVisible}
                onChange={handleWeekendsToggle}
              ></input>
              toggle weekends
            </label>
          </div>
          {/* <div className='demo-app-sidebar-section'>
            <h2>All Events ({para.currentEvents.length})</h2>
            <ul>
              {para.currentEvents.map(renderSidebarEvent())}
            </ul>
          </div> */}
        </div>
      )
    }
  
 
  
 
  
  }
  
  function renderEventContent(eventInfo) {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    )
  }
  
  function renderSidebarEvent(event) {
    return (
      <li key={event.id}>
        <b>{formatDate(event.start, {year: 'numeric', month: 'short', day: 'numeric'})}</b>
        <i>{event.title}</i>
      </li>
    )
  }



//   export default class calender extends React.Component {

  

//     state = {
//       weekendsVisible: true,
//       currentEvents: [],
//       name:""
//     }
  
//     render() {
//       return (
//         <div className='demo-app'>
//             <dialog id='dia'>
//                 <p>{this.state.name}</p>
//             </dialog>
//           {this.renderSidebar()}     
//           <div className='demo-app-main'>
//             <FullCalendar
//               plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//               headerToolbar={{
//                 left: 'prev,next today',
//                 center: 'title',
//                 right: 'dayGridMonth,timeGridWeek,timeGridDay'
//               }}
//               nowIndicator={true}
//               initialView='dayGridMonth'
//               editable={true}
//               selectable={true}
//               selectMirror={true}
//               dayMaxEvents={true}
//               weekends={this.state.weekendsVisible}
//               initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
//               select={this.handleDateSelect}
//               eventContent={renderEventContent} // custom render function
//               eventClick={this.handleEventClick}
//               eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
//               /* you can update a remote database when these fire:
//               eventAdd={function(){}}
//             //   eventChange={function(){}}
//               eventRemove={function(){}}
//               */
//             />
//           </div>
//         </div>
//       )
//     }
  
//     renderSidebar() {
//       return (
//         <div className='demo-app-sidebar'>
//           <div className='demo-app-sidebar-section'>
//             <h2>Instructions</h2>
//             <ul>
//               <li>Select dates and you will be prompted to create a new event</li>
//               <li>Drag, drop, and resize events</li>
//               <li>Click an event to delete it</li>
//             </ul>
//           </div>
//           <div className='demo-app-sidebar-section'>
//             <label>
//               <input
//                 type='checkbox'
//                 checked={this.state.weekendsVisible}
//                 onChange={this.handleWeekendsToggle}
//               ></input>
//               toggle weekends
//             </label>
//           </div>
//           <div className='demo-app-sidebar-section'>
//             <h2>All Events ({this.state.currentEvents.length})</h2>
//             <ul>
//               {this.state.currentEvents.map(renderSidebarEvent)}
//             </ul>
//           </div>
//         </div>
//       )
//     }
  
//     handleWeekendsToggle = () => {
//       this.setState({
//         weekendsVisible: !this.state.weekendsVisible
//       })
//     }
  
//     handleDateSelect = (selectInfo) => {
//       let title = prompt('Please enter a new title for your event')
//       let calendarApi = selectInfo.view.calendar
  
//       calendarApi.unselect() // clear date selection
  
//       if (title) {
//         calendarApi.addEvent({
//           id: createEventId(),
//           title,
//           start: selectInfo.startStr,
//           end: selectInfo.endStr,
//           allDay: selectInfo.allDay
//         })
//       }
//     }
  
//     handleEventClick = (clickInfo) => {
//       if (alert(`${clickInfo.event.title}`)) {
      
//       }
//     //   clickInfo.event.remove()
//         // return (
//         //         <>
               
//         //         </>
//         // )


//     }
  
//     handleEvents = (events) => {
//       this.setState({
//         currentEvents: events
//       })
//     }
  
//   }
  
//   function renderEventContent(eventInfo) {
//     return (
//       <>
//         <b>{eventInfo.timeText}</b>
//         <i>{eventInfo.event.title}</i>
//       </>
//     )
//   }
  
//   function renderSidebarEvent(event) {
//     return (
//       <li key={event.id}>
//         <b>{formatDate(event.start, {year: 'numeric', month: 'short', day: 'numeric'})}</b>
//         <i>{event.title}</i>
//       </li>
//     )
//   }