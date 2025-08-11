import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from '@/components/ui/input';

describe('Input', () => {
    it('renders input with default props', () => {
        render(<Input placeholder="Enter text" />);
        
        const input = screen.getByRole('textbox');
        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute('placeholder', 'Enter text');
    });

    it('applies default input styling classes', () => {
        render(<Input />);
        
        const input = screen.getByRole('textbox');
        expect(input).toHaveClass('flex', 'h-9', 'w-full');
    });

    it('handles value changes', () => {
        render(<Input />);
        
        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: 'new value' } });
        
        expect(input).toHaveValue('new value');
    });

    it('forwards ref correctly', () => {
        const ref = jest.fn();
        render(<Input ref={ref} />);
        
        expect(ref).toHaveBeenCalled();
    });

    it('applies custom className', () => {
        render(<Input className="custom-input" />);
        
        const input = screen.getByRole('textbox');
        expect(input).toHaveClass('custom-input');
    });

    it('handles different input types', () => {
        render(<Input type="email" />);
        
        const input = screen.getByRole('textbox');
        expect(input).toHaveAttribute('type', 'email');
    });

    it('applies disabled styling when disabled', () => {
        render(<Input disabled />);
        
        const input = screen.getByRole('textbox');
        expect(input).toBeDisabled();
        expect(input).toHaveClass('disabled:pointer-events-none', 'disabled:cursor-not-allowed', 'disabled:opacity-50');
    });

    it('handles required attribute', () => {
        render(<Input required />);
        
        const input = screen.getByRole('textbox');
        expect(input).toBeRequired();
    });

    it('handles placeholder text', () => {
        render(<Input placeholder="Enter your name" />);
        
        const input = screen.getByRole('textbox');
        expect(input).toHaveAttribute('placeholder', 'Enter your name');
    });

    it('applies focus styles', () => {
        render(<Input />);
        
        const input = screen.getByRole('textbox');
        expect(input).toHaveClass('focus-visible:ring-ring/50', 'focus-visible:ring-[3px]');
    });

    it('handles aria attributes', () => {
        render(<Input aria-label="Username input" />);
        
        const input = screen.getByRole('textbox');
        expect(input).toHaveAttribute('aria-label', 'Username input');
    });
});



