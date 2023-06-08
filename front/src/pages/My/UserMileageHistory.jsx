import React, { useState, useEffect } from "react";
import { Table, Pagination, Container } from "react-bootstrap";
import * as Api from "../../api";

const UserMileageHistory = ({ user }) => {
  console.log(user._id)
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const res = await Api.get(`users/${user._id}/participants`);
        setOrderHistory(res.data);
      } catch (err) {
        console.error("Failed to fetch order history:", err);
      }
    };

    fetchOrderHistory();
  }, [user]);

  const indexOfLastMileage = currentPage * ordersPerPage;
  const indexOfFirstMileage = indexOfLastMileage - ordersPerPage;
  const currentMileages = orderHistory.slice(indexOfFirstMileage, indexOfLastMileage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Container className="mb-5">
      <Table striped>
        <thead>
          <tr style={{ fontSize: "0.9rem" }}>
            <th>적립 날짜</th>
            <th>적립 금액</th>
            <th>챌린지/활동</th>
          </tr>
        </thead>
        <tbody>
          {currentMileages.map((order, index) => (
            <tr key={index} style={{ fontSize: "0.8rem" }}>
              <td style={{ width: "25%" }}>{order.timestamp}</td>
              <td style={{ width: "25%" }}>{order.mileage.toLocaleString()}</td>
              <td style={{ width: "50%" }}>{order.challenge_id}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {orderHistory.length > ordersPerPage && (
        <Container className="d-flex justify-content-center">
          <Pagination size="sm">
            {Array.from({ length: Math.ceil(orderHistory.length / ordersPerPage) }).map((_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </Container>
      )}
    </Container>
  );
};

export default UserMileageHistory;
