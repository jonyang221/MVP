import React from 'react';
import styled from 'styled-components';

const addShoeWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 0px;
  padding: 0px;
`
const AddShoe = styled.div`


  margin: 0px;
  padding: 0px;
`
const H2 = styled.h2`
  margin: 0px;
  padding: 0px;
  :hover {
    cursor: pointer;
    text-shadow: -1px -1px 5px #a2c6a2;
  }
`
const Input = styled.input`

  font-size: 16px;
  font-weight: bold;
  font-color: black;
  margin: 20px;
  padding: 20px;
  border-radius: 5px;
  border: 2px solid black;
  background-color: #d8ebd8;
  opacity: 0.8;
`
const Select = styled.select`
  font-size: 16px;
  background-color: transparent;
  font-weight: bold;
  color: black;
  margin: 20px;
  padding: 20px;
  border-radius: 5px;
  border: 2px solid black;
  height: 63px;
  background-color: #d8ebd8;
  opacity: 0.8;
`

const Form = styled.form`
  margin: 10px;
  padding: 10px;
`

const InsertShoe = styled.div`
  margin: 0px;
  padding: 0px;
`
const Button = styled.button`
  display: inline-flex;
  font-size: 16px;
  font-weight: bold;
  font-color: gray;
  margin: 20px;
  padding: 20px;
  border-radius: 5px;
  border: 2px solid black;
  background-color: #d8ebd8;
  opacity: 0.8;
  :hover {
    cursor: pointer;
  }
`
class AddSneaker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      brand: '',
      name: '',
      color: '',
      size: '',
      pid: '',
      retail: '',
      bid: '',
      displayed: false
    }
    this.getInput = this.getInput.bind(this);
    this.addShoe = this.addShoe.bind(this);
    this.addToggle = this.addToggle.bind(this);
  }

  addToggle() {
    this.setState({ displayed: !this.state.displayed})
  }

  getInput(event) {
    let tarGet = event.target.name;
    this.setState({[tarGet]: event.target.value});
  }

  addShoe(event) {
    event.preventDefault();
    if (this.state.brand === '' || this.state.name === '' || this.state.color === '' || this.state.size === 'Size') {
      alert('Please complete all required fields!');
      return null;
    }

    fetch(`https://tranquil-savannah-23156.herokuapp.com/https://stockx.com/api/browse?&_search=${this.state.brand}%20${this.state.name}%20${this.state.color}&dataType=product&country=US`, {
      method: 'get',
    })
    .then(results => results.json())
    .then(results => this.setState({
      brand: results.Products[0].brand.toUpperCase(),
      name: results.Products[0].shoe.split(' ').slice(1).join(' ').toUpperCase(),
      color: results.Products[0].colorway.toUpperCase(),
      pid: results.Products[0].styleId.toUpperCase(),
      retail: results.Products[0].retailPrice,
      bid: `$${results.Products[0].market.highestBid}.00`,
      photo: results.Products[0].media.thumbUrl
      }, () => {
        let data = {
          brand: this.state.brand,
          name: this.state.name,
          color: this.state.color,
          size: this.state.size,
          pid: this.state.pid,
          retail: this.state.retail
        }

        fetch('/', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {'Content-type': 'application/json'}
        })
        .then(() => {
          this.props.updateList();

          })
        })
      )
      event.target.reset();
  }

  render() {
    let style = {
      display: this.state.displayed ? 'block' : 'none'
    };

    return (
      <AddShoe>
        <H2 onClick={this.addToggle}>{!this.state.displayed ? 'ADD NEW SNEAKER' : 'CLOSE FORM'}</H2>
        <InsertShoe style={style} className="newSneaker-form">
          <form type="submit" onSubmit={this.addShoe}>
            <div className="details">
              <Input type="text" name="brand" placeholder="Brand" onChange={this.getInput}/>
              <Input type="text" name="name" placeholder="Model" onChange={this.getInput}/>
              <Input type="text" name="color" placeholder="Color" onChange={this.getInput}/>
              <Select name="size" defaultValue={this.state.size} onChange={this.getInput}>
                <option value="Size">Size</option>
                <option value="4">4</option>
                <option value="4.5">4.5</option>
                <option value="5">5</option>
                <option value="5.5">5.5</option>
                <option value="6">6</option>
                <option value="6.5">6.5</option>
                <option value="7">7</option>
                <option value="7.5">7.5</option>
                <option value="8">8</option>
                <option value="8.5">8.5</option>
                <option value="9">9</option>
                <option value="9.5">9.5</option>
                <option value="10">10</option>
                <option value="10.5">10.5</option>
                <option value="11">11</option>
                <option value="11.5">11.5</option>
                <option value="12">12</option>
                <option value="12.5">12.5</option>
                <option value="13">13</option>
                <option value="14">14</option>
                </Select>
              <Input type="text" name="pid" placeholder="Product ID (optional)" onChange={this.getInput}/>
              <Button type="submit">Add to portfolio</Button>
            </div>
          </form>
        </InsertShoe>
      </AddShoe>
    )
  }

}

export default AddSneaker;