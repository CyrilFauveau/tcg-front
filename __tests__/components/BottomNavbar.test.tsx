import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import BottomNavbar from '@/components/shared/BottomNavbar';

jest.mock('next/navigation', () => ({
    usePathname: () => '/',
}));

jest.mock('next/link', () => {
    return function MockLink({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) {
        return <a href={href} {...props}>{children}</a>;
    };
});

describe('BottomNavbar', () => {
    it('has correct navigation links', () => {
        render(<BottomNavbar />);
        
        const links = document.querySelectorAll('a');
        const hrefs = Array.from(links).map(link => link.getAttribute('href'));
        
        expect(hrefs).toContain('/');
        expect(hrefs).toContain('/collection');
        expect(hrefs).toContain('/community');
        expect(hrefs).toContain('/fight');
        expect(hrefs).toContain('/parameters');
    });

    it('renders navigation icons', () => {
        render(<BottomNavbar />);
        
        const icons = document.querySelectorAll('svg');
        expect(icons.length).toBe(5);
    });

    it('navigation items are clickable', () => {
        render(<BottomNavbar />);
        
        const links = document.querySelectorAll('a');
        
        expect(links.length).toBe(5);
        links.forEach(link => {
        expect(link).not.toBeDisabled();
        });
    });

    it('shows active state for current page', () => {
        render(<BottomNavbar />);

        const homeLink = document.querySelector('a[href="/"]');
        expect(homeLink).toHaveClass('font-bold');
    });
});