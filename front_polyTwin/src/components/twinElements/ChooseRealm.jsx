import React, { useEffect, useState } from "react";


function ChooseProject(props) {

    return (
        <div style={{
            width: "300px",
            height: "300px",
            border: "2px  black",
            borderRadius: "10px",
            margin: "auto",
            marginTop: "100px",
            backgroundColor: "#f8f9fa"
        }}>
            <label> Project Name : </label>
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
            <br />
                <button onClick={}>
                    Choose
                </button>
        </div>
                
    )
}

export default ChooseProject;