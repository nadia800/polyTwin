import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import ListGroup from 'react-bootstrap/ListGroup';


//Icons
import { AiOutlinePlusCircle } from "react-icons/ai";
import { RiCloseCircleLine } from "react-icons/ri";

//API
import { getAllCharts } from '../../actions/get/get';
import { getChartData } from '../../actions/openRemoteAPI/api';




function SelectChart(props) {
    const { user } = useSelector(state => state.auth);
    const [chartList, setChartList] = useState([])
    const [selectedCharts, setSelectedCharts] = useState([])
    const [iconsX, setIconsX] = useState([])
    const [chartData, setChartData] = useState([])
    const [numberChart, setNumberChart] = useState(props.numberChart)
    const [message, setMessage] = useState("");
    const dispatch = useDispatch();
    const realmName = user.role_id ? user.realmName : props.realmName;

    useEffect(async () => {
            await dispatch(getAllCharts(realmName))
                .then((data) => {
                    console.log(data)
                    for (var j in data.data) {
                        setChartList(state => [...state, data.data[j]])
                        setIconsX(state => [...state, false])
                    }

                })

    }, [])

    const handleChart = async () => {
        for (var i in selectedCharts) {
            var startDate = Date.parse(selectedCharts[i].start_date);
            if (selectedCharts[i].time_frame === "MINUTE") {
                var interval = 3600000;
                var timeFrame = "MINUTE"
            } else if (selectedCharts[i].time_frame === "HOUR") {
                var interval = 86400000;
                var timeFrame = "HOUR"
            } else if (selectedCharts[i].time_frame === "DAY") {
                var interval = 86400000 * selectedCharts[i].number_day;
                var timeFrame = "DAY"
            } else if (selectedCharts[i].time_frame === "WEEK") {
                var interval = 604800000;
                var timeFrame = "DAY"
            } else if (selectedCharts[i].time_frame === "MONTH") {
                var interval = 2419200000;
                var timeFrame = "DAY"
            } else if (selectedCharts[i].time_frame === "YEAR") {
                var interval = 2419200000 * 12;
                var timeFrame = "MONTH"
            }

            var finalDate = startDate + interval;
            await dispatch(getChartData(selectedCharts[i].id, timeFrame, startDate, finalDate))
                .then(data => {
                    //All Data of chartS
                    console.log(data)
                    props.onSeletedCharts({
                        chartId: selectedCharts[i].id,
                        chartName: selectedCharts[i].name,
                        chartType: selectedCharts[i].type,
                        data: data,
                        timeFrame: selectedCharts[i].time_frame,
                        startDate: selectedCharts[i].start_date
                    })
                })
                .catch(err => {
                    console.log(err)
                })

        }
    }

    const deleteChart = (id) => {
        const List = selectedCharts.filter(state => state.id !== id)
        setSelectedCharts(List)
    }


    return (
        <div className="SelectAttribute">

            <Modal style={{
                height: "550px",
                marginTop: "40px"
            }} show={props.show} onHide={props.onHide}>
                <Modal.Header
                    style={{
                        backgroundColor: "#4ABED9",
                        textAlign: "center",
                        borderRadius: "5px"
                    }} closeButton
                >
                    <Modal.Title
                        style={{
                            fontSize: "30px",
                            color: "#fff",
                            paddingLeft: "120px"
                        }}
                    >
                        Select Charts
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <div style={{
                            height: "250px",
                            width: "270px",
                            overflow: "auto",
                            margin: "10px",
                            textAlign: "justify"
                        }}>
                            {chartList.map((data, index) =>
                                <div styles={{ width: '50px', overflowY: 'scroll' }} key={index}>
                                    <ListGroup as="ul" >
                                        <ListGroup.Item
                                            as="li"
                                            href={`${data.id}`}
                                            style={{
                                                border: "2px solid #C4C4C4",
                                                borderRadius: "0px"
                                            }}
                                        >
                                            <div className="ms-2 me-auto">
                                                <div style={{
                                                    fontWeight: "bold"

                                                }}>
                                                    {data.categorie} :
                                                </div>
                                                {data.name}
                                                {iconsX[index] ? <RiCloseCircleLine
                                                    style={{
                                                        marginLeft: "5px",
                                                        color: "red"
                                                    }}
                                                    onClick={(id) => {
                                                        setIconsX([...iconsX.slice(0, index), false, ...iconsX.slice(index + 1, iconsX.length)])
                                                        deleteChart(data.id)
                                                        const number = numberChart - 1
                                                        setNumberChart(number)
                                                        setMessage("");

                                                    }}
                                                /> :
                                                    <AiOutlinePlusCircle
                                                        style={{
                                                            marginLeft: "5px",
                                                            color: "#32CD32"
                                                        }}
                                                        onClick={(id) => {
                                                            if (numberChart <= 2) {
                                                                setSelectedCharts(state => [...state, data])
                                                                setIconsX([...iconsX.slice(0, index), true, ...iconsX.slice(index + 1, iconsX.length)])
                                                                const number = numberChart+1
                                                                setNumberChart(number)
                                                               
                                                            } else {
                                                                setMessage("3 It's the limite number of chart !")
                                                            }
                                                            
                                                        }}
                                                    />
                                                }
                                            </div>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </div>
                            )}
                        </div>
                    </Form>
                    {message}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onHide}>
                        Close
                    </Button>
                    <Button variant="primary"
                        onClick={() => {
                            handleChart();
                            props.onHide()
                        }}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default SelectChart;