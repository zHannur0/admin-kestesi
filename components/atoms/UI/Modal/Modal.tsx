import styled from "@emotion/styled";

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2000;
  padding: 30px 15px;
  overflow: auto;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
`;

export const ModalInner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100%;
`;

export const ModalContent = styled.div`
  background-color: #fff;
  width: 100%;
  max-width: 500px;
  padding: 25px;
  position: relative;

  border-radius: 25px;

  .modal_header {
    font-size: 2.4rem;
    margin-bottom: 3.2rem;
    text-align: center;
    font-weight: 700;
  }

  .modal_body {
    font-size: 1.8rem;
    font-weight: 500;

    .forms {
      span {
        color: rgba(0, 0, 0, 0.5);
      }
    }

    &-title,
    &-subtitle {
      text-align: center;
    }

    &-title {
      color: #54595e;
      font-size: 2rem;
      margin-bottom: 0.8rem;
      font-weight: 600;
    }

    &-subtitle {
      color: #54595e99;
      font-size: 1.4rem;
    }
  }

  .modal_footer {
    display: flex;
    justify-content: center;
    gap: 2.4rem;

    margin-top: 3.2rem;
  }
`;
