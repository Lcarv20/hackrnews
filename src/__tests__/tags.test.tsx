import { describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import displayTags from "@/components/display-tags";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

const customRenderer = (numberOfTags: number, limit: number) => {
  let tags: string[] = [];
  for (let i = 0; i < numberOfTags || 0; i++) {
    tags.push(`tag${i}`);
  }

  render(displayTags(tags, limit), {
    wrapper: Wrapper,
  });
};

describe("displayTags", () => {
  customRenderer(5, 3);

  it("displays tags", () => {
    expect(screen.getByText("tag1")).toBeDefined();
  });

  it("Display N tags max", () => {
    // customRenderer(4, 3);
    expect(screen.queryByText("tag4")).toBeNull();
    expect(screen.getAllByText(/\+ \d/)).toHaveLength(1);
  });

  it("displays no tags", () => {
    cleanup(); // Clean up the DOM from the previous test
    customRenderer(0, 3);
    expect(screen.queryByText(/tag\d/, { suggest: true })).toBeNull(); // Look for any text starting with "tag" followed by a digit
  });

  it("opens popup with remaining tags", () => {
    // TODO: migrate to shadcn
    throw new Error("Not yet implemented");
  });
});
