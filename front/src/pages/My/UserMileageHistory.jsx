import React, { useState, useEffect } from "react";
import moment from "moment";
import { Table, Pagination, Container } from "react-bootstrap";
import * as Api from "../../api";
import { formatDate } from "../../util/common";


const UserMileageHistory = ({ user }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const mileagesPerPage = 5;
  const [mileageHistory, setMileageHistory] = useState([]);

  useEffect(() => {
    const fetchMileageHistory = async () => {
      try {
        const res = await Api.get(`users/${user._id}/participants`);
        if (res.data.message) {
          setMileageHistory([])
        } else {
        setMileageHistory(res.data.userChallengeList);}
      } catch (err) {
        console.error("Failed to fetch mileage history:", err);
      }
    };

    fetchMileageHistory();
  }, [user]);

  const indexOfLastMileage = currentPage * mileagesPerPage;
  const indexOfFirstMileage = indexOfLastMileage - mileagesPerPage;
  const currentMileages = mileageHistory.slice(
    indexOfFirstMileage,
    indexOfLastMileage
  );

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
          {currentMileages.map((mileage, index) => (
            <tr key={index} style={{ fontSize: "0.8rem" }}>
              <td style={{ width: "25%" }}>{formatDate(mileage.updatedAt)}</td>
              <td style={{ width: "25%" }}>1,000</td>
              <td style={{ width: "50%" }}>{mileage.challengeTitle}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {mileageHistory.length > mileagesPerPage && (
        <Container className="d-flex justify-content-center">
          <Pagination size="sm">
            {Array.from({
              length: Math.ceil(mileageHistory.length / mileagesPerPage),
            }).map((_, index) => (
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
