import React, { useState, useEffect } from "react";
import "../MainComponent/MainComponent.scss";
import ModalListPostsComponent from "../ModalComponent/ModalListPostsComponent";

const MainComponent = () => {
  const [listUser, setListUser] = useState([]);
  const [listPosts, setListPosts] = useState([]);
  const [listAlbums, setListAlbums] = useState([]);
  const [modalListPosts, setModalListPosts] = useState({
    id: "",
    show: false,
    data: null,
  });
  const [modalListAlbums, setModalListAlbums] = useState({
    id: "",
    show: false,
    data: null,
  });

  useEffect(() => {
    fetchUser();
  }, []);

  //   useEffect(() => {
  //     allPosts(modalListPosts?.id);
  //   }, [modalListPosts?.show]);

  const fetchUser = () => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res?.json())
      .then((data) => {
        console.log(data);
        setListUser(data);
      })
      .catch((err) => {
        console.log(err?.message);
      });
  };

  const allPosts = async (id) => {
    await fetch(`https://jsonplaceholder.typicode.com/posts`)
      .then((res) => res?.json())
      .then((data) => {
        let d = data?.filter((i) => i?.userId === id);
        setListPosts(d);
      })
      .catch((err) => {
        console.log(err?.message);
      });
  };

  const allAlbum = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/albums`)
      .then((res) => res?.json())
      .then((data) => {
        let d = data?.filter((i) => i?.userId === id);
        setListAlbums(d);
      })
      .catch((err) => {
        console.log(err?.message);
      });
  };

  return (
    <>
      <div className="mainComp container">
        <h1>Daftar Pengguna</h1>
        <div className="mainComp-content">
          <table>
            <thead className="sticky-top">
              <tr>
                <th>No</th>
                <th>Nama</th>
                <th>Nama Pengguna</th>
                <th>E-Mail</th>
              </tr>
            </thead>
            <tbody>
              {listUser?.map((lu, luIdx) => (
                <tr key={luIdx}>
                  <td>{lu?.id}</td>
                  <td
                    onClick={() => {
                      allPosts(lu?.id);
                      allAlbum(lu?.id);
                      setModalListPosts({
                        id: lu?.id,
                        show: true,
                        data: listPosts,
                      });
                      setModalListAlbums({
                        id: lu?.id,
                        show: true,
                        data: listAlbums,
                      });
                    }}
                  >
                    {lu?.name}
                  </td>
                  <td>{lu?.username}</td>
                  <td>{lu?.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {modalListPosts?.show && (
        <ModalListPostsComponent
          show={modalListPosts?.show}
          onHide={() => {
            setModalListPosts({
              show: false,
              data: null,
            });
            setModalListAlbums({
              show: false,
              data: null,
            });
          }}
          hasId={modalListPosts?.id}
          listPosts={listPosts}
          listAlbums={listAlbums}
        />
      )}
    </>
  );
};

export default MainComponent;
