import styled from "styled-components";

const CardTypo = styled.p`
  font-size: ${(props) => props.size};
  margin: 0;
  width: ${(props) => props.w};
  color: ${(props) => props.color};
  font-weight: ${(props) => props.weight};
  text-align: ${(props) => props.align};
`;

export default CardTypo;
