import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useGetOrderDetailsQuery, useDeliverOrderMutation, usePayOrderMutation, useGetPayPalClientIdQuery } from '../slices/orderApiSlice'
import { toast } from 'react-toastify'
import { PayPalButtons, usePayPalScriptReducer} from '@paypal/react-paypal-js'
import { useEffect } from 'react'

const OrderScreen = () => {
  const { id: orderId } = useParams()

  const { data: order, refetch, isLoading, error } = useGetOrderDetailsQuery(orderId)

const [deliverOrder , {isLoading : loadingDeliver}] = useDeliverOrderMutation()

const [payOrder , {isLoading: LoadingPay}] = usePayOrderMutation()

const [{isPending} , paypalDispatch] = usePayPalScriptReducer()

const {data: paypal, isLoading: loadingPayPal, error: errorPayPal} = useGetPayPalClientIdQuery()


const { userInfo } = useSelector((state) => state.auth);


useEffect(() => {
  if (!errorPayPal && !loadingPayPal && paypal.clientId) {
    const loadPaypalScript = async () => {
      paypalDispatch({
        type: 'resetOptions',
        value: {
          'client-id': paypal.clientId,
          currency: 'USD',
        },
      });
      paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
    };
    if (order && !order.isPaid) {
      if (!window.paypal) {
        loadPaypalScript();
      }
    }
  }
}, [errorPayPal, loadingPayPal, order, paypal, paypalDispatch]);

function onApprove(data, actions) {
  return actions.order.capture().then(async function (details) {
    try {
      await payOrder({ orderId, details });
      refetch();
      toast.success('Order is paid');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  });
}
function onError(err) {
  toast.error(err.message);
}

function createOrder(data, actions) {
  return actions.order
    .create({
      purchase_units: [
        {
          amount: { value: order.totalPrice },
        },
      ],
    })
    .then((orderID) => {
      return orderID;
    });
}


const deliverOrderHandler = async() => {
  try {
    await deliverOrder(orderId)    
    toast.success('Order Delivered')
  } catch (err) {
    toast.error(err?.data?.message || err.message)
  }
}

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error?.data?.message  || error.error}</Message>
  ) : (
    <>
    
      <h1>Order {order.id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>Shipping</h3>
              <p>
                <strong>Name: </strong>
                {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                {order.shippingAddress.postalCode}, {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant='success'>Delivered on {order.deliveredAt}</Message>
              ) : (
                <Message variant='danger'>Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h3>Payment Method</h3>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant='success'>Paid on {order.paidAt}</Message>
              ) : (
                <Message variant='danger'>Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems?.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image src={item.image} alt={item.name} fluid rounded />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>{item.name}</Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price.toFixed(2)} = $
                          {(item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              
              {/* {!order.isPaid && (
                <ListGroup.Item>
                  <Button type='button' className='btn btn-block' onClick={payHandler}>
                    Pay Now
                  </Button>
                </ListGroup.Item>)} */}

{!order.isPaid && (
                <ListGroup.Item>
                  {LoadingPay && <Loader />}

                  {isPending ? (
                    <Loader />
                  ) : (
                    <div>
                      {/* THIS BUTTON IS FOR TESTING! REMOVE BEFORE PRODUCTION! */}
                      {/* <Button
                        style={{ marginBottom: '10px' }}
                        onClick={onApproveTest}
                      >
                        Test Pay Order
                      </Button> */}

                      <div>
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        ></PayPalButtons>
                      </div>
                    </div>
                  )}
                </ListGroup.Item>
              )}
              {loadingDeliver && <Loader/>}
              {userInfo && userInfo.isAdmin && !order.isDelivered && (
                <ListGroup.Item>
                  <Button
                    type='button'
                    className='btn btn-block'
                    disabled={loadingDeliver}
                    onClick={deliverOrderHandler}
                  >Mark as delivered
                  </Button>
                  
                </ListGroup.Item>
              )}

            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default OrderScreen
