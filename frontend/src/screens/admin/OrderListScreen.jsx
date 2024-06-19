import React from 'react'
import { Table,Button } from 'react-bootstrap'
import { FaTimes } from 'react-icons/fa'
import LinkContainer from 'react-router-bootstrap/LinkContainer'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { useGetOrdersQuery } from '../../slices/orderApiSlice'
import { useSelector, useDispatch } from 'react-redux'

const OrderListScreen = () => {
  return (
    <div>OrderListScreen</div>
  )
}

export default OrderListScreen