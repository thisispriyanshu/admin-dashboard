import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import layout from "../layout";
import { useState, useEffect } from "react";
import Home from "./Home";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "../axios";
import { toast } from "react-toastify";

const Main = ({ resultant_layout, isLoggedIn }) => {
  //set headers
  const headers = {
    Authorization: "Bearer " + localStorage.getItem("@token"),
  };
  // get all columns
  const resource = resultant_layout.resource;
  const important_columns = resultant_layout.important_columns;
  const viewable_columns = resultant_layout.viewable_columns;
  const createable_columns = resultant_layout.createable_columns;
  const editable_columns = resultant_layout.editable_columns;
  const column_type = resultant_layout.column_type;
  //create empty object of resource
  let obj = {};
  createable_columns.map((col) => {
    obj[col] = "";
  });

  // set state for display message
  const [message, setMessage] = useState("");
  console.log("message: ", message);

  // set loading state
  const [loading, setLoading] = useState(false);

  //Get all api data
  const [column, setColumn] = useState([]);
  const [records, setRecords] = useState([]);
  const getAllApiData = async () => {
    try {
      const res = await axios.get(resource, { headers });
      setColumn(important_columns);
      setRecords(res.data);
      setMessage(`Success. All ${resource} data fetched`);
      toast.success(`Success. All ${resource} data fetched`);
    } catch (error) {
      setMessage(error);
      toast.error(error);
    }
  };

  //Get individual api data
  const [record, setRecord] = useState({});
  const [recordId, setRecordId] = useState();
  const getApiData = async () => {
    try {
      const res = await axios.get(resource + "/" + recordId, { headers });
      setRecord(res.data);
      setForm(res.data);
      setRecordId(res.data.id);
      setMessage(`Success. Data Fetched for ${resource} ${recordId}`);
      toast.success(`Success. Data Fetched for ${resource} ${recordId}`);
    } catch (error) {
      setMessage(error);
      toast.error(error);
    }
  };

  //Create api data
  const [form, setForm] = useState(obj);
  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const postApiData = async () => {
    try {
      let res = await axios.post(resource, form, { headers });
      let resJson = await res.json();
      if (res.status === 200 || res.status === 201) {
        setMessage(`${resource} Created`);
        toast.success(`${resource} Created`);
      } else {
        setMessage(`Failed to create ${resource}`);
        toast.error(`Failed to create ${resource}`);
      }
    } catch (error) {
      setMessage(error);
      toast.error(error);
    }
  };

  //Update api data
  const updateApiData = async () => {
    try {
      let res = await axios.put(`${resource}/${recordId}`, form, { headers });
      let resJson = await res.json();
      if (res.status === 200 || res.status === 201) {
        setMessage(resJson.message);
        toast.success(resJson.message);
      } else {
        setMessage(resJson.message);
        toast.error(resJson.message);
      }
    } catch (error) {
      setMessage(error);
      toast.error(error);
    }
  };

  //Delete api data
  const deleteApiData = async () => {
    try {
      const res = await axios.delete(`${resource}/${recordId}`, { headers });
      getAllApiData();
      handleCloseDelete();
      setMessage(`Success. Data deleted for ${resource} ${recordId}`);
      toast.success(`Success. Data deleted for ${resource} ${recordId}`);
    } catch (error) {
      setMessage(error);
      toast.error(error);
    }
  };

  //search query
  const [query, setQuery] = useState("");

  //filter query
  const [filters, setFilters] = useState({});
  const handleInputFilter = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };
  const resetFilters = () => {
    setFilters({});
  };

  //state for modal - view
  const [showView, setShowView] = useState(false);
  const handleCloseView = () => setShowView(false);
  const handleShowView = (value) => {
    setShowView(true);
    setRecordId(value);
  };

  //state for modal - create
  const [showCreate, setShowCreate] = useState(false);
  const handleCloseCreate = () => setShowCreate(false);
  const handleShowCreate = () => {
    setForm({});
    setShowCreate(true);
  };

  //state for modal - update
  const [showUpdate, setShowUpdate] = useState(false);
  const handleCloseUpdate = () => setShowUpdate(false);
  const handleShowUpdate = (id) => {
    setRecordId(id);
    getApiData();
    setShowUpdate(true);
  };

  //state for modal - delete
  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = (id) => {
    setRecordId(id);
    setShowDelete(true);
  };
  //pagination
  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  //all useEffect
  useEffect(() => {
    setLoading(true);
    resetFilters();
    getAllApiData().finally(() => {
      setLoading(false);
    });
  }, [resultant_layout]);

  useEffect(() => {
    setLoading(true);
    getApiData().finally(() => {
      setLoading(false);
    });
  }, [recordId]);

  if (!isLoggedIn) return <p>Please Login to continue</p>;
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ marginInline: "4px", marginTop: "4px" }}>
            <input
              placeholder="Type to Search..."
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
          <div className="resetFilter">
            <button className="btn btn-danger" onClick={resetFilters}>
              Reset Filter
            </button>
          </div>
        </div>
        <div className="createButton" style={{ marginRight: "8px" }}>
          <button className="btn btn-primary" onClick={handleShowCreate}>
            Create New
          </button>
        </div>
      </div>
      <br />
      <div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <div className="table-resonsive">
              <table className="table">
                <thead>
                  <tr>
                    {column.map((c, i) => {
                      return (
                        <th key={i} scope="col">
                          {c}
                          <input
                            style={{
                              maxWidth: "130px",
                              margin: "2px",
                            }}
                            name={c}
                            value={filters[c] || ""}
                            onChange={handleInputFilter}></input>
                        </th>
                      );
                    })}
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {records
                    .filter((record) => {
                      return Object.keys(filters).every((col) => {
                        const filterValue = filters[col]?.toLowerCase();
                        const columnValue = record[col]
                          ?.toString()
                          .toLowerCase();
                        return columnValue?.includes(filterValue);
                      });
                    })
                    .slice((pageNum - 1) * pageSize, pageSize * pageNum)
                    .filter((record) => {
                      return Object.keys(record).some(
                        (key) =>
                          record[key].toString().toLowerCase().search(query) !==
                          -1
                      );
                    })

                    .map((record, i) => {
                      return (
                        <tr key={i}>
                          {column.map((col) => {
                            const col_name = record[col];
                            return <td>{col_name}</td>;
                          })}
                          <td>
                            <i
                              className="bi bi-eye-fill fs-5 m-1"
                              onClick={() => handleShowView(record.id)}></i>
                            <i
                              className="bi bi-pencil-square fs-5 m-1"
                              onClick={() => {
                                handleShowUpdate(record.id);
                              }}></i>
                            <i
                              className="bi bi-trash3 fs-5 m-1"
                              onClick={() => handleShowDelete(record.id)}></i>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
              <div
                id="pagination"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "end",
                }}>
                <div style={{ margin: "5px" }}>
                  <p>Total results: {records.length}</p>
                </div>
                <div style={{ margin: "5px" }}>
                  <select
                    value={pageSize}
                    onChange={(e) => setPageSize(e.target.value)}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                    <option value="50">50</option>
                  </select>
                </div>
                <div style={{ margin: "5px" }}>
                  <input
                    onChange={(e) => setPageNum(e.target.value)}
                    placeholder={pageNum}
                    style={{ width: "40px" }}></input>
                </div>
              </div>
            </div>
            {/* modal for view form */}
            <Modal show={showView} onHide={handleCloseView} id="view">
              <Modal.Header closeButton>
                <Modal.Title>
                  View {resultant_layout.resource} {recordId}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  {viewable_columns.map((col) => {
                    return (
                      <Form.Group className="mb-3">
                        <Form.Label>{col}</Form.Label>
                        <Form.Control placeholder={record[col]} disabled />
                      </Form.Group>
                    );
                  })}
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseView}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleCloseView}>
                  Proceed
                </Button>
              </Modal.Footer>
            </Modal>
            {/* modal for create form */}
            <Modal show={showCreate} onHide={handleCloseCreate} id="create">
              <Modal.Header closeButton>
                <Modal.Title>Create {resultant_layout.resource}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  {createable_columns.map((col) => {
                    const colArray = column_type[col].value;
                    return (
                      <Form.Group className="mb-3">
                        <Form.Label>{col}</Form.Label>
                        {column_type[col].type === "dropdown" ? (
                          <Form.Select name={col} onChange={handleInput}>
                            {colArray.map((col_value) => {
                              if (col_value === form[col]) {
                                return (
                                  <option value={form[col]} selected disabled>
                                    {form[col]}
                                  </option>
                                );
                              } else
                                return (
                                  <option value={col_value}>{col_value}</option>
                                );
                            })}
                          </Form.Select>
                        ) : (
                          <Form.Control
                            type={column_type[col].type}
                            name={col}
                            value={form[col]}
                            onChange={handleInput}
                          />
                        )}
                      </Form.Group>
                    );
                  })}
                  <Form.Group>
                    <Button
                      className="mb-3"
                      type="submit"
                      onClick={postApiData}>
                      Save As...
                    </Button>
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseCreate}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
            {/* Modal for update form */}
            <Modal show={showUpdate} onHide={handleCloseUpdate} id="Update">
              <Modal.Header closeButton>
                <Modal.Title>
                  Update {resultant_layout.resource} {recordId}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  {editable_columns.map((col) => {
                    const colArray = column_type[col].value;
                    return (
                      <Form.Group className="mb-3">
                        <Form.Label>{col}</Form.Label>
                        {column_type[col].type === "dropdown" ? (
                          <Form.Select name={col} onChange={handleInput}>
                            {colArray.map((col_value) => {
                              if (col_value === form[col]) {
                                return (
                                  <option value={form[col]} selected disabled>
                                    {form[col]}
                                  </option>
                                );
                              } else
                                return (
                                  <option value={col_value}>{col_value}</option>
                                );
                            })}
                          </Form.Select>
                        ) : (
                          <Form.Control
                            type={column_type[col].type}
                            name={col}
                            value={form[col]}
                            onChange={handleInput}
                          />
                        )}
                      </Form.Group>
                    );
                  })}
                  <Form.Group>
                    <Button
                      className="mb-3"
                      type="submit"
                      onClick={updateApiData}>
                      Save As...
                    </Button>
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseUpdate}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>

            {/* Modal for delete form */}
            <Modal show={showDelete} onHide={handleCloseDelete} id="Delete">
              <Modal.Header closeButton>
                <Modal.Title>
                  Delete {resultant_layout.resource} {recordId}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>Are you sure you want to delete {recordId}?</p>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  className="mb-3"
                  variant="danger"
                  type="submit"
                  onClick={deleteApiData}>
                  Delete
                </Button>
                <Button
                  className="mb-3"
                  variant="secondary"
                  onClick={handleCloseDelete}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        )}
      </div>
    </div>
  );
};

export default Main;
