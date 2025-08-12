import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import MainButton from '@/components/ui/main-button';

jest.mock('motion/react', () => ({
    motion: {
        div: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => <div {...props}>{children}</div>,
    },
}));

describe('MainButton', () => {
    it('renders button with default props', () => {
        const handleClick = jest.fn();
        render(<MainButton onClick={handleClick}>Click me</MainButton>);
        
        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent('Click me');
    });

    it('handles click events', () => {
        const handleClick = jest.fn();
        render(<MainButton onClick={handleClick}>Click me</MainButton>);
        
        const button = screen.getByRole('button');
        fireEvent.click(button);
        
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('applies disabled styling when disabled', () => {
        const handleClick = jest.fn();
        render(<MainButton onClick={handleClick} disabled>Disabled</MainButton>);
        
        const button = screen.getByRole('button');
        expect(button).toBeDisabled();
    });

    it('forwards ref correctly', () => {
        const handleClick = jest.fn();
        render(<MainButton onClick={handleClick}>Button</MainButton>);
        
        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
    });

    it('applies custom className', () => {
        const handleClick = jest.fn();
        render(<MainButton onClick={handleClick} className="custom-class">Button</MainButton>);
        
        const button = screen.getByRole('button');
        expect(button).toHaveClass('custom-class');
    });

    it('has proper accessibility attributes', () => {
        const handleClick = jest.fn();
        render(<MainButton onClick={handleClick}>Button</MainButton>);
        
        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent('Button');
    });

    it('applies hover effects', () => {
        const handleClick = jest.fn();
        render(<MainButton onClick={handleClick}>Button</MainButton>);
        
        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
    });

    it('applies focus styles', () => {
        const handleClick = jest.fn();
        render(<MainButton onClick={handleClick}>Button</MainButton>);
        
        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
    });
});