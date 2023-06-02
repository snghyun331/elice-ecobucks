import React, { useState } from "react";
import { Table, Pagination, Container } from "react-bootstrap";

const UserMileageHistory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  // 더미 데이터 주문 내역
  const orderHistory = [
    {
      date: "2023-05-15",
      mileage: 4932,
      event: "6월 1주차 : 전기코드 뽑기",
    },
    {
      date: "2023-05-16",
      mileage: 345,
      event: "(깜짝이벤트) 돌고래 돌보기",
    },
    {
      date: "2023-05-16",
      mileage: 1346,
      event: "포장 용기 쓰기",
    },
    {
      date: "2023-05-16",
      mileage: 345,
      event: "텀블러로 음료 마시기",
    },
    {
      date: "2023-05-16",
      mileage: 45,
      event: "전기코드 뽑기",
    },
    {
      date: "2023-05-16",
      mileage: 4342,
      event: "돌고래 돌보기",
    },
    {
      date: "2023-05-16",
      mileage: 4342,
      event: "포장 용기 쓰기",
    },
    {
      date: "2023-05-16",
      mileage: 4342,
      event: "텀블러로 음료 마시기",
    },

    // 더 많은 주문 내역 데이터...
  ];

  // 현재 페이지에 해당하는 주문 내역 가져오기
  const indexOfLastMileage = currentPage * ordersPerPage;
  const indexOfFirstMileage = indexOfLastMileage - ordersPerPage;
  const currentMileages = orderHistory.slice(indexOfFirstMileage, indexOfLastMileage);

  // 페이지네이션 클릭 시 페이지 변경
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Table striped>
        <thead>
          <tr style={{fontSize:'0.9rem'}}>
            <th>적립 날짜</th>
            <th>적립 금액</th>
            <th>참여 이벤트</th>
          </tr>
        </thead>
        <tbody>
          {currentMileages.map((order, index) => (
            <tr key={index}  style={{fontSize:'0.8rem'}}>
              <td style={{ width: '25%' }}>{order.date}</td>
              <td style={{ width: '25%' }}>{order.mileage.toLocaleString()}</td>
              <td style={{ width: '50%' }}>{order.event}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {orderHistory.length > ordersPerPage && (
        <Container className="d-flex justify-content-center">
  <Pagination>
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

    </>
  );
};

export default UserMileageHistory;
