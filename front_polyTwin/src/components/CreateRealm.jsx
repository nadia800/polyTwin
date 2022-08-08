import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';
//API Innovatwin
import { addRealm } from "../actions/realm/realm";
import "../scss/CreateRealm.scss";//CSS File

const CreateRealm = () => {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const { isLoggedIn } = useSelector(state => state.auth);
    const [id, setId] = useState("")
    const [projectName, setProjectName] = useState("")
    const [categorieList, setCategorieList] = useState(["Smart Home", "Smart City", "Industrial"])
    const [categorie, setCategorie] = useState("")
    const [subCategorieList, setSubCategorieList] = useState(['sub1', 'sub2', 'sub3'])
    const [subCategorie, setSubCategorie] = useState("");
    const [message, setMessage] = useState("")

    if (isLoggedIn === false) {
        console.log(isLoggedIn)
        return <Navigate to="/login" replace />;
    }

    const createRealm = () => {
        //Create Realm dataBase and naviagte to masterRealm
        dispatch(addRealm(id,
            projectName,
            categorie,
            subCategorie
        )).then(response => {
            if (response.error) {
                    setMessage(response.Message)
                } else {
                    navigate("/signup", { state: { realm: projectName } })
                }
                
            })
            .catch((err) => {
                return err
            });

    }
    return (
        <div style={{
            width: "100%",
            height: "100vh",
            backgroundColor: "#C4C4C4",
            paddingTop: "90px",
        }}>
            <div className="Create">
                <div className="Create__title">Create Realm</div>
                <label className="Create__label">Id:</label>
                <br />
                <input
                    id="id"
                    className="Create__input"
                    type="text"
                    onChange={(e) => { setId(e.target.value) }}
                    value={id}
                />
                <br />
                <label className="Create__label">Project Name:</label>
                <br />
                <input
                    id="projectName"
                    className="Create__input"
                    type="text"
                    onChange={(e) => { setProjectName(e.target.value) }}
                    value={projectName}
                />
                <br />
                <label className="Create__label">Select Project Categorie:</label>
                <br />
                <div className="body__categorie__list">
                    <select
                        className="Create__input"
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
                <label className="Create__label">Select Project SubCategorie:</label>
                <br />
                <div className="body__subcategorie__list">
                    <select
                        className="Create__input"
                        id="body__subcategorie"
                        onChange={(e) => {
                            setSubCategorie(e.target.value)
                        }}
                    >
                        <option value="null">Choose a subcategorie</option>
                        {subCategorieList.map((subcategorie, index) =>
                            <option key={index} value={subcategorie}>{subcategorie}</option>
                        )}
                    </select>
                </div>
                <button className="Create__button" onClick={createRealm}>
                    Create
                </button>
                <div style={{
                    fontSize: '15px',
                    paddingLeft: '20px',
                    color: 'red',
                    fontFamily:'Comic Sans MS'
                }}>{message}</div>
            </div>
            
        </div>
   )
}

export default CreateRealm;