import React from "react";
import { render } from "@testing-library/react";
import { UserContext, UserDataContext } from "../../context/AuthContext";

const TestComponent = ({ children }) => {
  if (!children) {
    return null;
  }
  return (
    <UserDataContext>
      <UserContext.Consumer>
        {(value) => React.cloneElement(children, { userContextValue: value })}
      </UserContext.Consumer>
    </UserDataContext>
  );
};

test("renders without error", () => {
  render(<TestComponent />);
});

export default TestComponent;
