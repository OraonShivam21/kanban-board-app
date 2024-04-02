import React, { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";

const useActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => {
    return bindActionCreators(
      { ...thunkCreators, ...actionCreators },
      dispatch
    );
  }, [dispatch]);
};

const Board = () => {
  const [addTrackModal, setAddTrackModal] = useState(false);
  useActions;
  return <div></div>;
};

export default Board;
