import React from "react";
import styled from "styled-components";

const ItemContainer = styled.div`

    width: 100%;
    position: relative;
    left: 20%;
    top: 10vh;
    margin-left: 5%;

`;



const Icon = styled.img`

    position: relative;
    left: 10%;
    width: 150px;
    height: 150px;
`;

const Info = styled.h3`
    width: 90%;
    padding-bottom: 5px;
    position: relative;
    top: -60px;
    border-bottom: 1px solid #2c5364;
    &:nth-child(2){
        border-bottom: none;
        color:  #2c5364;
        font-size: 30px;
        left: calc(10% + 20px);
    }
    &:nth-child(3){
        color:  #2c5364;
    }

`;

function Item(props){
    return(
        <ItemContainer>
            <Icon src={props.info.weather.icon} alt={props.info.weather.icon}/>
            <Info>{props.info.weatherTempInfo.temp} °C</Info>
            <Info><h1>{props.info.city}</h1></Info>
            <Info>data: {props.info.dateModel.date}</Info>
            <Info>godz:  {props.info.dateModel.time}</Info>
            <Info>{props.info.weather.description}</Info>


            
        </ItemContainer>
        

    )
}

export default Item;