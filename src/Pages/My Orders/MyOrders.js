import React, { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";

const MyOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [isChange, setIsChange] = useState(false);

  useEffect(() => {
    setIsloading(true);
    fetch(`${process.env.REACT_APP_BASEURL}/myorders/${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setIsloading(false);
      });
  }, [user.email, isChange]);

  const handleDeleteOrder = (id) => {
    console.log(id);
    const confirm = window.confirm("Do you want to  delete");
    if (confirm) {
      fetch(`${process.env.REACT_APP_BASEURL}deletemyorder/${id}`, {
        mode:"no-cors",
        method: "DELETE",
        headers: { "content-type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount) {
            setIsChange(!isChange);
            alert("Delete SuccessFully");
          } else {
            setIsChange(false);
          }
        });
    }
  };

  if (isLoading) {
    return (
      <div className="text-center my-5">
        <div
          className="spinner-grow spinner-grow-sm text-dark me-3"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
        <div
          className="spinner-grow text-dark spinner-grow-sm me-3"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
        <div className="spinner-grow spinner-grow-sm text-dark" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  return (
    <div className="container mx-auto my-5">
      <h1 className="text-center purple-text mb-4">My Events!!</h1>
      <div className="row">
        {orders?.map((item) => (
          <div
            key={item._id}
            className="col-12  col-lg-6 "
          >
            <div className="mx-3 shadow-sm my-3">
              <div className="d-flex flex-column flex-lg-row">
                <img className="w-75" src={item.eventImage} alt="" />
                <div className="ms-3 my-2">
                  <h1 className="fs-4">{item.eventName}</h1>
                  <h6 className="text-warning fs-5">{item.status}</h6>
                  <p>{item.date}</p>
                  <button
                    onClick={() => handleDeleteOrder(item._id)}
                    className="btn second-color-bg"
                  >
                    Cancle
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
