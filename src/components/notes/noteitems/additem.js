import React , { useState } from 'react';
import styled from 'styled-components';

const FormWrapper = styled.div`

    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0vh;
    left: 0vw;
    z-index: 100;
    background-color: rgba(0,0,0,0.7);
    opacity: 1;
    


`;

const Form = styled.div`

    width: 80vw;
    height: 80vh;
    position: fixed;
    top: 10vh;
    left: 10vw;
    z-index: 120;
    background: #282828;
    opacity: 1;
    transition: opacity 1s;


`;

const AddItemInput = styled.input`

    width: 40%;
    height: 20px;
    padding: 10px 10px 10px 10px;
    margin-left: calc(30% - 10px);
    margin-bottom: 2%;
    background-color: #434343;
    color: white;
    outline-style: none;
    border-radius: 5px;
    &:focus{
        border: 2px solid #2c5364;
    }


`;

const HeaderOfItem = styled.h1`

    text-align: center;
    margin-top: 5%;
    margin-bottom: 2%;
    color: white;

`;

const ContentToAdd = styled.textarea`

    width: 40%;
    height: 25%;
    padding: 10px 10px 10px 10px;
    margin-left: calc(30% - 10px);
    margin-bottom: 2%;
    background-color: #434343;
    color: white;
    outline-style: none;
    border-radius: 5px;
    &:focus{
        border: 2px solid #2c5364;
    }
`;
const ItemLabel = styled.label`
    display: block;
    width: 60%;
    margin-left: calc(30% - 10px);
    color: #2c5364;
    padding: 10px 10px 10px 10px;
    font-size: 18px;
    font-weight: 500;
    
    

`;

const ButtonAdd = styled.button`

    width: 250px;
    margin-left: calc(50% - 125px);
    padding: 15px 15px 15px 15px;
    background: #2c5364;
    border-radius: 5px;
    color: white;
    font-size: 22px;
    font-weight: 700;
    cursor: pointer;
    outline-style: none;
    border: none;


`;


function AddItem(props){
    const [topic, setTopic] = useState("");
    const [author, setAuthor] = useState("");
    const [content, setContent] = useState("");
    const [id, setId] = useState(-1);

    async function handleItemAdd() {
        await fetch("http://localhost:8200/notes", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            topic: topic,
            author: {
                author: author,
            },
            content: content
          }),
        });
        window.location.reload();
      }
      async function handleItemUpdate() {
        await fetch("http://localhost:8200/notes", {
          method: "put",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            noteId: id,
            topic: topic,
            author: {
                author: author,
            },
            content: content
          }),
        });
        window.location.reload();
      }

        return(
            <FormWrapper>
                {
                    props.update && id === -1 ? (setId(props.update.noteId),setAuthor(props.update.author.author),setTopic(props.update.topic),setContent(props.update.content)) : null                   
                }
                <Form>
                    <HeaderOfItem>{props.update ? "Modify Note" : "Add New Note"}</HeaderOfItem>
                    <ItemLabel>Topic</ItemLabel>
                    <AddItemInput onChange={(e) => setTopic(e.target.value)} value={topic} ></AddItemInput>
                    <ItemLabel>Author</ItemLabel>
                    <AddItemInput onChange={(e) => setAuthor(e.target.value)} value={author} disabled={props.update ? true : false}></AddItemInput>
                    <ItemLabel>Content</ItemLabel>
                    <ContentToAdd onChange={(e) => setContent(e.target.value)} value={content} ></ContentToAdd>
                    {props.update ? <ButtonAdd onClick={handleItemUpdate}>Modify Note</ButtonAdd> : <ButtonAdd onClick={handleItemAdd}>Add Note</ButtonAdd>}
                    
                </Form>
            </FormWrapper> 
    )
    
}

export default AddItem;