import React from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Products'
import { useEffect, useState } from 'react'
import axios from 'axios'

const HomeScreen = () => {
  const [products,setProducts] = useState([])

useEffect(() =>{
  const fetchProducts = async() => {
    //in proxy we have define the localhost:5000, so in axios, we dont have to define the full path
    const {data} = await axios.get('api/products')
    setProducts(data)
  }
  fetchProducts()
},[])

  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product}/>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default HomeScreen
