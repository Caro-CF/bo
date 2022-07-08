// import { render, screen } from "@testing-library/react";
// import { userService } from "services";
import "@testing-library/jest-dom";
// import Index from "pages/users";
// import userEvent from "@testing-library/user-event"
import '@testing-library/jest-dom/extend-expect'
// import { Link } from "components";

const sum = (a,b) => {return (a+b)};

describe("a + b", () => {
  it("should return a number", () =>
  expect(sum(1,2)).toBe(3));
});

// describe("Index user page", () => {
//   it("should render", () => {
//     render(<Index />);

//     userEvent.type(screen.getByAltText(/Avatar de l'utilisateur/i));
//     userEvent.type(screen.getByTitle("Utilisateurs"));
//     userEvent.type(screen.getByRole('img'))
//   });

//   it("link", () => {
//     render(<Link />);
//     userEvent.type(screen.findAllByText("Ajouter un utilisateur"))
//   })
// });
