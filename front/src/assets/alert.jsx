import React from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export const showAlert = (text, icon = 'error') => {
  MySwal.fire({
    text: text,
    icon: icon,
    zIndex: 9999,
    confirmButtonHtml: '확인',
    confirmButtonColor: '#00D387'
  });
};

export const showSuccess = (text, icon = 'success') => {
  MySwal.fire({
    text: text,
    icon: icon,
    zIndex: 9999,
    confirmButtonHtml: '확인',
    confirmButtonColor: '#00D387'
  });
};

export default MySwal;
