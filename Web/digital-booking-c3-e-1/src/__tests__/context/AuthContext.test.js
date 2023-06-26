import React from "react";
import { render } from "@testing-library/react";
import { UserDataContext } from "../../context/AuthContext";
import { mockGeolocation } from "../../__mocks__/testUtils";

test("renders the AuthContext provider without errors", () => {
  const restoreGeolocation = mockGeolocation(40.7128, -74.006); // New York

  render(
    <UserDataContext>
      <div>AuthContext</div>
    </UserDataContext>
  );

  restoreGeolocation();
});
