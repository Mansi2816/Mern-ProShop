import React from 'react'
import { Table,Button } from 'react-bootstrap'
import { FaTimes, FaCheck, FaTrash } from 'react-icons/fa'
import LinkContainer from 'react-router-bootstrap/LinkContainer'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { useDeleteOrderMutation, useGetOrdersQuery  } from '../../slices/orderApiSlice'
import { toast } from 'react-toastify'


const OrderListScreen = () => {

const {data: orders , isLoading, error, refetch} = useGetOrdersQuery()


const [deleteOrder] = useDeleteOrderMutation()



const deleteHandler = async(id) => {
if(window.confirm('Are you sure?')){
    try {
      await deleteOrder(id).unwrap();
      refetch()
      toast.success('Order deleted')
    } catch (err) {
    toast.error(err?.data?.message || err.error)
      
    }
}
}

  return (  
    <>
    <h1>Orders</h1>
    {isLoading ? <Loader/> : error ? <Message variant= 'danger'> {error}</Message> : (
      <Table striped bordered hover responsive className="table-sm">
         <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>ACTION</th>
              
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>${order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <FaTimes style={{ color: 'red' }} />
                  )}
                </td>
                <td>              
                    {order.isDelivered  ? (
                    <FaCheck style={{ color: 'green' }} />
                  ) : (
                    <FaTimes style={{ color: 'red' }} />
                  )}    
                </td>
                <td>
                                    
                  <LinkContainer to={`/orders/${order._id}`}>
                    <Button variant="light" className="btn-sm" >          
                      Details                      
                    </Button>                
                  </LinkContainer>                  
                  <Button variant="danger" className="btn-sm" onClick={() => deleteHandler(order._id)}>
                    <FaTrash />
                  </Button>
                  
                </td>
              </tr>
            ))}
          </tbody>
      </Table>
    ) }
    </>
  )
}

export default OrderListScreen