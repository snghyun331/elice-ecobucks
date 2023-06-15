import React, { useState, useEffect } from "react";
import { Table, Pagination, Container } from "react-bootstrap";
import moment from "moment";
import * as Api from "../../api";
import { formatDate } from "../../util/common";
import PagenationBar from "../Modal/PaginationBar";

const UserOrderHistory = ({ user }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [orderHistory, setOrderHistory] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const res = await Api.get(`mypage/orders?page=${currentPage}`);
        if (res.data.message) {
          setOrderHistory([])
        } else {
          setOrderHistory(res.data.orderDetails);
          setTotalPages(res.data.totalPages)
        };
      } catch (err) {
        console.error("주문 내역 불러오기를 실패하였습니다:", err);
      }
    };

    fetchOrderHistory();
  }, [currentPage]);

  // 페이지네이션 클릭 시 페이지 변경
  const handlePageChange = (newPage) => {
    if (newPage < 1) {
      setCurrentPage(1)
    } else if (newPage > totalPages) {
      setCurrentPage(totalPages)
    } else {
      setCurrentPage(newPage);
    }
  };

  return (
    <Container className="mb-5">
      <Table striped>
        <thead>
          <tr style={{ fontSize: '0.9rem' }}>
            <th>주문 날짜</th>
            <th>상품명</th>
            <th>가격</th>
            <th>수령위치</th>
          </tr>
        </thead>
        <tbody>
          {orderHistory
            .map((order, index) => (
              <tr key={index} style={{ fontSize: '0.8rem' }}>
                <td style={{ width: '25%' }}>{formatDate(order.date)}</td>
                <td style={{ width: '25%' }}>{order.product}</td>
                <td style={{ width: '20%' }}>{order.price.toLocaleString()}</td>
                <td style={{ width: '30%' }}>{order.location}</td>
              </tr>
            ))}
        </tbody>
      </Table>

      {(
        <Container className="d-flex justify-content-center">

          <PagenationBar
            totalPages={totalPages}
            handlePageChange={handlePageChange}
            currentPage={currentPage}
          />
        </Container>
      )}
    </Container>
  );
}

export default UserOrderHistory;
