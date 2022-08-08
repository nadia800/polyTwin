import React, {
    useState,
    useEffect
} from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

//API Innovatwin
import { getCategorie, getChart} from '../../actions/get/get';
import { getChartData } from '../../actions/openRemoteAPI/api';
import { getAllRealms } from '../../actions/get/get';
import ChartBoard from './ChartBoard';

//Icons
import { AiOutlinePlusCircle } from "react-icons/ai";
import { RiCloseCircleLine } from "react-icons/ri";

import '../../scss/ProjectInsights.scss';//CSS File

function ProjectInsights() {
    const [categorieList, setCategorieList] = useState([]);
    const [categorie, setCategorie] = useState("")
    const [chartList, setChartList] = useState([]);
    const [chartData, setChartData] = useState([])
    const [iconsX, setIconsX] = useState([])
    const [realm, setRealm] = useState([])
    const { user } = useSelector(state => state.auth);
    const { isLoggedIn } = useSelector(state => state.auth);
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const [realmName, setRealmName] = useState(user ? user.role_id ? user.realmName : null : null)

    useEffect(() => {
        if (isLoggedIn) {
            if (realmName) {
                dispatch(getCategorie(realmName))
                    .then((data) => {
                        const List = []
                        for (var i in data.data) {
                            List.push(data.data[i])
                        }
                        let arr = List.filter((item, index) => List.indexOf(item) === index)
                        setCategorieList(arr)
                    })
            } else {
                dispatch(getAllRealms())
                    .then((data) => {
                        setRealm([...realm, ...data.data])
                    })
            }
        }
    }, []);

    const getCategories = (e) => {
        setRealmName(e.target.value)
        dispatch(getCategorie(e.target.value))
            .then((data) => {
                const List = []
                for (var i in data.data) {
                    List.push(data.data[i])
                }
                let arr = List.filter((item, index) => List.indexOf(item) === index)
                setCategorieList(arr)
            })
    }

    if (isLoggedIn === false) {
        return <Navigate to="/login" replace />;
    }

    const getCharts = (e) => {
        //get all charts belong to choosing categorie
        const categorie = e.target.value;
        setChartList([])
        dispatch(getChart(realmName, categorie))
            .then((data) => {
                for (var i = 0; i < data.data.length; i++) {
                    setChartList(state => [...state, data.data[i]])
                    setIconsX(state => [...state, false])
                }
                
                
            })
        setCategorie(categorie)
    }

    const showAddInsight = () => {
        navigate("/addInsight", { state: { categorieList: categorieList, realm: realmName } })
    };

    const deleteChart = (id) => {
        //showChart == false where chartId == id 
        setChartData(chartData.filter(state => state.chartId !== id))
    }
    const postChart = async(id, time_frame, start_date, chart_name, chart_type, number_day) => {
        //showChart == true where chartId == id
        var startDate = Date.parse(start_date);
        if (time_frame === "MINUTE") {
            var interval = 3600000;
            var timeFrame = "MINUTE"
        } else if (time_frame === "HOUR") {
            var interval = 86400000;
            var timeFrame = "HOUR"
        } else if (time_frame === "DAY") {
            var interval = 86400000 * number_day;
            var timeFrame = "DAY"
        } else if (time_frame === "WEEK") {
            var interval = 604800000;
            var timeFrame = "DAY"
        } else if (time_frame === "MONTH") {
            var interval = 2419200000;
            var timeFrame = "DAY"
        } else if (time_frame === "YEAR") {
            var interval = 2419200000 * 12;
            var timeFrame = "MONTH"
        }
        
        var finalDate = startDate + interval;
        await dispatch(getChartData(id, timeFrame, startDate, finalDate))
            .then(data => {
                //All Data of chartS
                setChartData(state => [...state, {
                    chartId: id,
                    chartName: chart_name,
                    chartType: chart_type,
                    data: data,
                    timeFrame: time_frame,
                    startDate: start_date
                }])
            })
            .catch(err => {
                console.log(err)
            })

    }

    return (
        <div className='ProjectInsight'>
            <div style={{
                display:"flex"
            }}>
            <div className= 'ProjectInsight__project'>
                <div className='ProjectInsight__title'>Project Insight</div>
                    <div className="ProjectInsight__categorie">
                        {user ? user.role_id === 0 ?
                            <div>
                                <label className="ProjectInsight__categorie__label">Select Realm:</label>
                                <div className="ProjectInsight__categorie__list">
                                    <select
                                        className="ProjectInsight__categorie__input"
                                        id="body__categorie"

                                        onChange={(e) => {
                                            getCategories(e)
                                        }}
                                    >
                                        <option value="">Choose an option</option>
                                        {realm.map((realm, index) =>
                                            <option key={index} value={realm.realmName}>{realm.realmName}</option>
                                        )}
                                    </select>
                                </div>
                            </div> : null : null 
                        }
                    <label className="ProjectInsight__categorie__label">Select Insight categorie:</label>
                    <div className="ProjectInsight__categorie__list">
                        <select
                            className="ProjectInsight__categorie__input"
                            id="body__categorie"
                            
                        onChange={(e) => {
                            getCharts(e)
                        }}
                        >
                        <option value="">Choose an option</option>
                                {categorieList.map((categorie, index) =>
                                    <option key={index} value={categorie}>{categorie}</option>
                                )}
                        </select> 
                    </div>
                </div>
                <label className="ProjectInsight__categorie__label">Set Insight active :</label>
                <div className="ProjectInsight__chartList">
                    {chartList.map((chart, index) =>
                        <div className="ProjectInsight__chartList__box" key={index}>
                            <div key={index} value={chart.name} className="ProjectInsight__chartList__name">{chart.name}</div>
                            {iconsX[index] ? <RiCloseCircleLine
                                style={{
                                    marginTop: "3px",
                                    color: "red",
                                    flex: '0.5'
                                }}
                                onClick={(id) => {
                                    
                                    setIconsX([...iconsX.slice(0, index), false, ...iconsX.slice(index + 1, iconsX.length)])
                                    deleteChart(chart.id)

                                }}
                            /> :
                                <AiOutlinePlusCircle
                                    style={{
                                        marginTop: "3px",
                                        color: "#32CD32",
                                        flex: '0.5'
                                    }}
                                    onClick={(id) => {
                                        console.log('hi')
                                        postChart(chart.id, chart.time_frame, chart.start_date, chart.name, chart.type, chart.number_day)
                                        setIconsX([...iconsX.slice(0, index), true, ...iconsX.slice(index + 1, iconsX.length)])
                                    }}
                                />
                            }
                        </div>
                    )}
                    </div>
                    {user ? user.role_id !== 3 ?
                        <div className="ProjectInsight__footer">
                            <div className="ProjectInsight__footer__label">Create new chart ?</div>
                            <input
                                className="ProjectInsight__footer__button"
                                type="submit"
                                value="Create"
                                onClick={showAddInsight}
                            />
                        </div> : null : null
                    }
                
            </div>
                <div className="ProjectInsight__chart">
                    {chartData.map((chart, index) => 
                        <div>
                            {index < 3?
                                <div key={index} className="ProjectInsight__chart__div">
                                    <ChartBoard chart={chart} categorie={categorie}/>
                                </div>: null
                            }
                        </div>
                    )}
                </div>
            </div>
            <div style={{
                display: 'flex',
                marginTop: "4px",
                marginLeft: '60px'
            }}>
                {chartData.map((chart, index) =>
                    <div>
                        {index >= 3 && index < 6?
                            <div key={index} style={{
                                marginLeft: '20px'
                            }}>
                                <ChartBoard chart={chart} categorie={categorie} />
                            </div> : null
                        }
                    </div>
                )}
            </div>
            <div style={{
                display: 'flex',
                marginTop: "4px",
                marginLeft: '60px'
            }}>
                {chartData.map((chart, index) =>
                    <div>
                        {index >=6 && index < 9?
                            <div key={index} style={{
                                marginLeft: '20px'
                            }}>
                                <ChartBoard chart={chart} categorie={categorie} />
                            </div> : null
                        }
                    </div>
                )}
            </div>
            <div style={{
                display: 'flex',
                marginTop: "4px",
                marginLeft: '60px'
            }}>
                {chartData.map((chart, index) =>
                    <div>
                        {index >= 9 ?
                            <div key={index} >
                                <ChartBoard chart={chart} categorie={categorie} />
                            </div> : null
                        }
                    </div>
                )}
            </div>

        </div>
    )
}

export default ProjectInsights;