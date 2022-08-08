import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { uploadfile, getmaster_realms } from '../actions/uploaded/upload';
import { getAllRealms } from '../actions/get/get';
import "../scss/WebMasterTwin.scss";

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const WebMasterTwin = () => {
    const [nameProjectList, setNameProjectList] = useState([]);
    const [nameProject, setNameProject] = useState("");
    const [friendlyNameProject, setFriendlyNameProject] = useState("");
    const [categorieList, setCategorieList] = useState(["categorie1", "categorie2", "categorie3"])
    const [categorie, setCategorie] = useState();

    const [subcategorieList, setSubcategorieList] = useState(["sub1", "sub2", "sub3"]);
    const [subcategorie, setSubcategorie] = useState();

    const [currentPath, setCurrentPath] = useState("");
    const [successful, setSuccessful] = useState(false);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllRealms())
            .then((data) => {
                setNameProjectList([...nameProject, ...data.data])
            })
    },[]);
    const onFileUpload = () => {
        
        dispatch(uploadfile(nameProject, currentPath))
            .then((data) => {
                console.log("data")
                setSuccessful(true);
            })
            .catch(() => {
                setSuccessful(false);
            });
        
    }
   
    return (
        
        <div className="bodyUpload">
            <div className="bodyUpload__box">
                <div className="bodyUpload__box__title">Project Upload</div>
                <br />
                <label className="bodyUpload__box__label">Project Name:</label>
                <br/>
                <select
                    className="categorie"
                    id="body__categorie"
                    onChange={(e) => {
                        setNameProject(e.target.value)
                    }}
                >
                    <option value="null">Choose a Realm</option>
                    {nameProjectList.map((project, index) =>
                        <option key={index} value={project.realmName}>{project.realmName}</option>
                    )}
                </select>
                <br />
                
                <label className="bodyUpload__box__label">Select Project Categorie:</label>
            <br/>
            <div className="body__categorie__list">
                <select
                        className="categorie"
                        id="body__categorie"
                        onChange={(e) => {
                            setCategorie(e.target.value)
                        }}
                >
                    <option value="null">Choose a Categorie</option>
                    {categorieList.map((categorie, index) =>
                        <option key={index} value={categorie}>{categorie}</option>
                    )}
                </select>
                </div>
                <label className="bodyUpload__box__label">Select Project SubCategorie:</label>
                <br />
            <div className="body__subcategorie__list">
                <select
                    className="categorie"
                    id="body__subcategorie"
                    onChange={(e) => {
                        setSubcategorie(e.target.value)
                    }}
                >
                    <option value="null">Choose a Subcategorie</option>
                    {subcategorieList.map((subcategorie, index) =>
                        <option key={index} value={subcategorie}>{subcategorie}</option>
                    )}
                </select>
            </div>
                <label className="bodyUpload__box__label">Select Project File:</label>
                <br/>
                <input
                    className="file__input"
                    directory=""
                    webkitdirectory=""
                    type="file"
                    placeholder="WebGL File..."
                    onChange={(e) => {

                        var str = e.target.files[0].webkitRelativePath
                        var path = str.split("/")
                        setCurrentPath(path[0])
                    }}
                />
                <br/>
            <button className= "file__button" onClick={() => onFileUpload()}>
                Upload!
                </button>
                <br/>
            {successful ? <div> file uploaded successfully ! </div> :
                <div>file problem </div>}
            </div>
            </div>
    )
}

export default WebMasterTwin;