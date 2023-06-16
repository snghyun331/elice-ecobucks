import React from 'react';
import { Pagination } from 'react-bootstrap';

const PaginationBar = ({ totalPages, handlePageChange, currentPage }) => {
  // 페이지네이션 아이템 생성 함수
  const renderPaginationItems = () => {
    const paginationItems = [];

    for (let i = 1; i <= totalPages; i++) {
      paginationItems.push(
        <a href="#"
          key={i}
          active={currentPage === i}
          onClick={() => handlePageChange(i)}
          style={{
            width: '15px',
            height: '15px',
            position: 'relative',
            backgroundColor: currentPage === i ? '#2ecc71' : '#E5F9DB',
            borderRadius: '100%',
            margin: 'auto 5px',
            cursor: 'pointer',
          }}
        >

        </a>
      );
    }
    return paginationItems;
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '50px' }}>
      {/* 페이지네이션 컴포넌트 */}
      <Pagination>
        {renderPaginationItems()}
      </Pagination>
    </div>
  );
};

export default PaginationBar;
