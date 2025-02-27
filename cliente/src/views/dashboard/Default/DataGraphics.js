import React, {  useEffect, useState } from 'react';
import axios from 'axios';
import { styled, useTheme } from '@mui/material/styles';
import BarChart from './composedChart';
import { Grid, Typography } from '@mui/material';
import CircularGraph from '../../pages/company/CircularGraph.js'
import MainCard from 'ui-component/cards/MainCard';


const coloresGenders = ['#87CEEB','#98FB98','#9370DB','#DDA0DD','#483D8B'];
const coloresGenero=["#2471A3","#6C3483","#BB8FCE","#F5B041 ","#F4D03F"];
const coloresConsents = ['#77B7ED','#172480'];
const coloresTypes = [ '#7fb3d5' , '#2980b9' , '#1f618d' , '#154360','#7fb8d5' , '#2960b9' , '#1f718d' , '#134960','#6fb3d5' , '#8980b9'];
const coloresAges = ["#87CEFA", "#00BFFF","#1E90FF","#4169E1","#0000FF","#0000CD","#00008B","#000080", "#191970"];
const coloresEdad=["#BB8FCE","#F5B041 ","#5DADE2","#EC7063","#F4D03F","#2471A3","#6C3483","#229954" ]

let dataPruebasGenders = [{"category": "Femenino", "value":3},{"category": "Masculino", "value":5},{"category": "No binario", "value":1},{"category": "Prefiere no contestar", "value":2}];
let dataPruebasTipos = [{ "category" : "Etnia", "value" : 2},{ "category" : "Género", "value" : 8},{ "category" : "Maltrato", "value" : 0},{ "category" : "Edad", "value" : 1},{ "category" : "Religión", "value" : 3},{ "category" : "Condición sexual", "value" : 5},{ "category" : "Discapacidad", "value" : 3},{ "category" : "Mobbing", "value" : 6}, { "category" : "Explotación", "value" : 7},{ "category" : "Otro", "value" : 2}];
let dataPruebasConsents = [{"category" : "Sí", "value" : 5},{"category" : "No", "value" : 3}]
let dataPruebasEdad = [{ "category" : "16-20", "value" : 2},{ "category" : "21-30", "value" : 3},{ "category" : "31-40", "value" : 0},{ "category" : "41-50", "value" : 5},{ "category" : "51-60", "value" : 8},{ "category" : "61-70", "value" : 13},{ "category" : "71-80", "value" : 3},{ "category" : "más de 80", "value" : 0}]


  export default function DataGraphics() {

    const [dataTypes, setDataTypes] = useState([]);
    const [dataGenders, setDataGenders] = useState([]);
    const [dataAges, setDataAges] = useState([]);
    const [dataConsents, setDataConsents] = useState([]);

    const theme = useTheme();

    const CardWrapper = styled(MainCard)(({ theme }) => ({
      backgroundColor: "#ffffff",
      color: '#fff',
      overflow: 'hidden',
      position: 'relative'
    }));
  

    useEffect(async() =>{
      const [graficaTipo, graficaGenero, graficaEdad, graficaVisibilidad] = await Promise.all([
        await axios.get(`${process.env.REACT_APP_SERVER_URL}/charts/graficaTipo`, { withCredentials : true}),
        await axios.get(`${process.env.REACT_APP_SERVER_URL}/charts/graficaGenero`, { withCredentials : true}),
        await axios.get(`${process.env.REACT_APP_SERVER_URL}/charts/graficaEdad`, { withCredentials : true}),
        await axios.get(`${process.env.REACT_APP_SERVER_URL}/charts/graficaVisibilidad`, { withCredentials : true})
      ])
      
      setDataTypes(graficaTipo.data);
      setDataGenders(graficaGenero.data);
      setDataAges(graficaEdad.data);
      setDataConsents(graficaVisibilidad.data);
    },[])

    return (
      <CardWrapper>
        <Typography sx={{ fontSize: '2rem',fontWeight: 400, color: theme.palette.secondary[800]}}>
             Estadísticas sobre denuncias 
        </Typography>
      <Grid container spacing={1}>
          <Grid item xs={6}>
              <Grid sm={1} md={1}  lg={3} >
                    { dataGenders.length > 0
                      ? <CircularGraph ancho={400} alto={235} data={dataGenders} colores={coloresGenero} tipo = "gender"/>
                      : <h4> Cargando la gráfica... </h4>
                    }
              </Grid>
              <Grid sm={1}  md={1}  lg={3}>
                { dataConsents.length > 0
                  ?  <CircularGraph ancho={400} alto={235} data={dataConsents} colores={coloresConsents} tipo = "consent"/>
                  :  <h4> Cargando la gráfica... </h4>
                }
            </Grid>
             
          </Grid>

          <Grid item xs={6}>
          
            <Grid sm={1} md={1} lg={3}  >
                    { dataTypes.length > 0
                      ? <BarChart colorBarra={theme.palette.secondary.dark} legend="denuncias" data = {dataTypes} title="Tipo de discriminación"/>
                      : <h4> Cargando la gráfica... </h4>
                    }
            </Grid>
            <Grid sm={1} md={1} lg={3}  >
                { dataAges.length > 0
                  ? <BarChart colorBarra={theme.palette.primary.main} legend="Edad de denunciantes" data = {dataAges} title="Rango de edad"/>
                  : <h4> Cargando la gráfica... </h4>
                }
                </Grid>
          </Grid>
      </Grid>
      </CardWrapper>
    );
  }