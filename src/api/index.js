import axios from 'axios';
import { createChainedFunction } from '@material-ui/core';
const url = 'https://covid19.mathdro.id/api';

export const fetchData = async (country) =>{
    let changeableURL = url;
    if (country){
        changeableURL = `${url}/countries/${country}`
    }

    try{
        const {data: {confirmed, recovered, deaths, lastUpdate}} = await axios.get(changeableURL);
        return   {confirmed, recovered, deaths, lastUpdate};
    }
    catch(error){
        console.log(error);
    }
}


export const fetchDailyData = async () => {
    try{
        const {data} = await axios.get(`${url}/daily`);
        //console.log(data);
        // return data;
        const modifideData = data.map((dailyData)=>({
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            date: dailyData.reportDate,
        }));
        return modifideData;
    }
    catch(error){
        console.log(error);
    }
}


export const fetchCountries = async () => {
    try{
        const {data:{countries}} = await axios.get(`${url}/countries`);
        return countries.map((country)=> country.name);
    }
    catch(error){
        console.log(error);
    }
}