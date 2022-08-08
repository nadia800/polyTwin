import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';

//API Innovatwin
import { getAllAssets } from '../../actions/get/get';
import { getAllAttributes } from '../../actions/get/get';
import { deleteAsset } from '../../actions/openRemoteAPI/api'
import ListGroup from 'react-bootstrap/ListGroup';

//Icons
import { MdDeleteOutline } from "react-icons/md";
import { IconContext } from "react-icons";

import '../../scss/ProjectDevices.scss'; //CSS File


const ProjectDevices = () => {
    const { user } = useSelector(state => state.auth);
    const { isLoggedIn } = useSelector(state => state.auth);

    const realm = user ? user.role_id ? user.realmName : "master" : null;
    const assetList = []
    const [attributeList, setAttributeList] = useState([])
    const dispatch = useDispatch();
    useEffect(() => {
        async function fetchData() {
            await dispatch(getAllAssets(realm))
                .then((data) => {
                    for (var i in data.data) {
                        assetList.push(data.data[i])
                    }
                })
            
            
            for (var i in assetList) {
                const List = []
                await dispatch(getAllAttributes(assetList[i].id))
                    .then((data) => {
                        for (var j in data.data) {
                            List.push(data.data[j].name)
                        }

                    })
                setAttributeList(state => [...state,{ id: assetList[i].id, asset: assetList[i].name, attributes: List }])
            }
            
        }
        if (isLoggedIn) {
            fetchData();
        }
        
    }, [])

    if (isLoggedIn === false) {
        return <Navigate to="/login" replace />;
    }
    const handleRemoveAsset = async (assetId) => {
        await dispatch(deleteAsset(assetId));
        setAttributeList(attributeList.filter(state => state.id !== assetId))
    }
    return (
        <div className="projectDevice">
            <div className="projectDevice__project">
                <div className="projectDevice__project__title">Assets & Attributes</div>
                <label className="projectDevice__project__label">List of Assets and Attributes :</label>
                <div style={{
                    height: "350px",
                    width: "500px",
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
                                            fontWeight: "bold",
                                            display: "flex"
                                        }}>
                                            <div style={{
                                                flex: 20
                                            }}>
                                                {data.asset} :
                                            </div>
                                            <IconContext.Provider value={{ color: "red", size: 25 }}>
                                                <div>
                                                    <MdDeleteOutline
                                                        onClick={() => handleRemoveAsset(data.id)} />
                                                </div>
                                            </IconContext.Provider>
                                                
                                            
                                        </div>
                                        {data.attributes.map((attribute, index) =>
                                            <div>{attribute}</div>
                                         )}
                                        
                                        
                                    </div>
                                </ListGroup.Item>
                            </ListGroup>
                        </div>
                    )}
                </div>
                
            </div>
        </div>
        
    )
}

export default ProjectDevices;