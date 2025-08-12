import { cn } from '@/lib/utils';

describe('Utils', () => {
    describe('cn function', () => {
        it('combines class names correctly', () => {
            const result = cn('class1', 'class2');
            expect(result).toBe('class1 class2');
        });

        it('handles conditional classes', () => {
            const isActive = true;
            const result = cn('base-class', isActive && 'active-class');
            expect(result).toBe('base-class active-class');
        });

        it('handles false conditional classes', () => {
            const isActive = false;
            const result = cn('base-class', isActive && 'active-class');
            expect(result).toBe('base-class');
        });

        it('handles undefined and null values', () => {
            const result = cn('base-class', undefined, null, 'valid-class');
            expect(result).toBe('base-class valid-class');
        });

        it('handles empty strings', () => {
            const result = cn('base-class', '', 'valid-class');
            expect(result).toBe('base-class valid-class');
        });

        it('handles arrays of classes', () => {
            const result = cn(['class1', 'class2'], 'class3');
            expect(result).toBe('class1 class2 class3');
        });

        it('handles objects with boolean values', () => {
            const result = cn('base-class', {
                'active-class': true,
                'inactive-class': false,
                'conditional-class': true,
            });
            expect(result).toBe('base-class active-class conditional-class');
        });

        it('handles mixed input types', () => {
            const isActive = true;
            const classes = ['array-class1', 'array-class2'];
            const conditionalClasses = {
                'object-class': true,
                'false-class': false,
            };
            
            const result = cn(
                'base-class',
                isActive && 'conditional-class',
                classes,
                conditionalClasses
            );
            
            expect(result).toBe('base-class conditional-class array-class1 array-class2 object-class');
        });

        it('handles complex conditional logic', () => {
            const userRole = 'admin';
            const isLoggedIn = true;
            const theme = 'dark';
            
            const result = cn(
                'base-button',
                userRole === 'admin' && 'admin-button',
                isLoggedIn && 'logged-in',
                theme === 'dark' ? 'dark-theme' : 'light-theme'
            );
            
            expect(result).toBe('base-button admin-button logged-in dark-theme');
        });

        it('handles empty input', () => {
            const result = cn();
            expect(result).toBe('');
        });

        it('handles single class', () => {
            const result = cn('single-class');
            expect(result).toBe('single-class');
        });

        it('handles whitespace in class names', () => {
            const result = cn('  class1  ', '  class2  ');
            expect(result).toBe('class1 class2');
        });

        it('handles duplicate classes', () => {
            const result = cn('class1', 'class1', 'class2');
            expect(result).toBe('class1 class1 class2');
        });
    });
});









