const TypeContainer = ({ type, val, idx, selected, handleType }) => {
  const setType = (e) => {
    e.preventDefault();
    handleType(type, val, idx);
  };
  return (
    <button className={`typeBtn` + (selected === true ? " activate" : "")} onClick={setType}>
      {val}
    </button>
  );
};
export default TypeContainer;
