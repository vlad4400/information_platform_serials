// Всплывающее окно с сообщением об ошибках, логине, регистрации и тд. Появляется справа сверху

import Swal from 'sweetalert2';

export const showAlert = (titleText = 'Something happened.', alertType) => {
  Swal.fire({
    titleText,
    position: 'top-end',
    timer: 3000,
    timerProgressBar: true,
    toast: true,
    showConfirmButton: false,
    showCancelButton: true,
    cancelButtonText: 'Dismiss',
    icon: alertType,
    showClass: {
      popup: 'swal2-noanimation',
      backdrop: 'swal2-noanimation',
    },
    hideClass: {
      popup: '',
      backdrop: '',
    },
  });
};
