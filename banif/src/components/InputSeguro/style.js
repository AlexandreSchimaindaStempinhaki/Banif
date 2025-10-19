import styled from "styled-components";

export const InputContainer = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const EditableDiv = styled.div`
  background-color: #f8f9fa;
  width: 80%;
  height: calc(calc(3vh + 3vw) / 2);
  border: none;
  border-radius: 50px;
  font-size: calc(calc(2vw + 0.5vh) / 2);
  color: #000000;
  padding: 8px 15px;
  outline: none;
  transition: 0.3s;
  line-height: 1.5;
  display: flex;
  align-items: center;
  overflow: hidden;
  white-space: nowrap;
  cursor: text;

  &:focus {
    background-color: #ffffff;
    box-shadow: 0 0 0 2px #1e90ff;
  }

  &[placeholder]:empty:before {
    content: attr(placeholder);
    color: #6c757d;
  }

  &[placeholder]:empty:focus:before {
    content: attr(placeholder);
    color: #6c757d;
    opacity: 0.7;
  }

  @media (max-width: 800px) {
    width: 90%;
    font-size: calc(calc(3vw + 0.5vh) / 2);
  }
`;
