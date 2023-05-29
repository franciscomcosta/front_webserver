import React,{useEffect, useState} from "react";
import "./style/Cadastro.css"
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as yup from "yup";
import axios from "axios";

function Cadastro () {

    const [sensor,setSensor] = useState([]);
    const [sensores, setSensores] = useState([])



    useEffect(() =>{
        axios.get("http://localhost:3001/sensores").then(
            (res) =>{
                    setSensores(res.data)
            }
        )
        },[])

    const inputvalues = async (name,id_sensor,loc) =>{
        try{
        await axios.post("http://localhost:3001/cad_sensores",{
            id_sensor: id_sensor,
            name: name,
            loc: loc
        }).then((res) =>{
            console.log(res)
            alert(res.data.msg)
            
            window.location.reload();
        })
    }catch{
            alert("Servidor offline. Contatar engenharia de teste!");

    }}

    const cadSensor = (values) =>{
        console.log(values)
        var name = "Sensor " + values.nome_sensor
        var id_sensor = values.id_sensor
        var loc = values.loc_sensor
        
        inputvalues(name,id_sensor,loc);
    }   

    const delValues = (values) => {
        console.log(values)
        let sensor = values.del_sensor;
        try{
            axios.post("http://localhost:3001/del_sensores",{
                sensor: sensor
            }).then(
                (res) =>{
                    alert(res.data.msg);
                    window.location.reload();
                }
            )
        }catch{
            console.log("erro")
        }
    }

    const validationSensor = yup.object().shape({
        nome_sensor: yup.string().required("Este campo é obrigatório!"),
        loc_sensor: yup.string().required("Este campo é obrigatório!"),
        id_sensor: yup.string().required("Este campo é obrigatório!"),
    })


    const activeFormCad = () =>{
        desactivateFormDel();
        let teste = document.getElementById("form_cad");
        teste.style.display = "block";
    }

    const activeFormDel = () =>{
        desactivateFormCad();
        let teste = document.getElementById("form_del");
        teste.style.display = "block";
    }

    function desactivateFormCad () {
        let teste = document.getElementById("form_cad");
        teste.style.display = "none";
    }

    function desactivateFormDel() {
        let teste = document.getElementById("form_del");
        teste.style.display = "none";
    }



    return(
        <>
            <div className="container_cad">
                <h1>Escolha a ação que deseja executar</h1>
                <div className="select_box">
                    <button className="button_cad" onClick={activeFormCad} >Cadastrar</button>
                    <button className="button_cad" onClick={activeFormDel}  >Deletar</button>
                </div>
                <div className="form_cad" id="form_cad">
                    <Formik initialValues={{}} onSubmit={cadSensor} validationSchema={validationSensor}>
                        <Form className="formcad" >
                            <h3>Inserção de sensor</h3>
                            <h5>Nome do sensor</h5>
                            <Field type='text' value={sensor.name}   name="nome_sensor" id="nome_sensor" placeholder="Nome"/>
                            <ErrorMessage component="a" name="nome_sensor" className="form-error"/>
                            <h5>Localização</h5>
                            <Field type="text" value={sensor.loc} name="loc_sensor" id="loc_sensor" placeholder="Localização"/>
                            <ErrorMessage component="spam" name="loc_sensor" className="form-error"/>
                            <h5>ID banco de dados</h5>
                            <Field type="text" value={sensor.id_db} name="id_sensor" id="id_sensor" placeholder="Id"/>
                            <ErrorMessage component="spam" name="id_sensor" className="form-error"/>
                            <button type="submit">Cadastrar</button>
                        </Form>
                    </Formik>
                </div>
                <div className="form_del" id="form_del">
                    <Formik initialValues={{}} onSubmit={delValues}>
                            <Form className="formcad" >
                            <h3>Selecione o sensor à ser deletado</h3>
                            <Field as='select' name="del_sensor" id="del_sensor"> 
                            <option value=""></option>
                            {typeof sensores !== "undefined" && sensores.map( (sen) => {
                                return(
                                    <>
                                    <option value={sen.key_sensor}>{sen.name_sensor}</option>
                                    </>
                                )
                            })}
                            </Field>
                            <button type="submit">Deletar</button>
                        </Form>
                    </Formik>
                </div>
            </div>
        </>
    )
}

export default Cadastro;