import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const globalStyle = css`
  body {
    margin: 0;
    background-color: #222;
    color: #fff;
    font-family: sans-serif;
  }
  a {
    color: rgb(187, 122, 255);
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const Button = styled.button`
  border: 1px solid transparent;
  border-radius: 4px;
  padding: 0.3ch 1ch;
  font-size: 12px;
  cursor: pointer;
  background-color: rgba(165, 80, 255, 0.6);
  color: #fff;
  transition: background-color 0.1s ease-in, border 0.1s ease-in;
  &:hover {
    background-color: rgb(165, 80, 255);
    border: 1px solid rgba(165, 80, 255, 0.6);
  }
`;

export const NavBar = styled.nav`
  padding: 1ch 1.5ch;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  background: #222;
  border-bottom: 1px solid #666;

  & > div {
    display: flex;
    align-items: center;
    height: 3ch;
  }
  img {
    margin-right: 1.6ch;
  }
  button {
    margin-left: 1.2ch;
  }
`;

export const Main = styled.main`
  padding: 1ch 1.5ch;
  display: flex;
  flex-direction: column;
  align-items: center;
  article {
    width: 100%;
  }
  article + article {
    margin-top: 1ch;
    border-top: 1px solid #ccc;
    padding-top: 2ch;
  }
  small {
    color: rgba(255, 255, 255, 0.4);
    font-size: 12px;
  }
`;

export const Container = styled.div`
  grid-column: 2;
  grid-row: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 128px;
    margin-bottom: 3ch;
  }
  button {
    padding: 1ch 2ch;
  }
`;

export const Banner = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  height: 100vh;
`;
