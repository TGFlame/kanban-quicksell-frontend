import { Add, ThreeDotMenu } from "../utils/icons";

const Status = ({ status, imgSvg, count, user }) => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0 0.5rem",
          margin: "1rem",
          maxWidth: "21.5rem",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", gap: "0.7rem", alignItems: "center" }}>
          {user === "user" ? (
            <img
              src="https://cdn-icons-png.flaticon.com/512/1144/1144760.png"
              style={{ width: "2.1rem", height: "2.1rem" }}
              className="card-cam-avatar"
              alt=""
            />
          ) : (
            <img src={imgSvg} alt="" />
          )}
          <div style={{ fontWeight: "normal", fontSize: "1.1rem" }}>
            {status}
          </div>
          <span>{count}</span>
        </div>
        <div style={{ display: "flex", gap: "0.7rem" }}>
          <img src={Add} alt="" />
          <img src={ThreeDotMenu} alt="" />
        </div>
      </div>
    </>
  );
};

export default Status;
