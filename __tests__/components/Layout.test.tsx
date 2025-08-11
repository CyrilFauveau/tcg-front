import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Layout from '@/components/shared/Layout';

// Mock Next.js navigation
jest.mock('next/navigation', () => ({
    usePathname: () => '/collection',
}));

describe('Layout', () => {
    it('renders layout component', () => {
        render(
            <Layout>
                <div>Test Content</div>
            </Layout>
        );

        const layout = screen.getByText('Test Content').closest('div')?.parentElement?.parentElement;
        expect(layout).toBeInTheDocument();
    });

    it('has proper styling classes', () => {
        render(
            <Layout>
                <div>Test Content</div>
            </Layout>
        );

        const layout = screen.getByText('Test Content').closest('div')?.parentElement?.parentElement;
        expect(layout).toHaveClass('flex', 'flex-col');
    });

    it('renders children content', () => {
        render(
            <Layout>
                <div>Test Content</div>
            </Layout>
        );

        const layout = screen.getByText('Test Content').closest('div')?.parentElement?.parentElement;
        expect(layout).toBeInTheDocument();
    });

    it('has correct content wrapper classes', () => {
        render(
            <Layout>
                <div>Test Content</div>
            </Layout>
        );

        const contentWrapper = screen.getByText('Test Content').parentElement;
        expect(contentWrapper).toHaveClass('grow', 'p-5', 'pb-20');
    });
});
