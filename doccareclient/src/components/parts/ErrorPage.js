import React from "react";

import "./ErrorPage.scss";
import cryingDoc from "../../assets/images/crydoc.jpg";

const ErorrPage = ()=> {
    return (
        <div className ="error-page-container">
            <div className = "error-page-container__image-text-grp">
                <img src = {cryingDoc} alt = "something went wrong"/>
                <h1>!! 404 NOT FOUND</h1>
            </div>
        </div>
    );
}

export default ErorrPage;