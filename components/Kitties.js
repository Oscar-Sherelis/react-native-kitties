import { Provider } from "react-redux";
import { createStore } from "redux";

import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image, TextInput } from "react-native";
import { checkConnected } from "../checkConnection";
import ErrorScreen from "../screens/ErrorScreen";
import Loader from "./Loader";
export default function Kitties() {

  const store = createStore(() => ({
    kitties: [],
  }));
  const [connectStatus, setConnectStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [kitties, setKitties] = useState([]);

  // pagination data
  const [receivedImagesNumber, setImagesNumber] = useState(100);
  const [kittiesPerPage, setKittiesPerPage] = useState(30);
  const [currentPage, setCurrentPage] = useState(1);

  // data between views
  const [viewChanger, setViewChanger] = useState(true);
  const [imageLink, setImageLink] = useState("");
  const [catName, setCatName] = useState("");

  //checks internet connection
  checkConnected().then((res) => {
    setConnectStatus(res);
  });

  const fetchKitties = async () => {
    setLoading(true);

    const getRandomArbitrary = (min, max) =>{
      return Math.floor(Math.random() * (max - min) + min);
    }

    let data = []
    for (let i = 0; i < receivedImagesNumber; i++) {
      data.push(
        "http://placekitten.com/" +
          getRandomArbitrary(200, 1000) +
          "/" +
          getRandomArbitrary(200, 1000)
      );
    }

    // getting data with redux and passing to state
    store.getState().kitties = data;
    setKitties(store.getState().kitties);
    setLoading(false);
  };
  useEffect(() => {
    fetchKitties();
  }, []);

  function changeReceivedImagesNumber (newNumberOfImg) {
    setImagesNumber(newNumberOfImg);
    fetchKitties();
  }
  function changeView(imgData, selectedCatName) {
    viewChanger ? setViewChanger(false) : setViewChanger(true);
    setCatName(selectedCatName);
    setImageLink(imgData);
  }

  class RenderKitties extends React.Component {
    constructor() {
      super();
      this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
      setCurrentPage(Number(event.target.id));
    }

    render() {
      let nameArr = ["Steven", "George", "Garry", "Greenfield"];

      // Logic for displaying todos
      const indexOfLastKitty = currentPage * kittiesPerPage;
      const indexOfFirstKitty = indexOfLastKitty - kittiesPerPage;
      const indexOfFirstKitties = kitties.slice(
        indexOfFirstKitty,
        indexOfLastKitty
      );

      const renderKitties = indexOfFirstKitties.map((kitty, kittyKey) => {

        let randomCat = nameArr[Math.ceil(Math.random() * nameArr.length - 1)];

        return (
          <li
            onClick={() => changeView(kitty, randomCat)}
            key={kittyKey}
            style={{ marginBottom: "25px" }}
          >
            <Image
              source={{
                uri: kitty,
              }}
              style={styles.imageStyle}
            />
            <p>{randomCat}</p>
          </li>
        );
      });

      // Logic for displaying page numbers
      const pageNumbers = [];
      for (let i = 1; i <= Math.ceil(kitties.length / kittiesPerPage); i++) {
        pageNumbers.push(i);
      }

      const renderPageNumbers = pageNumbers.map((number) => {
        return (
          <li
            style={{ marginRight: "8px" }}
            key={number}
            id={number}
            onClick={this.handleClick}
          >
            {number}
          </li>
        );
      });
      return (
        <div>
          <div style={{display: "flex", justifyContent: "center", marginBottom: 20}}>
            <label>
              Number of received images:
              <TextInput
                style={{ height: 40, border: "1px solid silver" }}
                placeholder="Type number of received images"
                onChangeText={(text) => changeReceivedImagesNumber(text)}
                defaultValue={receivedImagesNumber}
              />
            </label>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              style={{ padding: "20px 30px" }}
              onClick={() => {
                setKittiesPerPage(30);
              }}
            >
              30
            </button>
            <button
              style={{ padding: "20px 30px" }}
              onClick={() => {
                setKittiesPerPage(50);
              }}
            >
              50
            </button>
            <button
              style={{ padding: "20px 30px" }}
              onClick={() => {
                setKittiesPerPage(100);
              }}
            >
              100
            </button>
          </div>
          <ul style={{ listStyle: "none" }}>{renderKitties}</ul>
          <ul style={{ listStyle: "none", display: "flex" }} id="page-numbers">
            {renderPageNumbers}
          </ul>
        </div>
      );
    }
  }

  function KittyList() {
    return (
      <main>
        <RenderKitties></RenderKitties>
      </main>
    );
  }

  function KittyView() {
    return (
      <main
        className="kitty-view"
        style={{ minHeight: "100vh", maxHeight: "100vh" }}
      >
        <div className="kitty-info">
          <p
            style={{ textAlign: "center" }}
            onClick={() => {
              changeView();
            }}
          >
            Back To list
          </p>
          <Image
            source={{ uri: imageLink }}
            style={{ width: "100vw", height: 200 }}
          />
          <h2 style={{ marginLeft: 20 }}>{catName}</h2>
          <p style={{ marginLeft: 20 }}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis, quo
            fugit et sunt cupiditate enim, ducimus sint eius ex ipsam neque?
            Nihil molestiae placeat dolore debitis, aliquid iste reiciendis
            modi.
          </p>
        </div>
      </main>
    );
  }

  return connectStatus ? (
    <View>
      {loading ? (
        <Loader></Loader>
      ) : viewChanger ? (
        <Provider store={store}>
          <KittyList></KittyList>
        </Provider>
      ) : (
        <KittyView></KittyView>
      )}
    </View>
  ) : (
    <ErrorScreen></ErrorScreen>
  );
}

const styles = StyleSheet.create({
  imageStyle: {
    height: 250,
    width: "90vw",
    margin: "0 auto",
  },
  liStyle: {
    marginBottom: 20,
  },
  buttonStyle: {
    padding: 20
  }
});
