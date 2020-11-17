import React from 'react';
import styled from 'styled-components';
import Items from './noteitems/items';
import {MdAddCircle} from 'react-icons/md';
import AddItem from './noteitems/additem';
import {GrClose} from 'react-icons/gr';

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


class Note extends React.Component{

    state = {
        data: '',
        ready:'no',
        additem: 'no',
        modifyitem: 'no'
    }

    async componentDidMount() {
        await fetch("http://localhost:8200/notes")
          .then((response) => response.json())
          .then((data) => this.setState({ data, ready: 'yes' }));
      }
    

      handleItem(){
              this.setState({
                  additem: this.state.additem === 'no' ? 'yes' : 'no',
              })
          
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
            {this.state.additem === 'yes' ? <><AddItem></AddItem> <ExitButton onClick={e => this.handleItem()}></ExitButton></> : null}
            <AddNote onClick={e => this.handleItem()}></AddNote>
            
            </>:null}
            
            </>
        )
    }


}

export default Note;