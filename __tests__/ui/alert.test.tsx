import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

describe('Alert', () => {
    it('renders alert with default props', () => {
        render(
            <Alert>
                <AlertTitle>Alert Title</AlertTitle>
                <AlertDescription>Alert description</AlertDescription>
            </Alert>
        );
        
        expect(screen.getByText('Alert Title')).toBeInTheDocument();
        expect(screen.getByText('Alert description')).toBeInTheDocument();
    });

    it('applies default alert styling classes', () => {
        render(<Alert>Default Alert</Alert>);
        
        const alert = screen.getByRole('alert');
        expect(alert).toHaveClass('relative', 'w-full', 'rounded-lg');
    });

    it('applies different variants correctly', () => {
        const { rerender } = render(<Alert variant="destructive">Destructive</Alert>);
        
        let alert = screen.getByRole('alert');
        expect(alert).toHaveClass('text-destructive', 'bg-card');
        
        rerender(<Alert variant="default">Default</Alert>);
        alert = screen.getByRole('alert');
        expect(alert).toHaveClass('bg-card', 'text-card-foreground');
    });

    it('renders alert title correctly', () => {
        render(
            <Alert>
                <AlertTitle>Important Notice</AlertTitle>
                <AlertDescription>This is a test alert</AlertDescription>
            </Alert>
        );
        
        const title = screen.getByText('Important Notice');
        expect(title).toHaveClass('col-start-2', 'line-clamp-1', 'min-h-4', 'font-medium', 'tracking-tight');
    });

    it('renders alert description correctly', () => {
        render(<AlertDescription>This is a description</AlertDescription>);
        
        const description = screen.getByText('This is a description');
        expect(description).toHaveClass('text-sm');
    });

    it('can contain custom content', () => {
        render(
            <Alert>
                <div data-testid="custom-content">Custom content</div>
            </Alert>
        );
        
        expect(screen.getByTestId('custom-content')).toBeInTheDocument();
    });

    it('forwards ref correctly', () => {
        const ref = jest.fn();
        render(<Alert ref={ref}>Ref Alert</Alert>);
        
        expect(ref).toHaveBeenCalled();
    });

    it('applies custom className', () => {
        render(<Alert className="custom-class">Custom</Alert>);
        
        const alert = screen.getByRole('alert');
        expect(alert).toHaveClass('custom-class');
    });

    it('has proper accessibility attributes', () => {
        render(<Alert role="alert">Accessible Alert</Alert>);
        
        const alert = screen.getByRole('alert');
        expect(alert).toBeInTheDocument();
    });

    it('renders with icon and text', () => {
        render(
            <Alert>
                <span>Icon</span>
                <AlertTitle>Title with Icon</AlertTitle>
            </Alert>
        );
        
        const alert = screen.getByRole('alert');
        expect(alert).toHaveTextContent('Icon');
        expect(alert).toHaveTextContent('Title with Icon');
    });

    it('handles multiple children correctly', () => {
        render(
            <Alert>
                <AlertTitle>First Title</AlertTitle>
                <AlertDescription>First Description</AlertDescription>
                <AlertTitle>Second Title</AlertTitle>
                <AlertDescription>Second Description</AlertDescription>
            </Alert>
        );
        
        expect(screen.getByText('First Title')).toBeInTheDocument();
        expect(screen.getByText('First Description')).toBeInTheDocument();
        expect(screen.getByText('Second Title')).toBeInTheDocument();
        expect(screen.getByText('Second Description')).toBeInTheDocument();
    });

    it('applies variant-specific colors', () => {
        render(<Alert variant="destructive">Error Alert</Alert>);
        
        const alert = screen.getByRole('alert');
        expect(alert).toHaveClass('text-destructive');
    });
});








