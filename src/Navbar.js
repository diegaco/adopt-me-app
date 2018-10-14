import React from "react";
import { Link } from "@reach/router";
import styled, { keyframes } from "react-emotion";
import colors from "./colors";

// With css in js here applies the pattern
// Optimized for deletabiliy, is something is deletable, that
// means it's modular and if it's modular is great
// All the CSS, HTML, Javascript for this module get deleted

// injectGlobal`
//   * {color: red}
// `;

const Spin = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg)
  }
`;

const SpyGlass = styled("span")`
  display: inline-block;
  animation: ${props => props.frecuency}s ${Spin} linear infinite;
`;

const Header = styled("header")`
  background-color: ${colors.dark};
  position: sticky;
  top: 0;
  z-index: 10;
`;

const NavLink = styled(Link)`
  &:hover {
    text-decoration: underline;
  }
`;

class Navbar extends React.Component {
  state = { frecuency: 10 };
  halfFrecuency = () => this.setState({ frecuency: this.state.frecuency / 2 });
  render() {
    return (
      <Header>
        <NavLink to="/">Adopt Me!</NavLink>
        <NavLink to="/search-params">
          <SpyGlass
            onClick={this.halfFrecuency}
            frecuency={this.state.frecuency}
            aria-label="search"
            role="img"
          >
            🔍
          </SpyGlass>
        </NavLink>
      </Header>
    );
  }
}

export default Navbar;
