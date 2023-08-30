import { render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import Greeting from "./Greeting";

describe("Greeting Component", () => {
    test('renders hello world as a text', () => {
        render(<Greeting />);

        const textElement = screen.getByText(/hello world/i);
        expect(textElement).toBeInTheDocument();
    });

    test('text before button clicked', () => {
        render(<Greeting />);

        const textElement = screen.getByText(/good to see you/i);
        expect(textElement).toBeInTheDocument();
    });

    test('text after button clicked', () => {
        render(<Greeting />);
        const buttonElement = screen.getByText(/Change text!/i);
        buttonElement.click();

        const changedText = screen.getByText(/Changed/i);
        expect(changedText).toBeInTheDocument();
    });

    test('text after button clicked, alternate teacher soln', () => {
        render(<Greeting />);
        const buttonElement = screen.getByRole('button');
        userEvent.click(buttonElement);

        const changedText = screen.getByText("Changed");
        expect(changedText).toBeInTheDocument();
    });

    test('text "good to see you" gone after click', () => {
        render(<Greeting />);
        const buttonElement = screen.getByRole('button');
        userEvent.click(buttonElement);

        const textElement = screen.queryByText(/good to see you/i);
        expect(textElement).toBeNull();
    });
});
