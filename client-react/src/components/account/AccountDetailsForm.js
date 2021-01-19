import { useState, useEffect } from 'react'
import axios from 'axios'
import Joi from 'joi'
import { Form, Button, FormLabel, FormControl, FormGroup, FormText, FormCheck, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';

const AccountDetailsForm = () => {
    const [formData, setFormData] = useState({
        type: '',
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        organisation: '',
        contactNum: '',
        email: '',
    })

    const userId = useParams().id

    // validation is WIP
    const formSchema = Joi.object({
        username: Joi.string().alphanum().min(8).required(),
        password: Joi.string().alphanum().min(8).required(),
        type: Joi.string().required(),
        firstName: Joi.string().regex(/^[a-zA-Z]{2}[a-zA-Z]+/).required(),
        lastName: Joi.string().required(),
        organisation: Joi.string().alphanum(),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
        contactNum: Joi.string().length(8).regex(/^[0-9]{8}$/).required(),
    })

    const data = [
        {
            _id: "Z",
            firstName: "Simon",
            lastName: "Lau",
            organisation: "General Assembly Hungry",
            contactNum: "99998888",
            email: "simonlau@ga.com",
            username: "simonlau",
            password: "1234",
            type: "contributor",
            contributeList: ["1"],
            myCart: [],
            receivedList: [],
            createdAt: 1029301932010,
            imgFile: "",
            status: "active",
        },
        {
            _id: "A",
            firstName: "Nausheen",
            lastName: "yoyo",
            organisation: "",
            contactNum: "88887777",
            email: "nausheen@ga.com",
            username: "nausheen",
            password: "1234",
            type: "recipient",
            contributeList: [],
            myCart: [],
            receivedList: ["a", "b"],
            createdAt: 1012313452,
            imgFile: "",
            status: "active",
        },
        {
            _id: "B",
            firstName: "Mitch",
            lastName: "Goon",
            organisation: "",
            contactNum: "77776666",
            email: "mitchg@heavymetal.com",
            username: "mitchg",
            password: "1234",
            type: "contributor",
            contributeList: ["0"],
            myCart: [],
            receivedList: [],
            createdAt: 1000333421,
            imgFile: "",
            status: "active",
        },
        {
            _id: "C",
            firstName: "Renice",
            lastName: "Goh",
            organisation: "Save the Hangries",
            contactNum: "66665555",
            email: "reniceg@coding.com",
            username: "reniceg",
            password: "1234",
            type: "contributor",
            contributeList: [],
            myCart: [],
            receivedList: [],
            createdAt: 1004444444,
            imgFile: "",
            status: "active",
        },
    ];

    useEffect(() => {
        if (userId) {
            console.log('user ID exists, setting form data.')
            setFormData(data[0])
            //         axios.get(`/users/${userId}`)
            // .then((response) => {
            //     setFormData(response)
            // })
            // .catch((error) => {
            //     console.log('error', error)
            // })
        } else {
            console.log('new user. no set data')
        }
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!userId) {
            console.log('creating new user')
            // axios.post('/users', formData)
            //     .then((response) => {
            //         console.log("created new user")
            //     })
            //     .catch((error) => {
            //         console.log('error', error)
            //     })

            // validation WIP
            const validate = formSchema.validate(formData, { abortEarly: false })
            console.log(validate.error)

        } else if (userId) {
            console.log('updating profile')
            // axios.put(`/users/${userId}`, formData)
            //     .then((response) => {
            //         console.log("edited user data")
            //     })
            //     .catch((error) => {
            //         console.log('error', error)
            //     })
        }
    }

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <FormGroup as={Row} controlId="">
                    <FormLabel column sm="3">User Type: </FormLabel>
                    <FormCheck
                        inline label="Contributor"
                        type="radio"
                        value="contributor"
                        name="type"
                        id="contributor"
                        onClick={(event) => setFormData((state) => {
                            return { ...state, type: event.target.value }
                        })}
                        checked={formData.type === "contributor" && userId}
                        disabled={formData.type === "recipient" && userId}
                    />
                    <FormCheck
                        inline label="Recipient"
                        type="radio"
                        value="recipient"
                        name="type"
                        id="recipient"
                        onClick={(event) => setFormData((state) => {
                            return { ...state, type: event.target.value }
                        })
                        }
                        checked={formData.type === "recipient" && userId}
                        disabled={formData.type === "contributor" && userId}
                    />
                </FormGroup>

                <FormGroup as={Row} controlId="username">
                    <FormLabel column sm="3">
                        Username:
                                </FormLabel>
                    <Col sm="6">
                        <FormControl
                            type="text"
                            value={formData.username}
                            onChange={(event) => {
                                console.log(event.target.id)
                                setFormData((state) => {
                                    return { ...state, username: event.target.value }
                                })
                            }}
                            onBlur={(event) => {
                                console.log(event.target.value)
                            }
                            } />
                        <FormText className="text-muted">
                            Username must be at least 8 characters long
                            </FormText>
                    </Col>
                </FormGroup>

                <FormGroup as={Row} controlId="password">
                    <FormLabel column sm="3">Password: </FormLabel>
                    <Col sm="6">
                        <FormControl type="Password"
                            value={formData.password}
                            onChange={(event) => {
                                setFormData((state) => {
                                    return { ...state, password: event.target.value }
                                })
                            }} />
                        <FormText className="text-muted">Password must be at least 8 characters long</FormText>
                    </Col>
                </FormGroup>

                <FormGroup as={Row} controlId="firstName">
                    <FormLabel column sm="3">First Name: </FormLabel>
                    <Col sm="6">
                        <FormControl type="text"
                            value={formData.firstName}
                            onChange={(event) => {
                                setFormData((state) => {
                                    return { ...state, firstName: event.target.value }
                                })
                            }} />
                    </Col>
                </FormGroup>

                <FormGroup as={Row} controlId="lastName">
                    <FormLabel column sm="3">Last Name: </FormLabel>
                    <Col sm="6">
                        <FormControl type="text"
                            value={formData.lastName}
                            onChange={(event) => {
                                setFormData((state) => {
                                    return { ...state, lastName: event.target.value }
                                })
                            }} />
                    </Col>
                </FormGroup>

                <FormGroup as={Row} controlId="organisation">
                    <FormLabel column sm="3">Organisation: </FormLabel>
                    <Col sm="6">
                        <FormControl type="text"
                            value={formData.organisation}
                            onChange={(event) => {
                                setFormData((state) => {
                                    return { ...state, organisation: event.target.value }
                                })
                            }} />
                    </Col>
                </FormGroup>

                <FormGroup as={Row} controlId="contactNum">
                    <FormLabel column sm="3">Contact Number: </FormLabel>
                    <Col sm="6">
                        <FormControl type="number"
                            value={formData.contactNum}
                            onChange={(event) => {
                                setFormData((state) => {
                                    return { ...state, contactNum: event.target.value }
                                })
                            }} />
                    </Col>
                </FormGroup>

                <FormGroup as={Row} controlId="email">
                    <FormLabel column sm="3">Email Address: </FormLabel>
                    <Col sm="6">
                        <FormControl type="email"
                            value={formData.email}
                            onChange={(event) => {
                                setFormData((state) => {
                                    return { ...state, email: event.target.value }
                                })
                            }} />
                    </Col>
                </FormGroup>

                <Button variant="primary" type="submit">
                    {userId ? "Edit Profile" : "Create Account"}
                </Button>
            </Form>
        </>
    )
}
export default AccountDetailsForm;