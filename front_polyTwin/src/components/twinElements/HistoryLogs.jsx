import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from 'react-router-dom';
import { categorieList } from "./data.js";
import '../../scss/HistoryLogs.scss';
import { default as ReactSelect } from "react-select";
import { components } from "react-select";
import Table from 'react-bootstrap/Table';

//Date Picker API
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import TextField from '@mui/material/TextField';

import { getHistoryLogs } from '../../actions/historyLogs/historyLogs';

import { IoIosArrowDropleft, IoIosArrowDropright } from 'react-icons/io'

const Option = (props) => {
    return (
        <div>
            <components.Option {...props}>
                <input
                    type="checkbox"
                    checked={props.isSelected}
                    onChange={() => null}
                />{" "}
                <label>{props.label}</label>
            </components.Option>
        </div>
    );
};
const theme = createTheme(
    {
        palette: {
            primary: { main: '#fff' },
        },
        typography: {
            fontFamily: 'Rubik, sans-serif',
            fontSize: 12,
            borderRadius: 5
        },
        spacing: 8,
    }
);


const HistoryLogs = () => {
    const { isLoggedIn } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const [levelList, setLevelList] = useState(["INFO", "WARNING", "ERROR"])
    const [level, setLevel] = useState("INFO");
    const [pageList, setPageList] = useState(["25", "50", "100", "200"])
    const [perPage, setPerPage] = useState("25");
    const [intervalList, setIntervalList] = useState(["Minute", "Hour", "Day", "Week", "Month", "Year"]);
    const [interval, setInterval] = useState("Hour")
    const [categories, setCategories] = useState([])
    const [list, setList] = useState({
        optionSelected: null
    })
    const [startDate, setStartDate] = useState(new Date())
    const [page, setPage] = useState(1)
    const [dataTable, setDataTable] = useState([])

    if (isLoggedIn === false) {
        return <Navigate to="/login" replace />;
    }

    const handleChange = (selected) => {
        const list = [];
        for (var i in selected) {
            list.push(selected[i].value)
        }
        setCategories(list)
        setList({
            optionSelected: selected
        });
    };
    const startTime = Date.parse(startDate);
    var finalTime = startTime
    if (interval === "Minute") {
        finalTime += 60000;
    } else if (interval === "Hour") {
        finalTime +=  3600000;
    } else if (interval === "Day") {
        finalTime += 86400000;
    } else if (interval === "Week") {
        finalTime += 604800000;
    } else if (interval === "Month") {
        finalTime += 2419200000;
    } else if (interval === "Year") {
        finalTime += 2419200000 * 12;
    }
   


    const getHistory = async () => {
        dispatch(getHistoryLogs(level, perPage, page, startTime, finalTime, categories))
            .then(response => {
                console.log(response.data)
                setDataTable(response.data);
            })

    }
    return (
    <div className="historyLogs">
        <div className="historyLogs__box">
            <div className="historyLogs__box__title">History Logs</div>
                <div style={{
                    display : 'flex'
                }}>
                    <div>
                        <div style={{
                            display: 'flex',
                            marginTop: '50px'
                        }}>
                            <div>
                                <label className="historyLogs__box__label">Level :</label>
                                <br />
                                <select
                                    className="historyLogs__box__input"
                                    id="level"
                                    value={level}
                                    onChange={(e) => setLevel(e.target.value)}
                                >
                                    {levelList.map((level, index) =>
                                        <option key={index} value={level}>{level}</option>
                                    )}
                                </select>
                            </div>
                            <div>
                                <label className="historyLogs__box__label">Page Number :</label>
                                <br />
                                <select
                                    className="historyLogs__box__input"
                                    id="page"
                                    value={perPage}
                                    onChange={(e) => setPerPage(e.target.value)}
                                >
                                    {pageList.map((page, index) =>
                                        <option key={index} value={page}>{page}</option>
                                    )}
                                </select>
                            </div>
                        </div>
                        <div style={{
                            display: 'flex'
                        }}>
                            <div>
                                <label className="historyLogs__box__label">Interval :</label>
                                <br />
                                <select
                                    className="historyLogs__box__input"
                                    id="interval"
                                    value={interval}
                                    onChange={(e) => setInterval(e.target.value)}
                                >
                                    {intervalList.map((interval, index) =>
                                        <option key={index} value={interval}>{interval}</option>
                                    )}
                                </select>
                            </div>
                            <div>
                                <label className="historyLogs__box__label">Start Date : </label>
                                <br />
                                <div style={{
                                    marginLeft: '20px',
                                }}>
                                    <ThemeProvider theme={theme}>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DateTimePicker
                                                id="datePicker"
                                                style={{
                                                    height: '20px !important'
                                                }}
                                                value={startDate}
                                                onChange={(date) => setStartDate(date)}
                                                renderInput={(params) => <TextField {...params} />}

                                            />
                                        </LocalizationProvider>
                                    </ThemeProvider>
                                </div>
                            </div>
                        </div>
                        <label className="historyLogs__box__label">Categorie Types :</label>
                        <br />
                        <span
                            class="d-inline-block"
                            data-toggle="popover"
                            data-trigger="focus"
                            data-content="Please select"
                            style={{
                                width: '400px',
                                height: '40px',
                                marginLeft: '20px',
                                marginTop: '5px',
                                borderRadius: '5px'
                            }}
                        >
                            <ReactSelect
                                options={categorieList}
                                isMulti
                                closeMenuOnSelect={false}
                                hideSelectedOptions={false}
                                components={{
                                    Option
                                }}
                                onChange={handleChange}
                                allowSelectAll={true}
                                value={list.optionSelected}
                            />
                        </span>
                        <input type="submit"
                            variant="primary"
                            value="SUBMIT"
                            className="button__submit"
                            onClick={() => getHistory()}
                        />
                    </div>
                    <div>
                        <div style={{
                            marginTop: '30px',
                            marginRight: '20px',
                            overflow: 'auto',
                            height: '400px',
                            width: '600px',
                        }}>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Timestamp</th>
                                        <th>Level</th>
                                        <th>Category</th>
                                        <th>Sub Category</th>
                                        <th>Message</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataTable.length ? dataTable.map((data, index) =>
                                        <tr>
                                            <td>{data.timestamp}</td>
                                            <td>{data.level}</td>
                                            <td>{data.category}</td>
                                            <td>{data.subCategory}</td>
                                            <td>{data.message}</td>
                                        </tr>
                                    ) :
                                        <tr>
                                            <td colSpan={5}></td>
                                        </tr>
                                    }
                                </tbody>
                            </Table>
                        </div>
                        <div style={{
                            marginTop: '20px',
                            marginLeft : '260px'
                        }}>
                            <IoIosArrowDropleft onClick={() => {
                                setPage(page-1)
                                getHistory()
                            }}/>
                            {page}
                            <IoIosArrowDropright onClick={() => {
                                setPage(page+1)
                                getHistory()
                            }} />
                        </div>
                    </div>
                </div>
        </div>
    </div>     
    )
}

export default HistoryLogs;