import React,{useState, useEffect} from "react";
import axios from "axios";
import "../style/Card.css"
import { Link } from 'react-router-dom'
import Rel_inc from "./Relat_in";

function Card(Props){

    const[values, setValues] = useState();

    const sensor = Props.sensor;


    useEffect(() =>{
        const fetchData = async () =>{
            try{
            await axios.post("http://localhost:3001/card",{
                card: sensor
            }).then((res)=>{
                    if(res.data){
                    setValues(res.data)
                    const fontTemp = document.getElementById("temp")
            
               
            }
                }
            )}catch{
                alert("Off");
                window.location.reload();
            }
            
            
        };
            fetchData(); 

            const interval = setInterval(fetchData, 10000); 

            return () => clearInterval(interval);
    },[sensor])


    const teste = () =>{
        console.log(Props.name)
        return <Link to={`/rel_inc?sensor=${Props.sensor}`}></Link>
    }


    return(
        <>
            
                {typeof values !== "undefined" && values.map(
                    (values) =>{
                     return(
                            <> 
                                    <Link to={`/rel_inc?sensor=${Props.sensor}`} id="Link">
                                        <div className="card" id="temp"  onClick={window.open(`http://localhost:3000/rel_inc?sensor=${Props.sensor}`)} >
                                        <h2>{Props.name}</h2>
                                        <h2 id="temp">Temperatura: {values.temp_value} °C</h2>
                                        <h2>Humidade: {values.humi_value} %</h2>
                                        </div>
                                    </Link>
                            </>

                     )
                    }
                )
                }
            
        </>
    )


}

export default Card;