import React from 'react';
import styled from 'styled-components';
import {TiDelete} from 'react-icons/ti';
import {GrDocumentUpdate} from 'react-icons/gr';
const ItemContainer = styled.div`

    width: 80%;
    position: relative;
    margin-left: calc(10% - 20px);
    background-color: white;
    margin-top: 3vh;
    padding: 20px 20px 20px 20px;
    border-radius: 5px;
`;

const AuthorDataInfo = styled.h4`
    


`;

const NoteFooter = styled.div`

    height: 10%;
    position: absolute;
    bottom: 0;
    display: grid;
    width: 90%;
    left: 5%;
    grid-template-columns: 50% 50%;
    &>${AuthorDataInfo}:nth-child(2){
        text-align: right;
    }
    

`;

const DeleteIcon = styled(TiDelete)`

    position: absolute;
    right: 10px;
    font-size: 40px;
    top: 15px;
    cursor: pointer;
`;
const UpdateIcon = styled(GrDocumentUpdate)`

    position: absolute;
    right: 60px;
    font-size: 40px;
    top: 15px;
    cursor: pointer;
`;

const Topic = styled.h2`

    color: #403e3a;

`;

const Content = styled.h4`

    color: #403e3a;

`;

function Items(props){
    return(<ItemContainer>
        <DeleteIcon></DeleteIcon>
        <UpdateIcon></UpdateIcon>
        <Topic>{props.dane.topic}</Topic>
        <Content>{props.dane.content}</Content>
        <NoteFooter>
        <AuthorDataInfo>{props.dane.author.author}</AuthorDataInfo>
        <AuthorDataInfo>{props.dane.dateModel.date}</AuthorDataInfo>
        </NoteFooter>
        



    </ItemContainer>)
}

export default Items;