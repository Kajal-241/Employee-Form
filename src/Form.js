import React, { useState } from "react";
import "./style.css";

function Form() {
  const [userDetails, setUserDetails] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    employeeId: "",
  });
  const [userDisplay, setUserDisplay] = useState(false);
  const [error, setError] = useState(false);
  const [users, setUsers] = useState([]);
  const [edit, setEdit] = useState("");
  const [toggle, setToggle] = useState(true);

  const handleSubmit = e => {
    e.preventDefault();
    console.log(e.target);
    console.log(e);
    setUserDetails("");
    setError(true);
    console.log(userDetails);
    setUserDisplay(!userDisplay);
    if (!userDetails) {
    } else if (!toggle) {
      setUsers(
        users.map(elem => {
          if (elem.id === edit) {
            return { ...elem, name: userDetails };
          }
          return elem;
        })
      );
      setToggle(true);
      setUserDetails("");
      setEdit(null);
      document.getElementById("form").reset();
    } else {
      const inputData = {
        id: new Date().getTime().toString(),
        name: userDetails,
      };
      console.log(inputData);
      setUsers([...users, inputData]);
      document.getElementById("form").reset();
    }
  };
  const deleteHandler = index => {
    const filterDataRows = users.filter(elem => {
      return index !== elem.id;
    });
    setUsers(filterDataRows);
  };

  const editHandler = id => {
    let editItem = users.find(elem => {
      return elem.id === id;
    });
    console.log(editItem);
    setToggle(false);
    setUserDetails(editItem.name);
    setEdit(id);
  };
  const setInputValue = e => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  return (
    <div className="app">
      <div className="heading">
      <div class="container">
      
        <h1 class="text-sucess">ADD USER</h1>
      
        </div>
        <form id="form"
          onSubmit={e => {
            handleSubmit(e);
          }}>
          <div class="form group">
          <label for= "fname">First Name-:</label>
          <br></br>
          <input
            placeholder="ENTER YOUR FIRST NAME"
            name="firstName"
            value={userDetails.firstName}
            type="text"
            class= "form-control"
            onChange={setInputValue}
          />
          <br></br>
          {error && !userDetails.firstName ? (
            <span>Enter first name</span>
          ) : null}
          <br />
          <br />
          <label for= "lname">Last Name-:</label>
          <br></br>
          <input
            placeholder="ENTER YOUR LAST NAME"
            name="lastName"
            value={userDetails.lastName}
            type="text"
            onChange={setInputValue}
          />
          <br></br>
          {error && !userDetails.lastName ? <span>Enter last name</span> : null}
          <br />
          <br />
          <label for="email">Email-:</label>
          <br></br>
          <input
            placeholder="ENTER YOUR EMAIL"
            name="email"
            value={userDetails.email}
            type="text"
            onChange={setInputValue}
          />
          <br></br>
          {error && !userDetails.email ? <span>Enter email id</span> : null}
          <br />
          <br />
          <label>Employee id-:</label>
          <br></br>
          <input
            placeholder="ENTER YOUR EMPLOYEE ID"
            name="employeeId"
            value={userDetails.employeeId}
            type="number"
            onChange={setInputValue}
          />
          <br></br>
          {error && !userDetails.employeeId ? (
            <span>Enter employee id</span>
          ) : null}
          <br></br>
          <br></br>
          {toggle ? (
            <button className="edit" type="submit" onClick={handleSubmit}>
             ADD USER
            </button>
          ) : (
            <div>
              {" "}
              <button className="edit" onClick={handleSubmit}>
                Edit
              </button>
              <button className="clear" type="reset" onClick={handleSubmit}>
                Clear
              </button>{" "}
            </div>
          )}
          </div>
        </form>
      </div>
      <div className="output">
        {userDisplay && (
          <div className="row">
            <table id="show">
              <thead>
                <tr className="TableHead">
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email-id</th>
                  <th>Action</th>
                  <th></th>
                </tr>
                {users.map(elem => (
                  <tr key={elem.id}>
                    <td>{elem.name.firstName}</td>

                    <td>{elem.name.lastName}</td>

                    <td>{elem.name.email}</td>

                    <td>
                      <button
                        className="edit"
                        onClick={() => editHandler(elem.id)}>
                        EDIT
                      </button>
                    </td>
                    <td>
                      <button
                        className="delete"
                        onClick={() => deleteHandler(elem.id)}>
                        DELETE
                      </button>
                    </td>
                  </tr>
                ))}
              </thead>
            </table>
            <br></br>
          </div>
        )}
      </div>
    </div>
  );
}

export default Form;
