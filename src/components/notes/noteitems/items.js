import React, { useState } from "react";
import styled from "styled-components";
import { TiDelete } from "react-icons/ti";
import { GrDocumentUpdate } from "react-icons/gr";
import AddItem from "./additem";
import {GrClose} from 'react-icons/gr';
const ItemContainer = styled.div`
  width: 80%;
  position: relative;
  margin-left: calc(10% - 20px);
  background-color: lightgray;
  margin-top: 3vh;
  padding: 20px 20px 20px 20px;
  border-radius: 5px;
  opacity: 1;
  animation: mymove 0.5s ease-in;
  padding-bottom: 20vh;
  @keyframes mymove {
    from { 
        opacity: 0;
      top: 50px;
    }
    to {
        opacity: 1;
      top: 0px;
    }
  }
`;

const AuthorDataInfo = styled.h4``;

const NoteFooter = styled.div`
  height: 10%;
  position: absolute;
  bottom: 2vh;
  display: grid;
  width: 90%;
  left: 5%;
  grid-template-columns: 50% 50%;
  & > ${AuthorDataInfo}:nth-child(2) {
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
  color: #2c5364;
  margin-top: 40px;
`;

const Content = styled.h4`
  color: #403e3a;
`;

const ExitButton = styled(GrClose)`
  font-size: 40px;
  font-weight: 700;
  padding: 10px 10px 10px 10px;
  position: fixed;
  top: calc(10% + 20px);
  right: calc(10% + 20px);
  cursor: pointer;
  z-index: 200;
`;

function Items(props) {
    const [click,setClick] = useState("");

    async function handleItemDel(e) {
        await fetch("http://localhost:8200/notes?id=" + e, {
          method: "delete",
          headers: {
            "Content-Type": "application/json",
          },
        });
        window.location.reload();
      }


  return (
    <ItemContainer>
      <DeleteIcon style={{color: '#650000'}} onClick={e => handleItemDel(props.dane.noteId)}></DeleteIcon>
      <UpdateIcon onClick={e => setClick("yes")}></UpdateIcon>
      {
        click === "yes" ? <><AddItem update={props.dane}></AddItem> <ExitButton onClick={(e) => setClick("no")}></ExitButton></> : null
      }
      <Topic>{props.dane.topic}</Topic>
      <Content>{props.dane.content}</Content>
      <NoteFooter>
        <AuthorDataInfo>{props.dane.author.author}</AuthorDataInfo>
        <AuthorDataInfo>{props.dane.dateModel.date}</AuthorDataInfo>
      </NoteFooter>
    </ItemContainer>
  );
}

export default Items;
