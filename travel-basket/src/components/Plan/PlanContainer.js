const PlanContainer = ({ daycnt, openSearchPopup, data }) => {
  const openPopup = () => {
    openSearchPopup(daycnt);
  };
  return (
    <>
      <div className="planByDay idx">
        {/* idx에 나중에 n일차를 표기하는 숫자가 들어옴 */}
        <div className="labelDiv">
          <label className="dayText">{data.day}</label>
        </div>
        <div className="buttonDiv">
          <div className="addDay" onClick={openPopup}>
            +
          </div>
        </div>
      </div>
      <div className="updownSpace"></div>
    </>
  );
};
export default PlanContainer;
