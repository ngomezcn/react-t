import React, { useState } from "react"
import { Container, Row, Col, Card, CardBody, CardTitle, Input, FormGroup, Label, Form, Button, FormFeedback } from "reactstrap"

import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

//Import Flatpickr
import "flatpickr/dist/themes/material_green.css";
import Flatpickr from "react-flatpickr";

//Import Breadcrumb
import Breadcrumbs from "../../Components/Common/Breadcrumb";
import moment from "moment";
import { useFormik } from "formik";
import * as Yup from "yup";

const TasksCreate = () => {

  //meta title
  document.title = "Create Task | Skote - React Admin & Dashboard Template";

  const inpRow = [{ name: "", file: "" }]
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [inputFields, setInputFields] = useState(inpRow)

  // Function for Create Input Fields
  function handleAddFields() {
    const item1 = { name: "", file: "" }
    setInputFields([...inputFields, item1])
  }

  // Function for Remove Input Fields
  function handleRemoveFields(idx: any) {
    (document.getElementById("nested" + idx) as HTMLInputElement).style.display = "none"
  }

  const validation: any = useFormik({

    initialValues: {
      taskname: '',
      innerName: '',
      taskbudget: '',
    },
    validationSchema: Yup.object({
      taskname: Yup.string().required("Please Enter your Taskname"),
      innerName: Yup.string().required("Please Enter your Name"),
      taskbudget: Yup.string().required("Please Enter your Task Budget")
    }),
    onSubmit: (values: any) => {
      // console.log(values)
    }
  });

  return (
    <>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Tasks" breadcrumbItem="Create Task" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">Create New Task</CardTitle>
                  <Form className="outer-repeater" onSubmit={validation.handleSubmit}>
                    <div data-repeater-list="outer-group" className="outer">
                      <div data-repeater-item className="outer">
                        <FormGroup className="mb-4" row>
                          <Label htmlFor="taskname" className="col-form-label col-lg-2">Task Name</Label>
                          <Col lg={10}>
                            <Input
                              id="taskname"
                              type="text"
                              placeholder="Enter Task Name..."
                              name="taskname"
                              value={validation.values.taskname}
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              invalid={
                                validation.touched.taskname && validation.errors.taskname ? true : false
                              }
                            />
                            {validation.touched.taskname && validation.errors.taskname ? (
                              <FormFeedback type="invalid">{validation.errors.taskname}</FormFeedback>
                            ) : null}
                          </Col>
                        </FormGroup>
                        <FormGroup className="mb-4" row>
                          <Label className="col-form-label col-lg-2"> Task Description </Label>
                          <Col lg={10}>
                            <Editor
                              toolbarClassName="toolbarClassName"
                              wrapperClassName="wrapperClassName"
                              editorClassName="editorClassName"
                              placeholder="Place Your Content Here..."
                            />
                          </Col>
                        </FormGroup>

                        <FormGroup className="mb-4" row>
                          <Label className="col-form-label col-lg-2">  Task Date</Label>
                          <Col lg={10}>
                            <Row>
                              <Col md={6} className="pr-0">
                                <Flatpickr
                                  type="date"
                                  value={startDate}
                                  options={{
                                    altInput: true,
                                    mode: "single",
                                    dateFormat: "d M, Y",
                                  }}
                                  onChange={(date: any) => {
                                    setStartDate(moment(date[0]).format("DD MMMM, YYYY"));
                                  }}
                                />
                              </Col>
                              <Col md={6} className="pl-0">
                                <Flatpickr
                                  type="date"
                                  value={endDate}
                                  options={{
                                    altInput: true,
                                    mode: "single",
                                    dateFormat: "d M, Y",
                                  }}
                                  onChange={(date: any) => {
                                    setEndDate(moment(date[0]).format("DD MMMM, YYYY"));
                                  }}
                                />
                              </Col>
                            </Row>
                          </Col>
                        </FormGroup>

                        <div className="inner-repeater mb-4">
                          <div className="inner form-group mb-0 row">
                            <Label className="col-form-label col-lg-2"> Add Team Member</Label>
                            <div className="inner col-lg-10 ml-md-auto" id="repeater" >
                              {inputFields.map((field: any, key: number) => (
                                <div key={key} id={"nested" + key} className="mb-3 row align-items-center" >
                                  <Col md="6">
                                    <Input
                                      type="text"
                                      className="inner"
                                      defaultValue={field.name}
                                      placeholder="Enter Name..."
                                    />
                                  </Col>
                                  <Col md="4">
                                    <div className="mt-4 mt-md-0">
                                      <Input
                                        type="file"
                                        defaultValue={field.file}
                                      />
                                    </div>
                                  </Col>
                                  <Col md={2}>
                                    <div className="mt-2 mt-md-0 d-grid">
                                      <Button color="primary" className="inner" onClick={() => handleRemoveFields(key)} block > Delete </Button>
                                    </div>
                                  </Col>
                                </div>
                              ))}
                            </div>
                          </div>
                          <Row className="justify-content-end">
                            <Col lg={10}>
                              <Button color="success" className="inner" onClick={() => handleAddFields()} > Add Number </Button>
                            </Col>
                          </Row>
                        </div>
                        <FormGroup className="mb-4" row>
                          <Label htmlFor="taskbudget" className="col-form-label col-lg-2"> Budget </Label>
                          <Col lg={10}>
                            <Input id="taskbudget" name="taskbudget" type="text" placeholder="Enter Task Budget..."
                              value={validation.values.taskbudget}
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              invalid={
                                validation.touched.taskbudget && validation.errors.taskbudget ? true : false
                              }
                            />
                            {validation.touched.taskbudget && validation.errors.taskbudget ? (
                              <FormFeedback type="invalid">{validation.errors.taskbudget}</FormFeedback>
                            ) : null}
                          </Col>
                        </FormGroup>
                      </div>
                    </div>
                  </Form>
                  <Row className="justify-content-end">
                    <Col lg={10}>
                      <Button type="submit" color="primary"> Create Task </Button>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}

export default TasksCreate
