import React, { useState, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';

//Date Picker API
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import TextField from '@mui/material/TextField';
import Table from 'react-bootstrap/Table'; //Table

//Icons
import { FaFileExport } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import { IconContext } from "react-icons";

import { getAllAssets } from '../../actions/get/get';
import { addAssets, addAttributes } from '../../actions/openRemoteAPI/api';
import SelectAttribute from './SelectAttribute.jsx';
import { exportData } from '../../actions/exportData/exportData';

import { saveAs } from 'file-saver'

import '../../scss/DataExports.scss';//CSS File


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
const DataExport = () => {
    const { user } = useSelector(state => state.auth);
    const { isLoggedIn } = useSelector(state => state.auth);

    const realm = user ? user.role_id ? user.realmName : null : null;

    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [dataTable, setDataTable] = useState([])
    const [showAttributes, setShowAttributes] = useState(false)
    const [assetList, setAssetList] = useState([]);
    const [selectedAttributes, setSelectedAttributes] = useState([])
    const [attributeRefs, setAttributeRefs] = useState([]);

    const dispatch = useDispatch();
    useLayoutEffect(() => {
        async function fetchData() {
            await dispatch(addAssets(realm))
                .then((data) => {
                    console.log(data)
                });
            await dispatch(addAttributes(realm))
                .then((data) => {
                    console.log(data)
                })
            await dispatch(getAllAssets(realm))
                .then(async (data) => {
                    for (var i in data.data) {
                        setAssetList(state => [...state, data.data[i]])
                    }

                })
        }
        if (isLoggedIn) {
            fetchData();
        }
       
    }, [])

    if (isLoggedIn === false) {
        console.log(isLoggedIn)
        return <Navigate to="/login" replace />;
    }
    const convertTimeStamp = (unix_timestamp) => {
        const date = new Date(unix_timestamp).toString()
        return date.substr(0,24);
    }
    const handleAttribute = (listAttribute) => {
        var oldestTime = convertTimeStamp(listAttribute.oldestTimestamp);
        var latestTime = convertTimeStamp(listAttribute.latestTimestamp);
        setSelectedAttributes(state => [...state, {
            assetId: listAttribute.assetId,
            assetName: listAttribute.assetName,
            attributeName: listAttribute.attributeName,
            oldestTime: oldestTime,
            latestTime: latestTime
        }])
    }

    const handleExport = async(assetId, attributeName) => {
        const fromTimestamp = Date.parse(startDate);
        const toTimestamp = Date.parse(endDate);

            dispatch(exportData(assetId, attributeName, fromTimestamp, toTimestamp))
                .then(response => {
                    saveAs(response, 'file.csv')
                })
    }
    return (
        <div className="dataExports">
            <div className="dataExports__box">
                <div className="dataExports__box__title">Data Export</div>
                <div style={{
                    display: 'flex'
                }}>
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
                    <div>
                        <label className="historyLogs__box__label">Ending Date : </label>
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
                                        value={endDate}
                                        onChange={(date) => setEndDate(date)}
                                        renderInput={(params) => <TextField {...params} />}

                                    />
                                </LocalizationProvider>
                            </ThemeProvider>
                        </div>
                    </div>
                </div>
                <br/>
                <label className="dataExports__box__label">Data Selection :</label>
                <div style={{
                    marginLeft: '20px',
                    overflow: 'auto',
                    maxHeight: '450px',
                    maxWidth: '900px',
                    display: 'flex'
                }}>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Asset Name</th>
                                <th>Attribute Name</th>
                                <th>Oldest Datapoint</th>
                                <th>Latest Datapoint</th>
                                <th>Export</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedAttributes.length ? selectedAttributes.map((data, index) =>
                                <tr>
                                    <td>{data.assetName}</td>
                                    <td>{data.attributeName}</td>
                                    <td>{data.oldestTime}</td>
                                    <td><div>{data.latestTime}</div></td>
                                    <td>
                                        <IconContext.Provider value={{ color: "blue", size: 25 }} >
                                            <div style={{ marginLeft: '20px' }}>
                                                <FaFileExport onClick={() => handleExport(data.assetId, data.attributeName)} />
                                            </div>
                                        </IconContext.Provider>
                                    </td>
                                </tr>
                            ) : null}
                            <tr>
                                <td colSpan={5}>
                                    <IconContext.Provider value={{ color: "green", size: 20 }}>
                                        <div>
                                            <AiOutlinePlus
                                                onClick={() => setShowAttributes(true)} />
                                            <label className="dataExports__box__add">Add Asset Attribute</label>
                                        </div>
                                    </IconContext.Provider>
                                    
                                </td>
                                
                            </tr>
                        </tbody>
                    </Table>
                </div>
                {showAttributes ?
                    <SelectAttribute
                        show={showAttributes}
                        onHide={() => setShowAttributes(false)}
                        assetList={assetList}
                        onSeletedAttributes={handleAttribute}
                        dataExport={true}
                    /> : null
                }
            </div>
        </div>
        
    )
}

export default DataExport;