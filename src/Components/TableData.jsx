import React,{useState, useEffect} from 'react'
import axios from "axios";
import { Table } from 'react-bootstrap';

const URL = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo"

function TableData() {
const [ data, setData] = useState([])

useEffect(()=>{

    const fetchData =  async()=>{
        const response = await axios.get(URL)
        setData(Object.values(response.data)[1])
    }
    fetchData()
},[])

const newData = []; 

for(let key in data){
  let innerObj = {...data[key]}
  let obj = {date_time:key}
  for (let innerKey in innerObj){
   obj[innerKey.split(" ")[1]] = innerObj[innerKey]
  }
  newData.push(obj) 
}

  return (
    <div className='table'>
         <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>Date & Time</th>
          <th>Open</th>
          <th>High</th>
          <th>Low</th>
          <th>Close</th>
          <th>Volume</th>
        </tr>
      </thead>
      <tbody>
        {
          newData.length===0?
          <tr>
          <td></td>
          <td></td>
          <td className='load'>Loading...</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
          :
        newData?.map(({date_time,open,high,low,close,volume},index)=>(
        <tr key={index}>
          <td>{date_time}</td>
          <td>{open}</td>
          <td>{high}</td>
          <td>{low}</td>
          <td>{close}</td>
          <td>{volume}</td>
        </tr>
        ))
        }
      </tbody>   
    </Table>
    </div>
  )
}

export default TableData
