import React, { useState, useEffect } from "react";
import { Table, Pagination, Container } from "react-bootstrap";
import * as Api from "../../api";
import { formatDate } from "../../util/common";
import PagenationBar from "../Modal/PaginationBar";

const UserMileageHistory = ({ user }) => {
  const [currentPage, setCurrentPage] = useState(1);
  // const mileagesPerPage = 5;
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
          setMileageHistory(res.data.userChallengeList);
          setTotalPages(res.data.totalPages);
        }
      } catch (err) {
        console.error("Failed to fetch mileage history:", err);
      }
    };

    fetchMileageHistory();
  }, [user, currentPage]);

  // 페이지네이션 클릭 시 페이지 변경
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
          </tr>
        </thead>
        <tbody>
          {mileageHistory.map((mileage, index) => (
            <tr key={index} style={{ fontSize: "0.8rem" }}>
              <td style={{ width: "25%" }}>{formatDate(mileage.updatedAt)}</td>
              <td style={{ width: "25%" }}>1,000</td>
              <td style={{ width: "50%" }}>{mileage.challengeTitle}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {
        <Container className="d-flex justify-content-center">
          <PagenationBar
            totalPages={totalPages}
            handlePageChange={handlePageChange}
            currentPage={currentPage}
          />
        </Container>
      }
    </Container>
  );
};

export default UserMileageHistory;
