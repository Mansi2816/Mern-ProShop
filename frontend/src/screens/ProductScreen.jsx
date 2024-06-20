import { useParams, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useGetProductDetailsQuery, useCreateReviewMutation } from '../slices/productsApiSlice'
import Loader from '../components/Loader'
import { useState } from 'react'
import { addToCart } from '../slices/cartSlice'
import { useDispatch, useSelector } from 'react-redux'

import {
  Row,
  Col,
  Image,
  Form,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
} from 'react-bootstrap'
import Ratings from '../components/Ratings'
import Message from '../components/Message'
import { toast } from 'react-toastify'


const ProductScreen = () => {
const {_id: productId} = useParams()

const dispatch = useDispatch()
const navigate = useNavigate()

const [qty, setQty] = useState (1)
const [rating, setRating] = useState ('')
const [comment, setComment] = useState ('')

const { data: product, refetch ,isLoading, error } = useGetProductDetailsQuery(productId)
 
const [createReview, {isLoading: LoadingProductReview}] = useCreateReviewMutation

const {userInfo} = useSelector((state) => state.auth)

const addToCartHandler = () => {
  dispatch (addToCart({...product, qty: Number(qty) }))
  navigate('/cart')
  }

  const submitHandler = async(e) => {
    e.preventDefault()
    try {
      await createReview({
      productId,
      rating,
      comment
    }).unwrap()
    refetch()
    toast.success('Review added successfully')
    setRating('')
    setComment('')
  } catch(err) {
toast.error(err?.data?.message || err.error)
  }}
  
  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>

    {isLoading ? (
     <Loader/>
    ) : error ? (
      <Message variant='danger'>
      {error?.data?.message || error.error}
    </Message>
    ) : ( 
    <>
    <Row>
        <Col md={5}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={4}>
          <ListGroup variant='flush'>
            <ListGroupItem>
              <h3>{product.name}</h3>
            </ListGroupItem>

            <ListGroupItem>
            <Ratings value={product.rating} text={`${product.numReviews} reviews`} />
            </ListGroupItem>

            <ListGroupItem>
              Price: ${product.price}
            </ListGroupItem>

            <ListGroupItem>
                Description: {product.description}
            </ListGroupItem>

          </ListGroup>
        </Col>
        <Col md={3}>
            <Card>
                <ListGroup variant='flush'>
                    <ListGroupItem>
                <Row>
                    <Col>Price:</Col>
                    <Col>
                        <strong>${product.price}</strong>
                    </Col>
                </Row>
                    </ListGroupItem>
                </ListGroup>

                <ListGroup variant='flush'>
                    <ListGroupItem>
                <Row>
                    <Col>Status:</Col>
                    <Col>
                        <strong>${product.countInStock>0? "In Stock" : 'Out of Stock'}</strong>
                    </Col>
                </Row>
                    </ListGroupItem>
                  {product.countInStock>0 && (
                    <ListGroupItem>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                        <Form.Control as= 'select'
                        value={qty}
                        onChange={(e) => setQty(Number(e.target.value))}>
                          {[...Array(product.countInStock).keys()].map(
                            (x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            )
                          )}
                        </Form.Control>
                        
                        </Col>
                      </Row>
                    </ListGroupItem>
                  )}
                    <ListGroupItem>
                        <Button className='btn-block' type='button' disabled={product.countInStock===0}
                        onClick={addToCartHandler}
                        >
                        Add to Cart</Button>
                    </ListGroupItem>
                </ListGroup>
            </Card>
        </Col>
      </Row>

      <Row className='review'>
<Col md={6}>
<h2>Reviews</h2>
{product.reviews.length === 0 && <Message>No Reviews</Message>}
<ListGroup variant='flush'>
  {product.reviews.map(review => (
    <ListGroupItem key={review._id}>
      <strong>{review.name}</strong>
      <Ratings value={review.rating} />
      <p>{review.createdAt.substring(0, 10)}</p>
      <p>{review.comment}</p>
    </ListGroupItem>
  ))}
<ListGroup.Item>
  <h2>Write a Customer review</h2>
  {LoadingProductReview && <Loader/>}
  {userInfo? (
     <Form onSubmit={submitHandler}>
    <Form.Group controlId='rating' className='my-2'>
      <Form.Label>Rating</Form.Label>
      <Form.Control as='select' value={rating} onChange={(e) => setRating(e.target.value)}>
        <option value=''>Select...</option>
        <option value='1'>1 - Poor</option>
        <option value='2'>2 - Fair</option>
        <option value='3'>3 - Good</option>
        <option value='4'>4 - Very Good</option>
        <option value='5'>5 - Excellent</option>
      </Form.Control>
    <Form.Group controlId='comment' className='my-2'>
      <Form.Label>Comment</Form.Label>
      <Form.Control as='textarea' rows={3} value={comment} onChange={(e) => setComment(e.target.value)} />
    </Form.Group>
    <Button disabled={LoadingProductReview}
    type='submit' variant='primary'>
      Submit
    </Button>
    </Form.Group>
   </Form>
  ) : (
    <Message variant='info'>
      Please <Link to='/login'>Sign In</Link> to write a review
    </Message>
  )}
</ListGroup.Item>

</ListGroup>
</Col>
      </Row>
      </>
      )}
     
    </>
  )
}

export default ProductScreen
