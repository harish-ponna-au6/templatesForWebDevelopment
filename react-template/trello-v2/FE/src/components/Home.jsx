import React, { useState, useEffect } from "react";
import Form from "./Form";
import "../styles/Home.css";
import { veiwAllTrelloBoardNames, deleteABoard } from "../redux/actions";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Board from "./Board";
import Loading from "./Loading";

const Home = (props) => {
  const {
    veiwAllTrelloBoardNames,
    trelloBoardNames,

    isLoggedIn
  } = props;

  const [isLoading, setIsLoading] = useState();

  useEffect(() => {
    veiwAllTrelloBoardNames({ setIsLoading });
  }, [veiwAllTrelloBoardNames]);

  return (
    <>
      {!isLoggedIn && <Redirect to="/" />}
      {isLoading && <Loading />}
      <div className="Home">
        <div className="addABoardContainer">
          <Form isBoard={true} />
        </div>
        <h2>All Boards</h2>
        <div className="allBoards">
          {trelloBoardNames.map((board) => (
            <Board key={board._id} board={board} />
          ))}
        </div>
      </div>
    </>
  );
};

export default connect(
  (state) => ({
    trelloBoardNames: [...state.trelloBoardNames],
    isLoggedIn: state.user.isLoggedIn
  }),
  { veiwAllTrelloBoardNames, deleteABoard }
)(Home);
