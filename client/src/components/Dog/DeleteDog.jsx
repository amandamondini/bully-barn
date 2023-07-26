import React, {useEffect} from 'react'
import {Button} from '@mui/material'

function DeleteDog({selectedDog}) {
    
    const handleDelete = () => {
            let url = `http://127.0.0.1:4000/dog/delete/${selectedDog._id}`
            fetch (url, {
                method: 'DELETE',
                headers: new Headers ({
                    "Content-Type": "application/json",
                    //"authorization": sessionToken
                })
            })
            .then(res => res.json())
            .then(data => {
                if (data.message === 'Dog Deleted') {
                    // Delete was successful
                    alert('Dog Deleted Successfully');
                        
                } else {
                    // Delete was not successful, display an error message
                    alert('Error Occurred. Dog not deleted from the database.');
                
                }})
            .catch(error => {
                console.log(error)
            })
    }


    return (
    <>
        <Button variant='contained' onClick={handleDelete}>Delete</Button>
        
    </>
    )
}

export default DeleteDog