const TypeButtnContainer = (props) => {
  const { val, idx, selected, type, handleType, ...other } = props;
  function changeCss() {
    console.log(val, idx, selected);
    handleType(type, val, idx);
  }
  return (
    <button
      className={'board_btn ' + (selected === true ? ' active' : '')}
      {...other}
      onClick={changeCss}
    >
      {val}
    </button>
  );
};
export default TypeButtnContainer;
