import React, { useLayoutEffect, useState } from "react";
import Unity, { UnityContext } from "react-unity-webgl";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';

//API Innovatwin
import { getAllRealms } from '../../actions/get/get';
import { getCategorie, getChart } from '../../actions/get/get';

import ChartBoardDashboard from './ChartBoardDashboard';
import SelectChart from './SelectChart.jsx'

//Icon
import { IoIosClose } from "react-icons/io"
import { AiOutlinePlusCircle } from "react-icons/ai";
import { IconContext } from "react-icons";


import "../../scss/Dashboard.scss"; //CSS File
import { height, width } from "@mui/system";


function Dashboard(props) {
    const { user } = useSelector(state => state.auth);
    const { isLoggedIn } = useSelector(state => state.auth);
    const [projectNameList, setProjectNameList] = useState([]);
    const [projectName, setProjectName] = useState(user ? user.role_id ? user.realmName : "" : null);
    const [show, setShow] = useState(false);

    //Chart on the dashboard :
    const [categorieList, setCategorieList] = useState([])
    const [modalShow, setModalShow] = useState(false);
    const [selectedCharts, setSelectedCharts] = useState([])
    const [numberChart, setNumberChart] = useState(0)

    const unityContext = new UnityContext({
        loaderUrl: projectName+"/Build/test8.loader.js",
        dataUrl: projectName +"/Build/test8.data.unityweb",
        frameworkUrl: projectName +"/Build/test8.framework.js.unityweb",
        codeUrl: projectName +"/Build/test8.wasm.unityweb",
    });

    const dispatch = useDispatch();
    useLayoutEffect(function () {
        if (isLoggedIn) {
            if (user.role_id === 0) {
                dispatch(getAllRealms())
                    .then((data) => {
                        setProjectNameList([...projectNameList, ...data.data])
                    })
            }
            dispatch(getCategorie(projectName))
                .then((data) => {
                    const List = []
                    for (var i in data.data) {
                        List.push(data.data[i])
                    }
                    let arr = List.filter((item, index) => List.indexOf(item) === index)
                    setCategorieList(arr)
                })
        }
        
    }, []);

    if (isLoggedIn === false) {
        return <Navigate to="/login" replace />;
    }

    const handleChart = async (listChart) => {
        setSelectedCharts(state => [...state, listChart])
        const number = selectedCharts.length +1
        setNumberChart(number)
    }
   
    const importfile = () => {
        setShow(true)
    }

    const handleClose = (id) => {
        const List = selectedCharts.filter(state => state.chartId !== id)
        setSelectedCharts(List)
        setNumberChart(List.length)
    }
    return (
        <div className="dashboard">
            <div className="dashboard__box">
                {user ? user.role_id ?
                    <div style={{
                        position: 'relative'
                    }}>
                        <div style={{
                            position: 'absolute'
                        }}>
                            <Unity unityContext={unityContext}
                                style={{
                                    width: "1315px",
                                    height: "597px",

                                }}
                            />
                        </div>
                        <div style={{
                            position: 'relative',
                            marginLeft: "800px",
                            opacity: '0.5'
                        }}
                            className="dashboard__Add"
                        >
                            <input
                                style={{
                                    height: "30px",
                                    width: "50px",
                                    marginLeft: "420px",
                                }}
                                className="dashboard__button"
                                type="submit"
                                value="ADD"
                                onClick={() => setModalShow(true)}
                            />
                            {modalShow ?
                                <SelectChart
                                    realmName={projectName}
                                    show={modalShow}
                                    onHide={() => setModalShow(false)}
                                    onSeletedCharts={handleChart}
                                    numberChart={numberChart}
                                /> : null
                            }
                            <div>
                                {selectedCharts.map((data, index) =>
                                    <div style={{
                                        marginLeft: "400px"
                                    }} className="dashboard__chart" key={index}>
                                        <IconContext.Provider value={{ color: "red", size: 25 }}>
                                            <IoIosClose onClick={() => handleClose(data.chartId)}/>
                                        </IconContext.Provider> 
                                        <ChartBoardDashboard chart={data} height={100} width={100} />
                                    </div>
                            )}
                            </div>
                            
                        </div>
                    </div>

                    : <div>
                        {!show ?
                            <div style={{
                                paddingTop: "90px"
                            }}>
                                <div style={{
                                    width: "350px",
                                    height: "400px",
                                    borderRadius: "10px",
                                    margin: "auto",
                                    backgroundColor: "#f8f9fa"
                                }}>
                                    <div className="dashboard__title">Choose Project </div>
                                    <label className="dashboard__label">Project Name</label>
                                    <br />
                                    <select
                                        className="categorie"
                                        id="body__categorie"
                                        onChange={(e) => {
                                            setProjectName(e.target.value)
                                        }}
                                    >
                                        <option value="null">Choose a Realm...</option>
                                        {projectNameList.map((project, index) =>
                                            <option key={index} value={project.realmName}>{project.realmName}</option>
                                        )}
                                    </select>
                                    <br />
                                    <button className="dashboard__button" onClick={importfile}>
                                        Choose
                                    </button>
                                </div>
                            </div> :
                            <div style={{
                                position: 'relative'
                            }}>
                                <div style={{
                                    position: 'absolute'
                                }}>
                                    <Unity unityContext={unityContext}
                                        style={{
                                            width: "1315px",
                                            height: "597px",
                                        }}
                                    />
                                </div>
                                <div style={{
                                    position: 'relative',
                                    marginLeft: "800px",
                                    opacity: '0.5'
                                }}
                                    className="dashboard__Add"
                                >
                                    <input
                                        style={{
                                            height: "30px",
                                            width: "50px",
                                            marginLeft: "420px"
                                        }}
                                        className="dashboard__button"
                                        type="submit"
                                        value="ADD"
                                        onClick={() => setModalShow(true)}
                                    />
                                    {modalShow ?
                                        <SelectChart
                                            realmName={projectName}
                                            show={modalShow}
                                            onHide={() => setModalShow(false)}
                                            onSeletedCharts={handleChart}
                                            numberChart={numberChart}
                                        /> : null
                                    }
                                    <div>
                                        {selectedCharts.map((data, index) =>
                                            <div style={{
                                                marginLeft: "400px"
                                            }} className="dashboard__chart" key={index}>
                                                <IconContext.Provider value={{ color: "red", size: 25 }}>
                                                    <IoIosClose onClick={() => handleClose(data.chartId)} />
                                                </IconContext.Provider>
                                                <ChartBoardDashboard chart={data} height={100} width={100} />
                                            </div>
                                        )}
                                    </div>

                                </div>
                            </div>
                        }

                    </div> : null
                }
            </div>
    </div>
)}

export default Dashboard;

