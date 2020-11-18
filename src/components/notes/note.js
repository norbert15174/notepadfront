import React from "react";
import styled from "styled-components";
import Items from "./noteitems/items";
import { MdAddCircle } from "react-icons/md";
import AddItem from "./noteitems/additem";
import { GrClose } from "react-icons/gr";
import { FaSearch } from "react-icons/fa";

const NoteContener = styled.div`
  width: 100vw;
  min-height: calc(100vh - 50px);
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
  grid-auto-rows: 50vh;
  position: relative;
  background: linear-gradient(to right, #0f2027, #203a43, #2c5364);
  padding-bottom: 50px;
`;

const AddNote = styled(MdAddCircle)`
  font-size: 80px;
  color: #282828;
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

const Search = styled.input`
  width: ${(props) => (props.isclick === "no" ? "0px" : "200px")};
  transform: translate(-50%, 0%);
  padding-top: 15px;
  padding-bottom: 15px;
  padding-right: 10px;
  padding-left: ${(props) => (props.isclick === "no" ? "40px" : "60px")};
  position: relative;
  left: calc(50%);
  outline: none;
  top: 30px;
  border-radius: 20px;
  transition: all 1s;
  border: none;
  background-color: black;
  color: white;
`;

const SearchContainer = styled.div`
  width: 100%;
  height: 100px;
  background: #434343;
`;

const SearchIcon = styled(FaSearch)`
  font-size: 20px;
  position: absolute;
  transition: left 1s;
  left: ${(props) =>
    props.isclick === "no" ? "calc(50% - 11px)" : "calc(50% - 120px)"};
  top: 42px;
  border-right: ${(props) =>
    props.isclick === "no" ? "none" : "1px solid white"};
  padding: 2px 10px 2px 2px;
  color: white;
  cursor: pointer;
`;

class Note extends React.Component {
  state = {
    data: "",
    ready: "no",
    additem: "no",
    modifyitem: "no",
    clicked: "no",
  };
  async componentDidMount() {
    await fetch("http://localhost:8200/notes")
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          data,
          ready: "yes",
        })
      );
  }

  handleItem() {
    this.setState({
      additem: this.state.additem === "no" ? "yes" : "no",
    });
  }
  handleClick() {
    this.setState({
      clicked: this.state.clicked === "yes" ? "no" : "yes",
    });
  }

  async handleSearch(e) {
    await fetch("http://localhost:8200/notes/" + e.target.value)
      .then((response) => response.json())
      .then((data) =>
        data === this.state.data ? null : this.setState({ data, ready: "yes" })
      )
      .catch((error) =>
        this.setState({
          ready: "no",
        })
      );
  }

  render() {
    return (
      <>
        <SearchContainer>
          <Search
            placeholder="search..."
            isclick={this.state.clicked}
            onChange={(e) => this.handleSearch(e)}
          />
          <SearchIcon
            onClick={(e) => this.handleClick()}
            isclick={this.state.clicked}
          ></SearchIcon>
        </SearchContainer>

        <NoteContener>
          {this.state.ready === "yes" ? (
            <>
              {this.state.data.map((dane) => (
                <Items key={dane.noteId} dane={dane}></Items>
              ))}{" "}
            </>
          ) : null}
        </NoteContener>
        {this.state.additem === "yes" ? (
          <>
            <AddItem></AddItem>
            <ExitButton onClick={(e) => this.handleItem()}></ExitButton>
          </>
        ) : null}
        <AddNote onClick={(e) => this.handleItem()}></AddNote>
      </>
    );
  }
}

export default Note;
