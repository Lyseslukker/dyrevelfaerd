import React, {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import "./Details.css"


export default function Details() {

    const {id} = useParams()

    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)
    const [animalData, setAnimalData] = useState()

    useEffect(() => {
        fetch(`http://localhost:4000/api/v1/animals/${id}`)
            .then(response => response.json())
            .then((data) => {
                setAnimalData(data)
                setLoading(false)
                console.log(data)
            })
            .catch(() => {
                setError(true) 
                setLoading(false) 
            })
    }, []);


    if (error) {
        return (
            <div className='details'>
                <h1>Something went wrong...</h1>
            </div>
        )
    }

    if (loading) {
        return (
            <div className='details'>
                <h1>Loading...</h1>
            </div>
        )
    }

    if (!error && !loading) {
        return (
            <div className='details'>
                <Link className='details__link' to="/">Tilbage</Link>
                <div className="details__img">
                    <img src={animalData.asset.url} alt={animalData.name} />
                </div>
                <div className="details__info">
                    <h1>Navn: {animalData.name}</h1>
                    <p>Alder: {animalData.age}</p>
                    <p>Beskrivelse: {animalData.description}</p>
                </div>
            </div>
        )
    }
}