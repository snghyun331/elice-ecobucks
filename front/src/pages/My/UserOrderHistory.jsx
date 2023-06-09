import React, { useState } from "react";
import { Table, Pagination, Container } from "react-bootstrap";

const UserOrderHistory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  // 더미 데이터 주문 내역
  const orderHistory = [
    {
      date: "2023. 05. 15.",
      product: "Product A",
      price: 100,
      location: "Location A",
    },
    {
      date: "2023. 05. 16.",
      product: "Product B",
      price: 200,
      location: "Location B",
    },
    {
      date: "2023. 05. 16.",
      product: "Product C",
      price: 200,
      location: "Location C",
    },
    {
      date: "2023. 05. 16.",
      product: "Product D",
      price: 200,
      location: "Location D",
    },
    {
      date: "2023. 05. 16.",
      product: "Product E",
      price: 200,
      location: "Location E",
    },
    {
      date: "2023. 05. 16.",
      product: "Product E",
      price: 200,
      location: "Location E",
    },
    {
      date: "2023. 05. 16.",
      product: "Product E",
      price: 200,
      location: "Location E",
    },
    {
      date: "2023. 05. 16.",
      product: "Product E",
      price: 200,
      location: "Location E",
    },

    // 더 많은 주문 내역 데이터...
  ];

  // 현재 페이지에 해당하는 주문 내역 가져오기
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orderHistory.slice(indexOfFirstOrder, indexOfLastOrder);

  // 페이지네이션 클릭 시 페이지 변경
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Container className="mb-5">
      <Table striped>
        <thead>
          <tr style={{fontSize:'0.9rem'}}>
            <th>주문 날짜</th>
            <th>상품명</th>
            <th>가격</th>
            <th>수령위치</th>
          </tr>
        </thead>
        <tbody>
          {currentOrders.map((order, index) => (
            <tr key={index}  style={{fontSize:'0.8rem'}}>
              <td style={{ width: '25%' }}>{order.date}</td>
              <td style={{ width: '25%' }}>{order.product}</td>
              <td style={{ width: '25%' }}>{order.price}</td>
              <td style={{ width: '25%' }}>{order.location}</td>
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
};

export default UserOrderHistory;
