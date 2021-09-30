import  {useState, useEffect} from 'react'
// import MoneyApp from "./MoneyApp"
import { useHistory } from "react-router-dom"
import styled from "styled-components";


function SignUpForm({setUser}) {
    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ passwordConfirmation, setPasswordConfirmation ] = useState('')
    const [ avatarUrl, setAvatarUrl ] = useState('')
    const [ weeklyGoal, setWeeklyGoal ] = useState('')
    const [ errors, setErrors ] = useState([])
    const history = useHistory()
   
    


    function hasndleSubmit(e) {
        e.preventDefault()
        const user = {
            username: username,
            password: password,
           
            
    }
    fetch('/signup', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify (user)
    })
    
    .then(res => {
        if (res.ok) {
            res.json().then(user => setUser(user)) 
            } else {
                res.json().then(err => setErrors(err.errors))
            }
    })
            history.push('/mymoneyapp')
        }
    return (
        <>
            <form onSubmit={hasndleSubmit}>
                <label>
                    Username
                    <input type='text' value={username} onChange={(e) => setUsername(e.target.value)}/>
                </label>
                <label>
                    Password
                    <input type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                </label>
                <label>
                    Confirm Password
                    <input type='password' value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)}/>
                </label>
                
               
                
                <button type='submit' value='Get Started'>Submit </button>
            </form>
            {(errors.length > 0) ? 
            (
                <ul>
                    {errors.map(err => (
                        <li key={err}>{err}</li>
                    ))
                    }
                </ul>

            )
            :
            null
            }
        </>
    )
}


export default SignUpForm;