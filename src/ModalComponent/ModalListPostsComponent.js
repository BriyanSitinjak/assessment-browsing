import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import "../ModalComponent/ModalComponent.scss";

const ModalListPostsComponent = ({
  show,
  onHide,
  listPosts,
  listAlbums,
  ...props
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const addPost = () => {
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        body: description,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((json) => console.log(json));
  };

  return (
    <div>
      <Modal
        show={show}
        onHide={onHide}
        dialogClassName="modal-dialog-centered abs"
        backdrop="static"
        size="lg"
      >
        <Modal.Body>
          <div className="modalContainer">
            <span onClick={() => onHide()}>CLOSE</span>
            <div className="d-flex align-items-center flex-column">
              <div>
                <label>Title</label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e?.target?.value)}
                />
              </div>
              <div>
                <label>Description</label>
                <input
                  value={description}
                  onChange={(e) => setDescription(e?.target?.value)}
                />
              </div>
              <button onClick={() => addPost()}>ADD POST</button>
            </div>
            <div className="modalList">
              <h3>List Of Posts</h3>
              <ol>
                {listPosts?.map((lp) => (
                  <li>{lp?.title}</li>
                ))}
              </ol>
            </div>
            <div className="modalAlbum">
              <h3>List of Albums</h3>
              <ol>
                {listAlbums?.map((lp) => (
                  <li>{lp?.title}</li>
                ))}
              </ol>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ModalListPostsComponent;
