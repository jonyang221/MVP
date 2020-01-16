import React from 'react';
import styled from 'styled-components';

const TableRow = styled.tr`

  font-size: 18px;
  text-align: center;
  height: auto;
  border-bottom: 2px solid black;
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
`

const TableData = styled.td`
  width: auto;
  background-color: white;
  font-family: Lato,sans-serif;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  padding: 25px;
`

const Image = styled.img`
  margin-left: 10px;
  margin-right: 10px;
  padding: 0px;
  height: auto;
`

class Sneakers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.details._id,
      brand: this.props.details.Brand,
      name: this.props.details.Name,
      color: this.props.details.Color,
      size: this.props.details.Size,
      pid: this.props.details.PID,
      retail: `$${this.props.details.Retail}`,
      bid: 'N/A',
      highlighted: false,
      photo: '',
      edit: false
    }
    this.getDetails = this.getDetails.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.toggleSize = this.toggleSize.bind(this);
    this.getInput = this.getInput.bind(this);
    this.updateDB = this.updateDB.bind(this);
  }

  onHover() {
    this.setState({ highlighted: true })
  }

  offHover() {
    this.setState({ highlighted: false })
  }

  updateDB() {
    fetch(`/`, {
      method: 'PUT',
      body: JSON.stringify({
        _id : this.state.id,
        size: this.state.size
      }),
      headers: {'Content-type': 'application/json'}
    })
    .then(() => this.props.updateList());
  }
  getInput(event) {
    let tarGet = event.target.name;
    this.setState({
      [tarGet]: event.target.value,
      edit: false
    }, () => this.updateDB());
  }

  deleteItem() {

    fetch(`/`, {
      method: 'DELETE',
      body: JSON.stringify({ _id : this.state.id }),
      headers: {'Content-type': 'application/json'}
    })
    .then(() => this.props.updateList());
  }

  toggleSize() {
    this.setState({ edit: !this.state.edit })
  }

  getDetails() {
    fetch(`https://tranquil-savannah-23156.herokuapp.com/https://stockx.com/api/browse?&_search=${this.state.brand}%20${this.state.name}%20${this.state.color}&dataType=product&country=US`)
      .then(results => results.json())
      .then(results => this.setState({
          bid: `$${results.Products[0].market.highestBid}.00`,
          photo: results.Products[0].media.thumbUrl
        })
      )
  }

  componentDidMount() {
    this.getDetails();
  }

  render() {

    let shoe = this.props.details;
    let style = {
      opacity: this.state.highlighted ? '1' : '0',
      cursor: this.state.highlighted ? 'pointer' : 'default',
      textShadow: '-1px -1px 5px #a2c6a2'
    };



    return (
      <>
        <TableRow onMouseOver={this.onHover.bind(this)} onMouseLeave={this.offHover.bind(this)}>
          <TableData>{this.state.brand}</TableData>
          <TableData>{this.state.name}</TableData>
          <TableData>{this.state.color}</TableData>
          <TableData>{!this.state.edit ? this.state.size :
                        <Select name="size" defaultValue={this.state.size} onChange={this.getInput}>
                        <option value="Size"></option>
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
                        </Select>}</TableData>
          <TableData>{this.state.pid}</TableData>
          <TableData>{this.state.retail}</TableData>
          <TableData>{this.state.bid}</TableData>
          <TableData>
          <Image src={this.state.photo}/>
          </TableData>
          <TableData style={style} onClick={this.toggleSize.bind(this)}>{this.state.edit ? 'CANCEL' : 'EDIT'}</TableData>
          <TableData style={style} onClick={this.deleteItem.bind(this)}>DELETE</TableData>
        </TableRow>
      </>
    )
  }

}

export default Sneakers;