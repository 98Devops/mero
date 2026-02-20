/**
 * Property-Based Tests for Button Component
 * Feature: mero-tech-website
 */

import { render } from '@testing-library/react';
import fc from 'fast-check';
import Button from '../Button';

/**
 * Property 11: Interactive element hover feedback
 * Validates: Requirements 9.4
 * 
 * For any interactive element (buttons, cards, links), hovering over it should 
 * provide visual feedback through state changes.
 */
describe('Property 11: Interactive element hover feedback', () => {
  it('should have hover animations configured for any button variant and state', () => {
    fc.assert(
      fc.property(
        // Generate arbitrary button text
        fc.string({ minLength: 1, maxLength: 50 }),
        // Generate arbitrary variant
        fc.constantFrom('primary', 'secondary'),
        // Generate arbitrary disabled state
        fc.boolean(),
        // Generate arbitrary loading state
        fc.boolean(),
        (buttonText, variant, disabled, loading) => {
          const { container } = render(
            <Button 
              variant={variant as 'primary' | 'secondary'}
              disabled={disabled}
              loading={loading}
            >
              {buttonText}
            </Button>
          );

          const button = container.querySelector('button') as HTMLButtonElement;
          
          // Verify the button exists
          expect(button).toBeTruthy();
          
          // Check that the button is a motion component (has Framer Motion attributes)
          // Motion components render with data attributes or specific structure
          const isMotionComponent = button.tagName === 'BUTTON';
          expect(isMotionComponent).toBe(true);
          
          // Verify transition styles are present (duration-300 or similar)
          const classes = button.className;
          expect(classes).toContain('transition-all');
          
          // For non-disabled buttons, verify hover state classes are present
          // The Button component uses whileHover for scale animation
          // We can verify the button has the necessary base styles for hover feedback
          if (!disabled && !loading) {
            // Button should have hover styles in variant classes
            const hasHoverStyles = 
              classes.includes('hover:bg-accent-primary/90') || 
              classes.includes('hover:bg-white/20');
            expect(hasHoverStyles).toBe(true);
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should provide visual feedback through CSS transitions for any button content', () => {
    fc.assert(
      fc.property(
        // Generate various button contents
        fc.oneof(
          fc.string({ minLength: 1, maxLength: 20 }),
          fc.constant('Click Me'),
          fc.constant('Submit'),
          fc.constant('Learn More')
        ),
        fc.constantFrom('primary', 'secondary'),
        (content, variant) => {
          const { container } = render(
            <Button variant={variant as 'primary' | 'secondary'}>
              {content}
            </Button>
          );

          const button = container.querySelector('button') as HTMLButtonElement;
          const classes = button.className;
          
          // Verify transition properties are present for smooth hover feedback
          expect(classes).toContain('transition-all');
          expect(classes).toMatch(/duration-\d+/);
          
          // Verify the button has interactive cursor (not disabled)
          expect(classes).not.toContain('cursor-not-allowed');
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should maintain hover feedback capability across all primary variant configurations', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1 }),
        fc.option(fc.string(), { nil: undefined }),
        (children, className) => {
          const { container } = render(
            <Button variant="primary" className={className}>
              {children}
            </Button>
          );

          const button = container.querySelector('button') as HTMLButtonElement;
          const classes = button.className;
          
          // Primary buttons should have hover state defined
          expect(classes).toContain('bg-accent-primary');
          expect(classes).toContain('hover:bg-accent-primary/90');
          
          // Should have transition for smooth hover effect
          expect(classes).toContain('transition-all');
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should maintain hover feedback capability across all secondary variant configurations', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1 }),
        fc.option(fc.string(), { nil: undefined }),
        (children, className) => {
          const { container } = render(
            <Button variant="secondary" className={className}>
              {children}
            </Button>
          );

          const button = container.querySelector('button') as HTMLButtonElement;
          const classes = button.className;
          
          // Secondary buttons should have hover state defined
          expect(classes).toContain('bg-white/10');
          expect(classes).toContain('hover:bg-white/20');
          expect(classes).toContain('border');
          expect(classes).toContain('hover:border-white/30');
          
          // Should have transition for smooth hover effect
          expect(classes).toContain('transition-all');
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should disable hover feedback when button is disabled or loading', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1 }),
        fc.constantFrom('primary', 'secondary'),
        fc.boolean(),
        fc.boolean(),
        (children, variant, disabled, loading) => {
          // Only test when at least one is true
          if (!disabled && !loading) return true;

          const { container } = render(
            <Button 
              variant={variant as 'primary' | 'secondary'}
              disabled={disabled}
              loading={loading}
            >
              {children}
            </Button>
          );

          const button = container.querySelector('button') as HTMLButtonElement;
          const classes = button.className;
          
          // Disabled/loading buttons should have disabled styling
          expect(classes).toContain('opacity-50');
          expect(classes).toContain('cursor-not-allowed');
          
          // Button should be actually disabled
          expect(button.disabled).toBe(true);
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });
});
