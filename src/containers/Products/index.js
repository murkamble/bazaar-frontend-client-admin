import React, { useState } from 'react';
import Layout from "../../components/Layout";
import { Row, Col, Container, Button, Table } from "react-bootstrap";
import Input from "../../components/UI/Input";
import Modal from "../../components/UI/Modal";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, deleteProductById } from '../../actions';
import { generatePublicUrl } from '../../urlConfig';
import "./style.css";

const Products = (props) => {

    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [productPictures, setProductPictures] = useState([]);
    const [show, setShow] = useState(false);
    const category = useSelector(state => state.category)
    const dispatch = useDispatch();
    const product = useSelector(state => state.product)
    const [productDetailModal, setProductDetailModal] = useState(false)
    const [productDetails, setProductDetails] = useState(null)

    const handleClose = () => {
        setShow(false)
    };
    const handleShow = () => setShow(true);



    const submitProductForm = () => {
        const form = new FormData();
        form.append('name', name);
        form.append('quantity', quantity);
        form.append('price', price);
        form.append('description', description);
        form.append('category', categoryId);

        for (let pic of productPictures) {
            form.append('productPicture', pic);
        }
        dispatch(addProduct(form)).then(() => setShow(false));
    };




    const createCategoryList = (categories, options = []) => {
        for (let category of categories) {
            options.push({ value: category._id, name: category.name });
            if (category.children, options) {
                createCategoryList(category.children, options)
            }
        }
        return options
    }

    const handleProductPictures = (e) => {
        setProductPictures([
            ...productPictures,
            e.target.files[0]
        ]);
    }

    const renderProducts = () => {
        return (
            <Table style={{ fonstSize: 10 }} responsive="sm">
                <thead>
                    <tr>
                        <th>Sr.</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Category</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        product.products.length > 0 ?
                            product.products.map((product, i = 0) =>
                                <tr key={product._id}>
                                    <td>{i + 1}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.quantity}</td>
                                    <td>{product.category.name}</td>
                                    <td>
                                        <button onClick={() => showProductDetailModal(product)}>
                                            info
                    </button>
                                        {/* <button
                                            onClick={() => {
                                                const payload = {
                                                    productId: product._id,
                                                };
                                                dispatch(deleteProductById(payload))
                                                window.location.reload()
                                            }}
                                        >
                                            del
                    </button> */}
                                    </td>
                                </tr>
                            ) : null
                    }
                </tbody>
            </Table>
        );
    }


    const renderAddProductModal = () => {
        return (
            <Modal
                show={show}
                handleClose={handleClose}
                modalTitle={'Add New Product'}
                onSubmit={submitProductForm}
            >
                <Input
                    label="Name"
                    value={name}
                    placeholder={'Product Name'}
                    onChange={(e) => setName(e.target.value)}
                />
                <Input
                    label="Quantity"
                    value={quantity}
                    placeholder={'Quantity'}
                    onChange={(e) => setQuantity(e.target.value)}
                />
                <Input
                    label="Price"
                    value={price}
                    placeholder={'Price'}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <Input
                    label="Description"
                    value={description}
                    placeholder={'Description'}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <select
                    value={categoryId}
                    className="form-control"
                    onChange={(e) => setCategoryId(e.target.value)}
                >
                    <option>Select Category</option>
                    {
                        createCategoryList(category.categories).map(option =>
                            <option
                                key={option.value}
                                value={option.value}
                            >{option.name}</option>
                        )
                    }
                </select>
                {
                    productPictures.length > 0 ?
                        productPictures.map((pic, index) => {
                            if (pic==undefined) {
                                return null
                            } else {
                                return <div key={index}>{pic.name}</div>
                            }
                            // console.log(pic==undefined)
                        }) : null
                }
                <input type="file" name="productPicture" onChange={handleProductPictures} />
            </Modal>
        )
    }

    const handleCloseProductDetailModal = () => {
        setProductDetailModal(false)
    }

    const showProductDetailModal = (product) => {
        setProductDetails(product)
        setProductDetailModal(true)
    }

    const renderProductDetailModal = () => {
        if (!productDetails) {
            return null
        }
        return (
            <Modal
                show={productDetailModal}
                handleClose={handleCloseProductDetailModal}
                modalTitle={'Product Details'}
                size='lg'
            >
                <Row>
                    <Col md="12">
                        <label className="key" >Name</label>
                        <p className="value" >{productDetails.name}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md="4">
                        <label className="key" >Price</label>
                        <p className="value" >{productDetails.price}</p>
                    </Col>
                    <Col md="4">
                        <label className="key" >Quantity</label>
                        <p className="value" >{productDetails.quantity}</p>
                    </Col>
                    <Col md="4">
                        <label className="key" >Category</label>
                        <p className="value" >{productDetails.category.name}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        <label className="key" >Description</label>
                        <p className="value" >{productDetails.description}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        <label className="key" >Product Pictures</label>
                        <div style={{ display: 'flex' }}>
                            {productDetails.productPictures.map(picture =>
                                <div className="productImgContainer">
                                    <img src={generatePublicUrl(picture.img)} />
                                </div>
                            )}
                        </div>
                    </Col>
                </Row>
            </Modal>
        )
    }


    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h4>Products</h4>
                            <button onClick={handleShow}>Add</button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {renderProducts()}
                    </Col>
                </Row>
            </Container>
            {renderAddProductModal()}
            {renderProductDetailModal()}
        </Layout>
    )
}

export default Products;