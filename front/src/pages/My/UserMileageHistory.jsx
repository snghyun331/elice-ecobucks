import React, { useState, useEffect } from "react";
import { Table, Container } from "react-bootstrap";
import * as Api from "../../api";
import { formatDate } from "../../util/common";
import PagenationBar from "../Modal/PaginationBar";

const UserMileageHistory = ({ user }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [mileageHistory, setMileageHistory] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchMileageHistory = async () => {
      try {
        const res = await Api.get(`mypage/challenges?page=${currentPage}`);
        console.log(res);
        if (res.data.message) {
          setMileageHistory([]);
        } else {
          setMileageHistory(res.data.newParticipations.userParticipationList || []);
          setTotalPages(res.data.totalPages);
        }
      } catch (err) {
        console.error("Failed to fetch mileage history:", err);
      }
    };

    fetchMileageHistory();
  }, [user, currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage < 1) {
      setCurrentPage(1);
    } else if (newPage > totalPages) {
      setCurrentPage(totalPages);
    } else {
      setCurrentPage(newPage);
    }
  };

  return (
    <Container className="mb-5">
      <Table striped>
        <thead>
          <tr style={{ fontSize: "0.9rem" }}>
            <th>적립 날짜</th>
            <th>적립 금액</th>
            <th>챌린지/활동</th>
            <th>테마 아이콘</th>
          </tr>
        </thead>
        <tbody>
          {mileageHistory.length > 0 ? (
            mileageHistory.map((mileage, index) => (
              <tr key={index} style={{ fontSize: "0.8rem" }}>
                <td style={{ width: "25%" }}>{formatDate(mileage.participationCreatedAt)}</td>
                <td style={{ width: "25%" }}>1,000</td>
                <td style={{ width: "25%" }}>{mileage.challengeTitle}</td>
                <td style={{ width: "25%" }}>{mileage.challengeIcon}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} style={{ textAlign: "center" }}>
                No mileage history available.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      <Container className="d-flex justify-content-center">
        <PagenationBar
          totalPages={totalPages}
          handlePageChange={handlePageChange}
          currentPage={currentPage}
        />
      </Container>
    </Container>
  );
};

export default UserMileageHistory;
