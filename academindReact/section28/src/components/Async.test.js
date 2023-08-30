import { render, screen } from '@testing-library/react';
import Async from "./Async";

describe("Async Component", () => {
    test('renders posts if fetch suceeded (mocked)', async () => {
      window.fetch = jest.fn();
      window.fetch.mockResolvedValueOnce({
        json: async () => {
          return [{
            id: "p1",
            title: "First post"
          }]
        }
      })
      render(<Async />);
      const listItems = await screen.findAllByRole("listitem");
      expect(listItems).not.toHaveLength(0);
    })
})
