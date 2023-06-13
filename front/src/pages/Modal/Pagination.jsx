import React from 'react';
import {Pagination} from 'react-bootstrap';

const Pagination1 = ( { content, itemsPerPage, handlePageChange, currentPage }
) => {
    // 페이지네이션 아이템 생성 함수
  const renderPaginationItems = () => {
    // console.log(currentPage);
    const totalPages = Math.ceil(content.length / itemsPerPage);
    const paginationItems = [];

    for (let i = 1; i <= totalPages; i++) {
      paginationItems.push(
        <Pagination.Item
          key={i}
          active={currentPage === i}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </Pagination.Item>
      );
    }
    console.log(paginationItems);
    return paginationItems;
  };
  
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      {/* 페이지네이션 컴포넌트 */}
      <Pagination>
        <Pagination.First onClick={() => handlePageChange(1)} />
        <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} />
        {renderPaginationItems()}
        <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} />
        <Pagination.Last onClick={() => handlePageChange(Math.ceil(content.length / itemsPerPage))} />
      </Pagination>
    </div>
  );
};

export default Pagination1;