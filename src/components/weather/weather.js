import React from "react";
import styled from "styled-components";
import Item from "./weatheritem/item";
import './weatheritem/weather.css';
const WeatherContainer = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, #232526, #414345);
  box-shadow: 10px #e4e5e6;
  position: fixed;
  z-index: 500;
  transform: translateX(0%);
  opacity: 1;
  color: white;
  animation: load 2s ease-in-out;

}
  @keyframes load {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const Scroll = styled.div`
    width: 66vw;
    left: 5vw;
    position: relative;
    height: 100%;
    display: grid;
    grid-template-columns: 30% 30% 30%;
`;


class Weather extends React.Component {
  state = {
    data: "",
    ready: "",
  };

  async componentDidMount() {
    await fetch("http://localhost:8200/weather/")
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          data,
          ready: "yes",
        })
      )
      .catch((error) =>
        this.setState({
          ready: "no",
        })
      );
  }

  render() {
    return (
      <WeatherContainer className="scroll">
          <Scroll>
        {this.state.ready === "yes"
          ? this.state.data.map((dane) => <Item info={dane}></Item>)
          : null}
          </Scroll>
      </WeatherContainer>
    );
  }
}

export default Weather;
