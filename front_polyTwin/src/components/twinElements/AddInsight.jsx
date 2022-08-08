import React, { useState, useLayoutEffect } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

//Icons
import { AiOutlinePlusCircle } from "react-icons/ai";
import { RiCloseCircleLine } from "react-icons/ri";

import ListGroup from 'react-bootstrap/ListGroup';

//Date Picker API
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import TextField from '@mui/material/TextField';

//API Innovatwin
import { getAllAssets } from '../../actions/get/get';
import { addInsight, addInsightLink } from '../../actions/openRemoteAPI/api';
import { addAssets, addAttributes } from '../../actions/openRemoteAPI/api';
import SelectAttribute from './SelectAttribute.jsx';

import '../../scss/AddInsight.scss' //CSS File

const validate = values => {
    const errors = {};
    
};
const theme = createTheme(
    {
        palette: {
            primary: { main: '#fff' },
        },
        typography: {
            fontFamily: 'Rubik, sans-serif',
            fontSize: 12,
            borderRadius : 5
        },
        spacing: 8,
    }
);

function AddInsight() {
    const { state } = useLocation();
    const { user } = useSelector(state => state.auth);
    const { isLoggedIn } = useSelector(state => state.auth);
    let navigate = useNavigate();
    const realm = user ? user.role_id ? user.realmName : null : null ;
  
    const formik = useFormik({
        initialValues: {
            chartName: "",
            chartType: "",
            categorie: "",
            timeFrame: "",
            calculator: ""
        },
        validate,
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        }
    });
    const categorieList = state.categorieList
    const [assetList, setAssetList] = useState([]);
    const [startDate, setStartDate] = useState(new Date())
    const [chartTypeList, setChartTypeList] = useState(["Bar Chart", "Column Chart", "Dount Chart", "Line Chart", "Panel", "Radial Chart", "Grouped Bar Chart", "Grouped Line Chart", "Spline Area Chart", "Multiple Radial Chart"]);
    const [modalShow, setModalShow] = useState(false);
    const [disableCategorie, setDisableCategorie] = useState(true);
    const [selectedAttributes, setSelectedAttributes] = useState([])
    const [alert, setAlert] = useState(false);
    const [numberDay, setNumberDay] = useState(0)
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
    
    const handleClose = () => {
        navigate('/twin/projectInsights')
    }

    const handleInsight = async () => {
        //add Insight and InsightLinks to Innovatwin data base 
        await dispatch(addInsight(
            formik.values.chartName,
            formik.values.chartType,
            formik.values.categorie,
            formik.values.timeFrame,
            startDate,
            numberDay,
            realm
        ))
            .then(data => {
                //Add InsightLink for each attribute
                for (var i in selectedAttributes) {
                    dispatch(addInsightLink(data.data.id, null, selectedAttributes[i].id))
                        .then(data => {
                            console.log(data)
                            setAlert(true)
                        })
                }
                
            })
            .catch(err => {
                console.log(err)
            })
    }
    const handleRemoveAsset = (asset) => {
        setAssetList(assetList.filter(state => state !== asset))
    }
    const handleSelectAttribute = () => {
       setModalShow(true)
    }

    const handleAttribute = (listAttribute) => {
        setSelectedAttributes(listAttribute)
    }
    return (
        <div className='AddInsight'>
            <form className='AddInsight__box' onSubmit={formik.handleSubmit}>
                <div>
                    <div className="AddInsight__box__title">Add new insight</div>
                </div>
                <div className="AddInsight__box__sidebyside">
                    <div className="AddInsight__box__sidebyside__left">
                        <label className="AddInsight__box__sidebyside__left__label">Chart Name :</label>
                        <br />
                        <input
                            type="text"
                            id="chartName"
                            className="AddInsight__box__sidebyside__left__input"
                            placeholder="chart name..."
                            value={formik.values.chartName}
                            onChange={formik.handleChange}

                        />
                        <br/>
                        <label className="AddInsight__box__sidebyside__left__label">Chart Type :</label>
                        <br />
                        <select
                            className="AddInsight__box__sidebyside__left__input"
                            id="chartType"
                            value={formik.values.chartType}
                            onChange={formik.handleChange}


                        >
                            <option value="">Chart type...</option>
                            {chartTypeList.map((chart, index) =>
                                <option key={index} value={chart}>{chart}</option>
                            )}
                        </select>
                
                    <br />
                    <div className="bodyProjectInsight__categorie__list">
                            <label className="AddInsight__box__sidebyside__left__label">Chart Categorie :</label>
                        <br/>
                        <select
                                className="AddInsight__box__sidebyside__left__input"
                            id="categorie"
                            value={formik.values.categorie}
                            onChange={formik.handleChange}
                            
                            
                        >
                            <option value="">Categorie...</option>
                            {categorieList.map((categorie, index) =>
                                <option key={index} value={categorie}>{categorie}</option>
                            )}
                        </select>
                    </div>
                        <div className="AddInsight__box__sidebyside__left__newCategorie">
                            <AiOutlinePlusCircle onClick={() => {
                                setDisableCategorie(!disableCategorie)
                            }} />
                            <a>New Categorie</a>
                        </div>
                        <label className="AddInsight__box__sidebyside__left__label">Categorie Name :</label>
                    <br />
                        <input
                            id="categorie"
                            type="text"
                            className="AddInsight__box__sidebyside__left__input"
                            placeholder="categorie name..."
                            disabled={disableCategorie}
                            value={formik.values.categorie}
                            onChange={formik.handleChange}
                        
                        />
                    <br/>
                        <label className="AddInsight__box__sidebyside__left__label">Start Date : </label>
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

                        <div>
                            <label className="AddInsight__box__sidebyside__left__label">Default Time Frame : </label>
                            <br/>
                            <select
                                id="timeFrame"
                                value={formik.values.timeFrame}
                                onChange={formik.handleChange}
                                className="AddInsight__box__sidebyside__left__input"
                           
                            >
                                <option value="">Choose Time Frame... </option>
                                <option value="MINUTE">Minute</option>
                                <option value="HOUR">Hour</option>
                                <option value="DAY">Day</option>
                                <option value="WEEK">Week</option>
                                <option value="MONTH">Month</option>
                                <option value="YEAR">Year</option>
                            </select>
                        </div>
                        {formik.values.timeFrame === "DAY" ?
                            <div>
                                <label className="AddInsight__box__sidebyside__left__label">Number of days : </label>
                                <br/>
                                <input className="AddInsight__box__sidebyside__left__input"
                                    type="number"
                                    id="day"
                                    name="day"
                                    min="2"
                                    max="6"
                                    onChange={(e) => setNumberDay(e.target.value)}
                                />
                            </div>
                            : null
                        }
                        
                        
                    </div>
                    <div className="AddInsight__box__sidebyside__right">
                        <div>
                            <input type="radio"
                                name="checkbox"
                                className="AddInsight__box__sidebyside__left__checkbox"
                                id="Check1"
                                value="Percentage"
                                onChange={formik.handleChange}
                            /> Percentage
                            <input type="radio"
                                name="checkbox"
                                className="AddInsight__box__sidebyside__left__checkbox"
                                id="Check2"
                                value="Absolute"
                                onChange={formik.handleChange}
                            /> Absolute
                            <input type="radio"
                                name="checkbox"
                                className="AddInsight__box__sidebyside__left__checkbox"
                                id="Check3"
                                value="Deltat"
                                onChange={formik.handleChange}
                            /> Deltat
                        </div>
                        <div className="AddInsight__box__sidebyside__right__selectAttribute">
                            <AiOutlinePlusCircle onClick={() => handleSelectAttribute()} />
                            <a>Select Attributes</a>
                        </div>
                        <div className="scrollableList" >
                        {assetList.map((data, index) =>
                            <ListGroup as="ul" style={{
                                width: "250px"
                            }}>
                                    <ListGroup.Item
                                        as="li"
                                        style={{
                                            border: "2px solid #C4C4C4",
                                            borderRadius: "0px"
                                        }}
                                        className="d-flex justify-content-between align-items-start"
                                        href={`${index}`}
                                    >
                                        <div className="ms-2 me-auto">
                                            {data.name}
                                            <RiCloseCircleLine
                                                style={{
                                                    color: 'red',
                                                    marginLeft: "5px"
                                                }}
                                                onClick={() => handleRemoveAsset(data)}
                                            />                                           
                                        </div>
                                    </ListGroup.Item>
                                </ListGroup>
                        )}
                        </div>
                        <div className="button">
                            <input type="submit"
                                value="CANCLED"
                                className="button__cancled"
                                variant="secondary"
                                onClick={() => handleClose()}
                            />

                            <input type="submit"
                                variant="primary"
                                value="ADD"
                                className="button__add"
                                onClick={() => handleInsight()}
                            />

                        </div>
                    </div>
                </div>
                
                {alert ? <div>Insight added successfully!</div> : null}
            </form>
            {modalShow ?
                <SelectAttribute
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    assetList={assetList}
                    onSeletedAttributes={handleAttribute}
                    dataExport={false}
                /> : null
            }
            
        </div>
    )

}

export default AddInsight;

