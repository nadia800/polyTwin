import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import ListGroup from 'react-bootstrap/ListGroup';
import { getAllAttributes } from '../../actions/get/get';

//Icons
import { AiOutlinePlusCircle } from "react-icons/ai";
import { RiCloseCircleLine } from "react-icons/ri";

//API
import { getExportData } from '../../actions/exportData/exportData';



function SelectAttribute(props) {
    const [attributeList, setAttributeList] = useState([])
    const [selectedAttributes, setSelectedAttributes] = useState([])
    const [iconsX, setIconsX] = useState([])
    const dispatch = useDispatch();
    
    useEffect(async () => {
        for (var i in props.assetList) {
            await dispatch(getAllAttributes(props.assetList[i].id))
                .then((data) => {
                    for (var j in data.data) {
                        console.log('hi')
                        console.log(data.data[i])
                        setAttributeList(state => [...state, { id: data.data[j].id, assetId : data.data[j].assetId, asset: props.assetList[i].name, attribute: data.data[j].name }])
                        setIconsX(state =>  [...state , false])
                    }

                })
        }
        
    }, [])
   
    const handleAttribute = async() => {
       
        if (props.dataExport) {
            dispatch(getExportData(selectedAttributes[0].assetId, selectedAttributes[0].name))
                .then(response => {
                    props.onSeletedAttributes({
                        assetId: selectedAttributes[0].assetId,
                        assetName: selectedAttributes[0].asset,
                        attributeName: response.data.attributeName,
                        oldestTimestamp: response.data.oldestTimestamp,
                        latestTimestamp: response.data.latestTimestamp
                    })
                })
            
        } else {
            props.onSeletedAttributes(selectedAttributes)
        }
    }

    const deleteAttribute = (id) => {
        setSelectedAttributes(selectedAttributes.filter(state => state !== id))
       
    }
    console.log(selectedAttributes)
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
                        Select Attributes
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
                        {attributeList.map((data, index) =>
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
                                                {data.asset} :
                                            </div>
                                            {data.attribute}
                                            {iconsX[index] ? <RiCloseCircleLine
                                                style={{
                                                    marginLeft: "5px",
                                                    color: "red"
                                                }}
                                                onClick={(id) => {
                                                    setIconsX([...iconsX.slice(0, index), false, ...iconsX.slice(index + 1, iconsX.length)])
                                                    deleteAttribute(data.id)
                                                   
                                                }}
                                            /> :
                                                <AiOutlinePlusCircle
                                                    style={{
                                                        marginLeft: "5px",
                                                        color: "#32CD32"
                                                    }}
                                                    onClick={(id) => {
                                                        setSelectedAttributes(state => [...state, { assetId: data.assetId, asset: data.asset, id: data.id, name: data.attribute }])
                                                        setIconsX([...iconsX.slice(0, index), true, ...iconsX.slice(index + 1, iconsX.length)])
                                                       
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
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onHide}>
                        Close
                    </Button>
                    <Button variant="primary"
                        onClick={() => {
                            handleAttribute();
                            props.onHide()
                        }}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default SelectAttribute;