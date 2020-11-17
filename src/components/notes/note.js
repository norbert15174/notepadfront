import React from 'react';
import styled from 'styled-components';
import Items from './noteitems/items';
import {MdAddCircle} from 'react-icons/md';


const NoteContener = styled.div`

    width: 100vw;
    min-height: 100vh;
    display: grid;
    grid-template-columns: 25% 25% 25% 25%;
    grid-auto-rows: 50vh;
    position: relative;
    background-color: #cccc00;
`;

const AddNote = styled(MdAddCircle)`

    font-size: 80px;
    color: grey;
    padding: 10px 10px 10px 10px;
    position: fixed;
    right: 30px;
    bottom: 30px;
    cursor: pointer;


`;

class Note extends React.Component{

    state = {
        data: '',
        ready:'no'
    }

    async componentDidMount() {
        await fetch("http://localhost:8200/notes")
          .then((response) => response.json())
          .then((data) => this.setState({ data, ready: 'yes' }));
      }
    


    render(){
        return(
            <>
            {this.state.ready === 'yes' ? 
            <>
            <NoteContener>
            {this.state.data.map((dane) => (
               <Items dane={dane}></Items>
            ))} 
            </NoteContener>
            <AddNote></AddNote>
            </>:null}
            </>
        )
    }


}

export default Note;