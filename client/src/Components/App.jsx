import React from 'react';
import AddSneaker from './AddSneaker.jsx';
import SneakersList from './SneakersList.jsx';
import styled from 'styled-components';

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column
  background: transparent;
  justify-content: center;
  max-width: 90%;
  font-family: Lato,sans-serif;
  font-size: 20px;
  text-align: center;

  margin-left: 10%;
  margin-right: 10%;
  `
const H1 = styled.h1`
  font-size: 48px;
  font-weight: bold;
`

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inventory: [],
      loaded: false
    }
    this.getInventory = this.getInventory.bind(this);
  }

  getInventory() {
    fetch('/getList')
      .then(results => results.json())
      .then(list => this.setState({
        inventory: list,
        loaded: true
      })
    )
  }


  componentDidMount() {
    this.getInventory();
  }

  render() {

    return (

      <AppWrapper>
        <H1>MY SNEAKER TRACKER</H1>

        <AddSneaker updateList={this.getInventory}/>
        {!this.state.loaded ? null :
        <SneakersList shoes={this.state.inventory} updateList={this.getInventory} value={this.state.value}/>
        }
      </AppWrapper>

    )
  }

}

export default App;