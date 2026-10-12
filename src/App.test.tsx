import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { AppRoutes } from "./routes";

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <AppRoutes />
    </MemoryRouter>,
  );
}

describe("App routes", () => {
  it("renders the landing page with site navigation", () => {
    renderAt("/");
    expect(screen.getByRole("heading", { name: /how sheleyfarms works/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /about us/i })).toBeInTheDocument();
  });

  it("navigates to the farms catalog", async () => {
    const user = userEvent.setup();
    renderAt("/");
    await user.click(screen.getAllByRole("link", { name: "Browse Farms" })[0]);
    expect(
      await screen.findByRole("heading", { name: /browse farms/i }),
    ).toBeInTheDocument();
  });

  it("renders the about page directly", () => {
    renderAt("/about");
    expect(screen.getByRole("heading", { name: /about sheleyfarms/i })).toBeInTheDocument();
  });

  it("renders a not-found page for unknown routes", () => {
    renderAt("/no-such-page");
    expect(screen.getByRole("heading", { name: /page not found/i })).toBeInTheDocument();
  });
});
