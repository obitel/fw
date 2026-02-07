import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { FeatureGrid } from "@/components/sections/feature-grid";

describe("FeatureGrid", () => {
  it("renders the feature list and section heading", () => {
    render(<FeatureGrid />);

    expect(
      screen.getByRole("heading", {
        name: /Всё, что нужно для создания сложных интерфейсов без боли/i,
      })
    ).toBeInTheDocument();

    const featureHeadings = screen.getAllByRole("heading", { level: 3 });
    expect(featureHeadings).toHaveLength(7);

    expect(screen.getByText(/Единая модель данных/i)).toBeInTheDocument();
    expect(screen.getByText(/Публикация в один клик/i)).toBeInTheDocument();
  });
});
