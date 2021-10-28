import React,{useState} from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar'
import ProgressBarChart from './ProgressBarChart.js'
import "../Box.css";
import { Card } from "react-bootstrap";
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/TextField';
import makeStyles from '@material-ui/styles/makeStyles';
import DeleteIcon from '@material-ui/icons/Delete';
import { grey } from '@material-ui/core/colors';

 function MyBudgetCardFront({catObj, months, setMonths, handleDelete}) {
  const [allowEdit, setAllowEdit] = useState(false)
  const [amount, setAmount] = useState(catObj.amount)

  const {id} = catObj 

  const editForm = (
    <form onSubmit={handleEditAmount} >
      <input
      type="number"
      id="edit-amount"
      value={amount}
      onChange={(e) => setAmount( e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  )


  function handleEditAmount(e){
    e.preventDefault()
    console.log("edited!")
    fetch(`/category_budgets/${id}`, {
        method: 'PATCH',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(
            { 
             amount: amount
            })
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
        setAllowEdit(!allowEdit)
        setMonths({...months, 
        category_budgets: months.category_budgets.map(cb => {
          return cb.id==data.id? data : cb })
        })
    })
  }

//   const result = catObj.total_spending- catObj.amount
//   console.log(result)


// const now = catObj.total_spent-catObj.amount

  return (
   
  <div class="flex"> 
    <Card  className="box">
    <Card.Body >
    {/* <ProgressBarChart  now={now} label={`${now}%`} /> */}
      <Card.Title>{catObj.category.name}</Card.Title>
      <Card.Text>$Monthly budget: {catObj.amount}</Card.Text>
      <Card.Text>$Total Spent this month: {catObj.total_spending}</Card.Text>
      <button onClick={()=>handleDelete(catObj.id)}>delete</button>
      <button onClick={()=>setAllowEdit(!allowEdit)}> edit </button>
      {allowEdit && editForm}
    </Card.Body >
  </Card>         
  </div>
)
};
export default MyBudgetCardFront;

