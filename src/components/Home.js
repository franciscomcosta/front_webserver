import React,{useState,useEffect} from "react";
import "./style/Home.css"
import Card from "./utils/Card";
import axios from "axios";





function Home (){

    const [sensor, setSensor] = useState([]);




    useEffect(() =>{
    axios.get("http://localhost:3001/sensores").then(
        (res) =>{
                setSensor(res.data)
                console.log(res.data)
        }
    )
    },[])

  

    return(
        <>
            <div className="container">

                {typeof sensor !== "undefined" && sensor.map(
                    (sensor) =>{
                        return(
                            <>
                                <Card sensor={sensor.key_sensor}  className="cardcon" name={sensor.name_sensor}/>
                            </>
                        )
                    }
                )}

                
            </div>
        </>
    )
}

export default Home;