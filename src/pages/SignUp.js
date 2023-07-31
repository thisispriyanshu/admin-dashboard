import React, { useState, useEffect } from "react";
import { auth, firestore } from "../firebase";
import axios from "axios";

const SignUp = () => {
  //all the states
  let obj={};
  obj["resource"] = "";
  obj["important_columns"] = [];
  obj["viewable_columns"] = [];
  obj["createable_columns"] = [];
  obj["editable_columns"] = [];

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [apiURL, setApiURL] = useState("");
  const [resourceName, setResourceName] = useState("");
  const [column, setColumn] = useState([]);
  const [importantColumn, setImportantColumn] = useState([]);
  const [viewableColumn, setViewableColumn] = useState([]);
  const [createableColumn, setCreateableColumn] = useState([]);
  const [editableColumn, setEditableColumn] = useState([]);
  const [form, setForm] = useState(obj);
  const [layout, setLayout] = useState([]);


  //functions to handle all column states
  const handleImportantCol = (option) => {
    setImportantColumn((prevSelection) => [...prevSelection, option]);
  };
  const handleViewableCol = (option) => {
    setViewableColumn((prevSelection) => [...prevSelection, option]);
  };
  const handleCreateableCol = (option) => {
    setCreateableColumn((prevSelection) => [...prevSelection, option]);
  };
  const handleEditableCol = (option) => {
    setEditableColumn((prevSelection) => [...prevSelection, option]);
  };

  //functions to remove column from the list
  const handleRemoveImportantCol = (columnToRemove) => {
    setImportantColumn((prevColumns) => prevColumns.filter((column) => column !== columnToRemove));
  };
  const handleRemoveViewableCol = (columnToRemove) => {
    setViewableColumn((prevColumns) => prevColumns.filter((column) => column !== columnToRemove));
  };
  const handleRemoveCreateableCol = (columnToRemove) => {
    setCreateableColumn((prevColumns) => prevColumns.filter((column) => column !== columnToRemove));
  };
  const handleRemoveEditableCol = (columnToRemove) => {
    setEditableColumn((prevColumns) => prevColumns.filter((column) => column !== columnToRemove));
  };

  //fetching all the columns from the api
  const fetchColumn = async () => {
    const res = await axios.get(`${apiURL}${resourceName}`);
    const allColumns = Object.keys(res.data[0]);
    setColumn(allColumns);
    console.log(column)
  }
  //function to push object in the layout array
  const handleLayout = () => {
    setForm({
      ...form,
      ["resource"]: resourceName,
      ["important_columns"]: importantColumn,
      ["viewable_columns"]: viewableColumn,
      ["createable_columns"]: createableColumn,
      ["editable_columns"]: editableColumn,
    })
    // console.log(obj)
    setLayout((prevLayout) => [...prevLayout, form]);
    // console.log(layout)
    // setObj({});
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="text" placeholder="Company Name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <input type="text" placeholder="API URL" value={apiURL} onChange={(e) => setApiURL(e.target.value)} />
      <input type="text" placeholder="Resource Name" value={resourceName} onChange={(e) => setResourceName(e.target.value)} />
      <button onClick={fetchColumn}>Fetch Columns</button>
      <div>
        <ul>
          {column.map((col, index) => (
            <li key={index}>
              {col}{' '}
              <select>
                <option value="text">Text</option>
                <option value="number">Number</option>
                <option value="date">Date</option>
                <option value="email">Email</option>
                <option value="password">Password</option>
                <option value="dropdown">Select</option>
              </select>
              <select>
                <option value="null">Null</option>
              </select>
              <button onClick={() => handleImportantCol(col)} style={{ margin: "2px" }}>Important</button>
              <button onClick={() => handleViewableCol(col)} style={{ margin: "2px" }}>View</button>
              <button onClick={() => handleCreateableCol(col)} style={{ margin: "2px" }}>Create</button>
              <button onClick={() => handleEditableCol(col)} style={{ margin: "2px" }}>Edit</button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <label>Important Columns</label>
        <ul>
          {importantColumn.map((col, index) => (
            <div style={{ display: "flex", flexDirection: "row" }}>
              <li key={index}>{col}</li>
              <button onClick={() => handleRemoveImportantCol(col)} style={{ margin: "5px" }}>Remove</button>
            </div>
          ))}
        </ul>
      </div>
      <div>
        <label>Viewable Columns</label>
        <ul>
          {viewableColumn.map((col, index) => (
            <li key={index}>{col}</li>
          ))}
        </ul>
      </div>
      <div>
        <label>Creatable Columns</label>
        <ul>
          {createableColumn.map((col, index) => (
            <li key={index}>{col}</li>
          ))}
        </ul>
      </div>
      <div>
        <label>Editable Columns</label>
        <ul>
          {editableColumn.map((col, index) => (
            <li key={index}>{col}</li>
          ))}
        </ul>
      </div>
      <button onClick={handleLayout}>Add Another Resource</button>
      <button>Sign Up</button>
    </div>
  );
};

export default SignUp;
