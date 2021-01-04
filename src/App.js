import './App.css';
import React from 'react';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek' 
import localeData from 'dayjs/plugin/localeData' 

// var dayjs = require('dayjs');

function App() {

  dayjs.extend(isoWeek);
  dayjs.extend(localeData);

  const d = new Date(2021,0,1);
  const start = dayjs(d);
  const mnum = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const end = start.add(mnum[mnum.length - 1],'month'); 


  const months = mnum.map( (num, i) => <li key = {i}><Month date = {start.add(num, 'month')} /></li>)
  
  return (
    <div>
      <div>Start is {start.format('YYYY-MM-DD')} en einde is {end.format('YYYY-MM-DD')}</div>
      <ul>{months}</ul>
    </div>
  );
}

class Month extends React.Component{
  render() {
    const start = this.props.date;
    const monthName = start.format('MMMM');
    const wks = this.getWeeks(start);
    //console.log(wks.map((w) => w.format('YYYY-MM-DD')));
    
    const weeks = wks.map((w, i) => {
      return (
        <li key={i}>
          <Week date={w} />
        </li>
      )
    })

    return(
        <>  
          <li>#{monthName}</li>
          <ul>
            <li key = '-1'>@MonthyGoals</li>
            {weeks}
          </ul>
        </>
    );
  }

  getWeeks(start) {
    const currentMonth = start.month();
    let currentWeek = start.isoWeek();
    const weeks = [start];

    let d = start;
    while (currentMonth === d.month()) {
      //console.log('month ' + d.month(), 'week ' +d.isoWeek(), d.format('YYYY-MM-DD'))
      if (d.isoWeek() !== currentWeek) {
        currentWeek = d.isoWeek();
        weeks.push(d);
        //console.log('pushing ', d.format('YYYY-MM-DD') )
      }
      d= d.add(1,'day');      
    }
    return weeks;
  }
}

class Week extends React.Component{
  render() {
    const start = this.props.date;
    const end = start.add(7, 'day');
    const weekNumber = start.isoWeek();
    const month = start.month();
    const daylist = [];
    
    for (let d = start; d < end; d = d.add(1, 'day')) {
      if (d.isoWeek() === weekNumber && d.month() === month) daylist.push(d);      
    }

    const realEnd = daylist[daylist.length -1];

    const days = daylist.map((step, day) => {
      return (
        <li key={day}>
          <Day date={step} />
        </li>
      )
    })

    return(
      <>
        <li>Week {weekNumber} Van {start.format('!(YYYY-MM-DD)')} tot {realEnd.format('!(YYYY-MM-DD)') }</li>
        <ul>
          <li>@WeeklyGoals</li>
          {days}
      </ul>
      </>
    );
  }
}

class Day extends React.Component{
  render() {
    const day = this.props.date.format('!(YYYY-MM-DD)');
    return(
      <div>
        <li>{day}</li>
        <ul>
          <li>@DailyGoals</li>
        </ul>
      </div>
    );
  }
}

export default App;
