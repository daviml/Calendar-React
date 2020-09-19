import React, {useState, useEffect} from 'react';
import './App.css';
import * as moment from 'moment';
import 'moment/locale/pt-br';



export default function CalendarV2 (){
  
  const [calendar, setCalendar] = useState([])
  const [value, setValue] = useState(moment());

  useEffect(()  =>{
    const day = startDay().clone().subtract(1, 'day')
    const tmp =[]

    while(day.isBefore(endDay(),"day")){
      tmp.push(
        Array(5)
        .fill(0)
        .map(()=> day.add(1,'day').clone())
      )
    }
    setCalendar(tmp)
  },[value])
  
  function endDay(){
    let endDay = value.clone().endOf("month").endOf("week")
    return(endDay)
  }

  function startDay(){
    let startDay = value.clone().startOf("month").startOf("week")
    return(startDay)
  }

  function currentMonth(){
    return value.format("MMMM")
  }

  function currentYear(){
    return value.format("YYYY")
  }

  function lastFiveYears(){
    let year = new Date().getFullYear();
    let popYearValue = []
    for(let i=0;i<5;i++){
      popYearValue.push(year-i)
    }
    return(
      popYearValue
    )
  }

  function popYear(){
    let popYear = lastFiveYears().map((years) =>
    <option>{years}</option>
    )
    return(popYear)
  }

  function popMonth(){
    let popMonth = moment.months().map((months) =>
    <option>{months}</option>
    );
    return(popMonth)
  }

  function changeMonth(date){
    setValue(value.clone().month(date.target.value))
  };

  function changeYear(date){
    setValue(value.clone().year(date.target.value))
    
  };

  function checkMonth(day){
    if(day.format("MM") == value.format("MM")){
      return("boxon")
    }
    else{
      return ("boxoff")
    }
  }

  return(
            
  <div>
      

      <div className="monthyear">

        <select className="monthyear"
        onChange={date => changeMonth(date)}
        value={currentMonth()} >
          {popMonth()}
        </select>

        <select className="monthyear"
        onChange={date => changeYear(date)}
        value={currentYear()} >
          {popYear()}
        </select>

      </div>
      
      <div className="totalvendas">
        Total de vendas
      </div>

      <div className="totalvalor">
        R$ 100.0000,00
      </div>

      <div className="calendar-container">
        {
          calendar.map(week => 
          <div>
            {
              week.map(day => 
              <div className={checkMonth(day)}>
                <div className="day">
                  {
                  day.format("DD")
                  }
                </div>
                <div className="status">
                  Realizado
                </div>
                <div className="valueofday">
                  R$ 10.000,00
                </div>
              </div>)
            }
          </div>)
        }
      </div>

    </div> 
  )
}