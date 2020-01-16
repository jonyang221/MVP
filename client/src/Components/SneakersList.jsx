import React from 'react';
import Sneakers from './Sneakers.jsx'
import styled from 'styled-components';

const ListWrapper = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
`

const SneakerTable = styled.table`
display: flex;

  font-family: Lato,sans-serif;

  background: white;
  font-size: 18px;
  border-collapse: collapse;
  text-align: center;
  border-radius: 5px;
`

const SneakerBody = styled.tbody`

  background: white;
  font-size: 18px;
  border: 3px solid black;
  border-radius: 5px;
`

const TableRow = styled.tr`
  background-color: #a2c6a2;
  font-size: 18px;
  text-align: center;
  border: 3px solid black;
  margins: 0px;
  border-radius: 5px;
  width: 100%;
`

const TableHeader = styled.th`
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  padding: 15px;
  border-collapse: collapse;
  border-bottom: 3px;
`

let SneakersList = (props) => {

  return (
    <ListWrapper>
    <>
    <h1>MY PORTFOLIO</h1>
    <SneakerTable>
      <SneakerBody>
      <TableRow>
        <TableHeader>BRAND</TableHeader>
        <TableHeader>MODEL</TableHeader>
        <TableHeader>COLOR</TableHeader>
        <TableHeader>SIZE (US)</TableHeader>
        <TableHeader>PRODUCT ID</TableHeader>
        <TableHeader>RETAIL PRICE</TableHeader>
        <TableHeader>MARKET PRICE</TableHeader>
        <TableHeader></TableHeader>
        <TableHeader></TableHeader>
        <TableHeader></TableHeader>
      </TableRow>
      {props.shoes.map(shoe => <Sneakers details={shoe} updateList={props.updateList} key={shoe._id}/> )}
      </SneakerBody>
    </SneakerTable>
    </>
    </ListWrapper>
  );
}

export default SneakersList;