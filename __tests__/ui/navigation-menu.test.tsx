import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

describe('NavigationMenu', () => {
    it('renders navigation menu', () => {
        render(
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuLink>Home</NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        );
        
        const menu = screen.getByRole('navigation');
        expect(menu).toBeInTheDocument();
    });

    it('renders navigation menu list', () => {
        render(
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>Item 1</NavigationMenuItem>
                    <NavigationMenuItem>Item 2</NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        );
        
        const menuList = screen.getByRole('list');
        expect(menuList).toBeInTheDocument();
    });

    it('renders navigation menu items', () => {
        render(
            <NavigationMenu>
                <NavigationMenuItem>
                    <NavigationMenuLink>Menu Item</NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenu>
        );
        
        const menuItem = screen.getByRole('listitem');
        expect(menuItem).toBeInTheDocument();
    });

    it('renders navigation menu trigger', () => {
        render(
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Trigger</NavigationMenuTrigger>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        );
        
        const trigger = screen.getByRole('button');
        expect(trigger).toBeInTheDocument();
    });

    it('renders navigation menu content', () => {
        render(
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Trigger</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <div>Content</div>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        );
        
        // Content is not visible by default in Radix UI
        const content = screen.queryByText('Content');
        expect(content).not.toBeInTheDocument();
    });

    it('applies default styling classes', () => {
        render(
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuLink>Home</NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        );
        
        const menu = screen.getByRole('navigation');
        expect(menu).toHaveClass('group/navigation-menu', 'relative', 'flex', 'max-w-max', 'flex-1', 'items-center', 'justify-center');
    });

    it('handles click events on menu items', () => {
        const handleClick = jest.fn();
        render(
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuLink onClick={handleClick}>
                            Clickable Link
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        );
        
        const link = screen.getByText('Clickable Link');
        fireEvent.click(link);
        
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('can be disabled', () => {
        render(
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuLink aria-disabled="true">
                            Disabled Link
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        );
        
        const link = screen.getByText('Disabled Link');
        expect(link).toHaveAttribute('aria-disabled', 'true');
    });

    it('renders with custom className', () => {
        render(
            <NavigationMenu className="custom-menu">
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuLink>Home</NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        );
        
        const menu = screen.getByRole('navigation');
        expect(menu).toHaveClass('custom-menu');
    });

    it('renders with multiple menu items', () => {
        render(
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuLink>Home</NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink>About</NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink>Contact</NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        );
        
        const menuItems = screen.getAllByRole('listitem');
        expect(menuItems).toHaveLength(3);
    });

    it('renders with nested content', () => {
        render(
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Products</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <div>Product List</div>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        );
        
        const trigger = screen.getByRole('button');
        expect(trigger).toBeInTheDocument();
        
        // Content is not visible by default
        const content = screen.queryByText('Product List');
        expect(content).not.toBeInTheDocument();
    });

    it('applies hover effects', () => {
        render(
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuLink>
                            Hover Link
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        );
        
        const link = screen.getByText('Hover Link');
        expect(link).toBeInTheDocument();
    });
});

