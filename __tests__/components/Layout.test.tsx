import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Layout from '@/components/shared/Layout';

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

    it('renders children content', () => {
        render(
            <Layout>
                <div>Test Content</div>
            </Layout>
        );

        const layout = screen.getByText('Test Content').closest('div')?.parentElement?.parentElement;
        expect(layout).toBeInTheDocument();
    });
});
