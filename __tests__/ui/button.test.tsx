import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@/components/ui/button';

describe('Button', () => {
    it('renders button with default props', () => {
        render(<Button>Click me</Button>);
        
        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent('Click me');
    });

    it('applies different variants correctly', () => {
        const { rerender } = render(<Button variant="default">Default</Button>);
        let button = screen.getByRole('button');
        expect(button).toHaveClass('bg-primary', 'text-primary-foreground');
        
        rerender(<Button variant="outline">Outline</Button>);
        button = screen.getByRole('button');
        expect(button).toHaveClass('border', 'bg-background');
        
        rerender(<Button variant="secondary">Secondary</Button>);
        button = screen.getByRole('button');
        expect(button).toHaveClass('bg-secondary', 'text-secondary-foreground');
        
        rerender(<Button variant="destructive">Destructive</Button>);
        button = screen.getByRole('button');
        expect(button).toHaveClass('bg-destructive', 'text-white');
        
        rerender(<Button variant="ghost">Ghost</Button>);
        button = screen.getByRole('button');
        expect(button).toHaveClass('hover:bg-accent');
        
        rerender(<Button variant="link">Link</Button>);
        button = screen.getByRole('button');
        expect(button).toHaveClass('text-primary', 'underline-offset-4');
    });

    it('applies different sizes correctly', () => {
        const { rerender } = render(<Button size="default">Default</Button>);
        let button = screen.getByRole('button');
        expect(button).toHaveClass('h-9', 'px-4');
        
        rerender(<Button size="sm">Small</Button>);
        button = screen.getByRole('button');
        expect(button).toHaveClass('h-8', 'px-3');
        
        rerender(<Button size="lg">Large</Button>);
        button = screen.getByRole('button');
        expect(button).toHaveClass('h-10', 'px-6');
        
        rerender(<Button size="icon">Icon</Button>);
        button = screen.getByRole('button');
        expect(button).toHaveClass('size-9');
    });

    it('handles click events', () => {
        const handleClick = jest.fn();
        render(<Button onClick={handleClick}>Click me</Button>);
        
        const button = screen.getByRole('button');
        fireEvent.click(button);
        
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('applies disabled styling when disabled', () => {
        render(<Button disabled>Disabled</Button>);
        
        const button = screen.getByRole('button');
        expect(button).toBeDisabled();
        expect(button).toHaveClass('disabled:pointer-events-none', 'disabled:opacity-50');
    });

    it('forwards ref correctly', () => {
        const ref = jest.fn();
        render(<Button ref={ref}>Ref Button</Button>);
        
        expect(ref).toHaveBeenCalled();
    });

    it('applies custom className', () => {
        render(<Button className="custom-class">Custom</Button>);
        
        const button = screen.getByRole('button');
        expect(button).toHaveClass('custom-class');
    });

    it('handles different button types', () => {
        const { rerender } = render(<Button type="submit">Submit</Button>);
        let button = screen.getByRole('button');
        expect(button).toHaveAttribute('type', 'submit');
        
        rerender(<Button type="reset">Reset</Button>);
        button = screen.getByRole('button');
        expect(button).toHaveAttribute('type', 'reset');
        
        rerender(<Button type="button">Button</Button>);
        button = screen.getByRole('button');
        expect(button).toHaveAttribute('type', 'button');
    });

    it('renders with icon and text', () => {
        const TestIcon = () => <svg data-testid="icon" />;
        
        render(
            <Button>
                <TestIcon />
                Button Text
            </Button>
        );
        
        const button = screen.getByRole('button');
        const icon = screen.getByTestId('icon');
        
        expect(button).toHaveTextContent('Button Text');
        expect(icon).toBeInTheDocument();
    });
});



