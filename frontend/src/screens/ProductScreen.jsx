import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useGetProductDetailsQuery } from '../slices/productsApiSlice'
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
} from 'react-bootstrap'
import Ratings from '../components/Ratings'


const ProductScreen = () => {
const {_id: productId} = useParams()

const { data: product, isLoading, error } = useGetProductDetailsQuery(productId)
 
   
  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>

    {isLoading ? (
      <h2>Loading...</h2>
    ) : error ? (
      <div>
        {error?.data?.message || error.error}
      </div>
    ) : ( <Row>
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

                    <ListGroupItem>
                        <Button className='btn-block' type='button' disabled={product.countInStock===0}>
                        Add to Cart</Button>
                    </ListGroupItem>
                </ListGroup>
            </Card>
        </Col>
      </Row>)}
     
    </>
  )
}

export default ProductScreen
