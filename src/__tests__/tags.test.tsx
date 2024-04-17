import { expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import displayTags from "@/components/display-tags";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

it("displays tags", () => {
  render(displayTags(["tag1", "tag2"]), { wrapper: Wrapper });
  // render(<Wrapper>{displayTags(["tag1", "tag2"])}</Wrapper>);
  expect(screen.getByText("#tag1")).toBeDefined();
});
