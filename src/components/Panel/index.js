import styled from "styled-components";

export const Panel = styled.div`
  height: 95%;
  width: ${(props) => (props.lg ? `calc(92vw - 250px - 280px)` : `97%`)};
  border-radius: 30px;
  background: #e1dff9;
  overflow-y: auto;
  overflow-x: hidden;
  margin: 2rem 0 0 0;
  ::-webkit-scrollbar {
    background-color: transparent;
    width: 6px;
  }
  ::-webkit-scrollbar-thumb {
    background: #ffffff;
    border-radius: 30px;
  }
  scrollbar-width: none;
`;
