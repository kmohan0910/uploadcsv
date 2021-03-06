import React from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

import zhCN from "x-data-spreadsheet/dist/locale/zh-cn";
import Table from "react-bootstrap/Table";
import { useEffect } from "react";
import Spreadsheet from "react-spreadsheet";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Dropzone from "react-dropzone";
import "./Dragdrop.css";
import SearchIcon from "@material-ui/icons/Search";
import csv from "csv";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import ReactDataGrid from "react-data-grid";
import CancelIcon from "@material-ui/icons/Cancel";
import CloseIcon from "@material-ui/icons/Close";
import ReactDataSheet from "react-datasheet";
import "react-datasheet/lib/react-datasheet.css";
import "./Bodal.css";
const Compo = ({ columndata1 }) => {
  const [show, setShow] = useState(true);
  const [lenght1, setlenght] = useState([]);
  // States for Confirming
  const [confirmstat, setconfirm] = useState([false, false, false]);
  const [show1, setshow1] = useState(false);
  const [show2, setshow2] = useState(false);
  const [order, setorder] = useState([]);
  const [noofcol, setcol] = useState([0, 1, 2]);
  // const [match1, setmatch1] = useState({ FirstName: 0, Lastname: 1, Email: 2 });
  const [upload, setUpload] = useState(false); //In case the user Uploads a file
  const [tabindex, settab] = useState(0); //To Display the Current Tab
  const [match, setmatch] = useState(columndata1); //For Tabindex 1
  const [match2, setmatch2] = useState(columndata1); //for Mapping the final output

  const [columndata, handladd] = useState(columndata1);
  const [value, setvalue] = useState("");
  const [array3, setarray3] = useState({}); //ForUpload Value
  const [array1, setarray] = useState({ 0: [], 1: [], 2: [], 3: [] }); //For User Value
  const [inputfield, setinput] = useState([0, 1, 2, 3]);
  // const s = new Spreadsheet("#x-spreadsheet-demo")

  // data validation
  const data = [
    [{ value: "Vanilla" }, { value: "Chocolate" }],
    [{ value: "Strawberry" }, { value: "Cookies" }],
  ];

  const handleignore = () => {};
  // For Page Navigation
  const handleback = () => {
    // console.log(column)
    if (tabindex == 2 && !upload) {
      settab(tabindex - 2);
    } else {
      settab(tabindex - 1);
    }
  };
  const handlenext = () => {
    if (tabindex == 0 && !upload) {
      settab(tabindex + 2);
      setUpload(false);
    } else {
      settab(tabindex + 1);
      // console.log("set", array1);
    }
  };
  //For Modal Closure
  const handleClose = () => {
    setshow1(!show1);
    setShow(!show);
  };

  // For Matching the Header
  const handlematch = (e, index) => {
    const newMatch = JSON.parse(JSON.stringify(match));
    const newOrder = JSON.parse(JSON.stringify(order));
    let x = match.indexOf(e);

    let temp = newMatch[index];

    newMatch[index] = e;

    newMatch[x] = temp;

    // console.log(newMatch[x], "newMatch[x]");
    setmatch(newMatch);

    //ColumnData  Order
    // console.log(x, index);
    let c = newOrder.indexOf(x);
    let d = newOrder.indexOf(index);
    temp = newOrder[d];
    newOrder[d] = newOrder[c];
    newOrder[c] = temp;

    // console.log(newOrder, match);
    setorder(newOrder);
  };
  // For the Input Fields
  const setinput1 = (myvalue, index, index1) => {
    const array2 = JSON.parse(JSON.stringify(array1));
    array2[index].splice(index1, 1, myvalue);

    setUpload(false);
    // if (index==3){
    //   for(var i=0 ; i<3;i++){
    //     array2[index+i+1]=[]
    //   }
    // }
    setarray(array2);
    console.log(array2);

    // console.log(array1, "holla");
  };

  // const setinput2 = (myvalue, index, index1) => {
  //   const array2 = JSON.parse(JSON.stringify(array3));
  //   array2[index].splice(index1, 1, myvalue);
  //   setarray3(array2);
  //   console.log(array3, "holla");
  // };

  const handleadd = (e) => {
    handladd([...columndata, value]);
    setcol([...noofcol, noofcol.length + 1]);
    //columndata.push(value)
  };
  const handledelete = (index) => {
    const x = JSON.parse(JSON.stringify(columndata));
    const y = JSON.parse(JSON.stringify(noofcol));
    y.pop();
    x.splice(index, 1);
    handladd(x);
    setcol(y);
  };

  useEffect(() => {});
  // For Confirming
  const confirmcol = (index) => {
    const x = JSON.parse(JSON.stringify(confirmstat));
    x[index] = true;

    setconfirm(x);
    // setconfirm(x);
    console.log(confirmstat, "lock");
  };
  const undoconfirm = (index) => {
    const x = JSON.parse(JSON.stringify(confirmstat));
    x[index] = false;

    setconfirm(x);
  };
  const handleheader = () => {
    const x = JSON.parse(JSON.stringify(array3));
    x.splice(0, 1);
    setarray3(x);
    setshow2(false);
  };

  //Drag and Drop
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        // Do whatever you want with the file contents here
        const binaryStr = reader.result;
        // console.log(binaryStr);
        csv.parse(reader.result, (err, data) => {
          // console.log(data, "hii");
          var userList = [];
          //lenght1=data[0].length;
          let columns = [];
          // if (data[0].length < match2.lenght) {    //this was in case if the data is less then the required no. of column headers
          //   alert("Insufficient Data");
          //   return <></>;
          // }
          for (var i = 0; i < data[0].length; i++) {
            columns.push(i);
          }
          const x = JSON.parse(JSON.stringify(match));
          for (var i = 0; i < data[0].length - 3; i++) {
            x.push("");
          }
          setmatch(x);
          setlenght(columns);
          setorder(columns);

          for (var i = 0; i < data.length; i++) {
            const newUser = [];
            for (var j = 0; j < data[0].length; j++) {
              newUser.push(data[i][j]);
            }
            userList.push(newUser);
          }

          setarray3(userList);
          setUpload(true);
          setshow2(true);
          settab(1);
        });
      };
      reader.readAsText(file);
    });
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    accept: ".csv",
    onDrop,
  });

  const [grid, setgrid] = useState([
    [
      { value: "Email ", readOnly: true },
      { value: "FirstName", readOnly: true },
      { value: "LastName", readOnly: true },
    ],
    [{ value: null }, { value: null }, { value: null }],
    [{ value: null }, { value: null }, { value: null }],
    [{ value: null }, { value: null }, { value: null }],
    [{ value: null }, { value: null }, { value: null }],
  ]);
  const onCellsChanged = (changes) =>
    changes.forEach(({ cell, row, col, value }) => {
      console.log("New expression :" + value);
      const grid1 = grid.map((row) => [...row]);
      changes.forEach(({ cell, row, col, value }) => {
        grid1[row][col] = { ...grid1[row][col], value };
      });
      setgrid({ grid1 });
    });
  return (
    // Page1
    <div style={{ color: "#50535b" }}>
      <Modal dialogClassName="modal-90w" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {tabindex == 0 ? (
              <h4>Add Bulk Records</h4>
            ) : tabindex == 1 ? (
              <div>
                <h4>Add Bulk {array3.length} Records - Match Headers</h4>
              </div>
            ) : tabindex == 2 ? (
              <div>
                <h4>Repair Records</h4>
              </div>
            ) : (
              ""
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <Basic columndata={columndata}userList={userList}/> */}
          {tabindex == 0 ? (
            <div>
              <section className="container">
                <div {...getRootProps({ className: "dropzone" })}>
                  <input {...getInputProps()} />
                  <span className="uploadbtu">
                    <Button>Upload Files</Button>
                    <p>
                      You can upload any .csv, .tsv file with any set of columns
                      as long as it has 1 record per row. The next step will
                      allow you to match your spreadsheet columns to the right
                      data points. You'll be able to clean up or remove any
                      corrupted data before finalizing your report.
                    </p>
                  </span>
                </div>
                <aside></aside>
              </section>

              {/* Manual Data entry */}
              <h2>....or just manually add data here :</h2>
              <div className="add-column">
                <input
                  className="add-input"
                  onChange={(e) => setvalue(e.target.value)}
                ></input>
                <button className="hello" onClick={handleadd}>
                  Add Column
                </button>
              </div>
              <div
                id="x-spreadsheet-demo"
                style={{ width: "100%", margin: "20px" }}
              >
                <ReactDataSheet
                  valueRenderer={(cell) => cell.value}
                  data={grid}
                  onCellsChanged={(changes) => {
                    const grid1 = grid.map((row) => [...row]);
                    console.log(grid1);
                    changes.forEach(({ cell, row, col, value }) => {
                      grid1[row][col] = { ...grid1[row][col], value };
                    });
                    console.log(grid1);
                    setgrid(grid1);
                  }}
                />
              </div>
              {/* <Spreadsheet data={data} /> */}
              {/* <Table striped bordered hover>
                <thead>
                  <tr>
                    
                    {columndata.map((attr, index) => {
                      return (
                        <th>
                          {columndata[index]}
                          <CloseIcon
                            style={{ fill: "red", float: "right" }}
                            onClick={() => handledelete(index)}
                          />
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {inputfield.map((inputi, index) => {
                    return (
                      <tr>
                        {noofcol.map((attr, index1) => {
                          return (
                            <td>
                              <input
                                value={array1[index][index1]}
                                onChange={(e) =>
                                  setinput1(e.target.value, index, index1)
                                }
                              ></input>
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </Table> */}
            </div>
          ) : tabindex == 1 ? (
            <>
              {show2 ? (
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column-reverse",
                    marginTop: "12%",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      margin: "10px",

                      float: "left",
                    }}
                  >
                    <h2 style={{ fontSize: "25px" }}>
                      Does your Data contain column Headers?
                      {console.log(array3)}
                    </h2>
                    <div
                      style={{
                        margin: "10px",

                        marginLeft: "117px",
                      }}
                    >
                      <Button
                        className="tabindex1"
                        color="#5858e0"
                        onClick={() => setshow2(false)}
                      >
                        No
                      </Button>
                      <Button
                        className="tabindex12"
                        color="#5858e0"
                        onClick={() => handleheader()}
                      >
                        Yes
                      </Button>
                    </div>
                  </div>
                  <div style={{ float: "right", width: "60%" }}>
                    <Table>
                      <thead>
                        <tr>
                          <th style={{ padding: "7px", textAlign: "center" }}>
                            1
                          </th>
                          {array3.map((attr, index) => {
                            if (
                              attr == undefined ||
                              (attr == null && index < array3.length)
                            ) {
                              return <></>;
                            }
                            return (
                              <th
                                style={{
                                  background: "aliceblue",
                                  padding: "11px",
                                  textAlign: "left",
                                }}
                              >
                                {array3[0][index]}
                              </th>
                            );
                          })}
                        </tr>
                      </thead>
                      <tr>
                        <th style={{ padding: "7px", textAlign: "center" }}>
                          2
                        </th>
                        {array3.map((attr, index) => {
                          if (
                            attr == undefined ||
                            (attr == null && index < array3.length)
                          ) {
                            return <></>;
                          }
                          return (
                            <th style={{ padding: "11px", textAlign: "left" }}>
                              {array3[1][index]}
                            </th>
                          );
                        })}
                      </tr>
                    </Table>
                  </div>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {lenght1.map((attr, index1) => {
                    return (
                      <div style={{ width: "100%", display: "flex" }}>
                        <Table style={{ width: "50%" }}>
                          <thead>
                            <tr>
                              <th style={{ background: "#efefef6e" }}>
                                <div style={{ padding: "10px" }}>
                                  {console.log(array3[0], index1)}
                                  {/* {index1 <= array3.length
                                    ? array3[0][index1]
                                    : ""} */}
                                  <select
                                    name="columns"
                                    id="headers"
                                    style={{ display: "flex", float: "right" }}
                                    onChange={(e) => {
                                      handlematch(e.target.value, index1);
                                    }}
                                    value={match[index1]}
                                    disabled={confirmstat[index1]}
                                  >
                                    <option
                                      value={
                                        match[index1] ? match[index1] : "_"
                                      }
                                      selected
                                      //hidden="true"
                                    >
                                      {/* Select the Column Name */}
                                      {match[index1]}
                                    </option>

                                    {match.map((attr, index) => {
                                      if (index === index1) return <></>;
                                      return (
                                        <>
                                          {!match[index].length == 0 ? (
                                            <option
                                              disabled={confirmstat[index]}
                                              value={match[index]}
                                            >
                                              {match[index]}
                                            </option>
                                          ) : (
                                            ""
                                          )}
                                        </>
                                      );
                                    })}
                                  </select>
                                </div>
                              </th>
                            </tr>
                          </thead>
                          {array3.length
                            ? array3.map((item, index) => {
                                return index < 4 ? (
                                  <tr>
                                    <td>{array3[index][index1]}</td>
                                  </tr>
                                ) : (
                                  ""
                                );
                              })
                            : ""}
                        </Table>
                        <div className="volla" style={{ width: "50%" }}>
                          <div style={{ marginTop: "30px" }}>
                            <aside class="column-matched">
                              <ul>
                                {" "}
                                {match[index1] ? (
                                  <li
                                    style={{
                                      fontWeight: "500",
                                      color: "#50535b",
                                    }}
                                  >
                                    <CheckCircleIcon
                                      fontSize="small"
                                      style={{ color: "green", padding: "2px" }}
                                    />
                                    Matched to the{" "}
                                    <span class="suggested-fieldname primaryTextColor">
                                      {match[index1]}
                                    </span>{" "}
                                    field.
                                  </li>
                                ) : (
                                  <li
                                    style={{
                                      fontWeight: "500",
                                      color: "#50535b",
                                    }}
                                  >
                                    <ErrorIcon
                                      fontSize="small"
                                      style={{ color: "red", padding: "2px" }}
                                    />
                                    Not Matched!
                                    {/* <span class="suggested-fieldname primaryTextColor">
                                {match[index1]}
                              </span>{" "} */}
                                  </li>
                                )}
                                {/* <li>
                          <i class="fa fa-info-circle"></i>100% of your rows
                          have a value for this column
                        </li> */}
                              </ul>
                              {!confirmstat[index1] ? (
                                <div class="confirm-box">
                                  <span>
                                    <button
                                      className="comfirm-button2"
                                      id="confirmed-0"
                                      // tabindex="4"
                                      onClick={() => confirmcol(index1)}
                                    >
                                      Confirm mapping
                                    </button>
                                  </span>
                                  {/* <span>
                                <button
                                  className="hello12"
                                  // class="button invert"
                                  
                                  tabindex="5"
                                  onclick={() => handleignore}
                                >
                                  Ignore this column
                                </button>
                              </span> */}
                                </div>
                              ) : (
                                <div class="confirm-box">
                                  <span>
                                    <button
                                      className="comfirm-button"
                                      id="confirmed-0"
                                      // tabindex="4"
                                      // onClick={() => confirmcol(index1)}
                                    >
                                      confirmed
                                    </button>
                                  </span>
                                  <span>
                                    <button
                                      className="hello12"
                                      // class="button invert"
                                      id="ignored-0"
                                      tabindex="5"
                                      onClick={() => undoconfirm(index1)}
                                    >
                                      Undo
                                    </button>
                                  </span>
                                </div>
                              )}
                            </aside>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          ) : (
            <div>
              {upload ? (
                <Table>
                  <thead>
                    <tr>
                      {/* <th>SNo</th> */}
                      {match2.map((attr, index) => {
                        if (attr == undefined || attr == null) {
                          return <></>;
                        }
                        return <th>{attr}</th>;
                      })}
                      {/* {console.log(match, "looo")} */}
                    </tr>
                  </thead>
                  <tbody>
                    {array3.map((inputi, index) => {
                      return (
                        <tr>
                          {/* <td>{index+1}</td> */}
                          {array3[index].length == 0
                            ? ""
                            : order.map((attr, index1) => {
                                if (index1 < 3) {
                                  return array3[index][attr] ? (
                                    <td>{array3[index][attr]}</td>
                                  ) : (
                                    <td className="modal2">
                                      {array3[index][attr]}
                                      {/* <input style={{width:"100%"}}
                                // value={array3[index][attr]}
                                onBlur={(e) =>
                                  setinput2(e.target.value, index, attr)
                                }
                              ></input> */}
                                    </td>
                                  );
                                }
                              })}
                        </tr>
                      );
                    })}
                    {/* {console.log(array3, order)} */}
                  </tbody>
                </Table>
              ) : (
                <div
                  id="x-spreadsheet-demo"
                  style={{ width: "100%", margin: "20px" }}
                >
                  <ReactDataSheet
                    valueRenderer={(cell) => cell.value}
                    data={grid}
                    onCellsChanged={(changes) => {
                      const grid1 = grid.map((row) => [...row]);
                      console.log(grid1);
                      changes.forEach(({ cell, row, col, value }) => {
                        grid1[row][col] = { ...grid1[row][col], value };
                      });
                      console.log(grid1);
                      setgrid(grid1);
                    }}
                  />
                </div>
              )}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          {tabindex == 0 ? (
            ""
          ) : (
            <Button className="hello1" variant="primary" onClick={handleback}>
              Back
            </Button>
          )}
          <Button onClick={handlenext} disabled={tabindex < 2 ? false : true}>
            Continue
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default Compo;
