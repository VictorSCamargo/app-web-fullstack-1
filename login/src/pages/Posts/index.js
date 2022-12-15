import { Link } from "react-router-dom";
import { useState } from "react";
import { LayoutComponents } from "../../components/LayoutComponents";
import { PostComponent } from "../../components/PostComponent";

export const Posts = () => {
    const [text, setText] = useState("");
    return (
      <div className="post-wrapper">
        <div className="post-input">
        <span className="login-form-title">Faca Um Review!</span>
        <textarea className="text-send"></textarea>
        <div className="container-post-send-btn">
          <button className="post-send-btn">Enviar</button>
        </div>
        </div>
            <ul className="post-list">
                <li><PostComponent></PostComponent></li>
                <li><PostComponent></PostComponent></li>
                <li><PostComponent></PostComponent></li>
            </ul>
        </div>
  );
};

//transformar lista em componente 
//
//    <ul>
//{Movies.map(data => (
//  <li key={data.id}> {data.name}</li>
//))}
//</ul>