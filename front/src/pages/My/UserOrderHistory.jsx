import React, { useState, useEffect } from "react";
import { Table, Pagination, Container } from "react-bootstrap";
import moment from "moment";
import * as Api from "../../api";
import { formatDate } from "../../util/common";

const UserOrderHistory = ({ user }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const res = await Api.get("mypage/orders");
        if (res.data.message) {
          setOrderHistory([])
        } else { setOrderHistory(res.data.orderDetails) };
      } catch (err) {
        console.error("Failed to fetch order history:", err);
      }
    };

    fetchOrderHistory();
  }, [user]);

  // 현재 페이지에 해당하는 주문 내역 가져오기
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  // const currentOrders = orderHistory.slice(indexOfFirstOrder, indexOfLastOrder);

  // 페이지네이션 클릭 시 페이지 변경
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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
            .sort((a, b) => new Date(b.date) - new Date(a.date)) // 날짜를 최신순으로 정렬
            .slice((currentPage - 1) * ordersPerPage, currentPage * ordersPerPage) // 현재 페이지에 해당하는 주문 내역 선택
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

      {orderHistory.length > ordersPerPage && (
        <Container className="d-flex justify-content-center">
          <Pagination size='sm'>
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
}

export default UserOrderHistory;
