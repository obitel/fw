import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Hero } from "@/components/sections/hero";

describe("Hero", () => {
  it("renders headline and primary actions", () => {
    render(<Hero />);

    expect(
      screen.getByRole("heading", {
        name: /FW Visual Flow Studio — среда, где интерфейсы собираются мышью/i,
      })
    ).toBeInTheDocument();

    expect(screen.getByRole("button", { name: /Запросить демо/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Скачать презентацию/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Изучить документацию/i })).toBeInTheDocument();
  });
});
