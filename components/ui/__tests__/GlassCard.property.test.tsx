/**
 * Property-Based Tests for GlassCard Component
 * Feature: mero-tech-website
 */

import { render } from '@testing-library/react';
import fc from 'fast-check';
import GlassCard from '../GlassCard';

/**
 * Property 10: Glass card styling consistency
 * Validates: Requirements 8.2
 * 
 * For any glass card component rendered on the website, it should have 
 * glassmorphism styling properties (semi-transparent background, backdrop blur, 
 * and subtle border).
 */
describe('Property 10: Glass card styling consistency', () => {
  it('should have glassmorphism styling properties for any content and props', () => {
    fc.assert(
      fc.property(
        // Generate arbitrary content strings
        fc.string(),
        // Generate arbitrary className strings
        fc.option(fc.string(), { nil: undefined }),
        // Generate arbitrary hoverEffect boolean
        fc.boolean(),
        (content, className, hoverEffect) => {
          const { container } = render(
            <GlassCard className={className} hoverEffect={hoverEffect}>
              {content}
            </GlassCard>
          );

          // Get the rendered element (either motion.div or div)
          const glassCard = container.firstChild as HTMLElement;
          
          // Verify the element exists
          expect(glassCard).toBeTruthy();
          
          // Check for glassmorphism styling properties in className
          const classes = glassCard.className;
          
          // Property 1: Semi-transparent background (bg-white/5)
          expect(classes).toContain('bg-white/5');
          
          // Property 2: Backdrop blur (backdrop-blur-lg)
          expect(classes).toContain('backdrop-blur-lg');
          
          // Property 3: Subtle border (border border-white/10)
          expect(classes).toContain('border');
          expect(classes).toContain('border-white/10');
          
          // Property 4: Rounded corners (rounded-xl)
          expect(classes).toContain('rounded-xl');
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should maintain glassmorphism styling regardless of custom className', () => {
    fc.assert(
      fc.property(
        // Generate various custom classNames that might conflict
        fc.oneof(
          fc.constant(''),
          fc.constant('p-4'),
          fc.constant('m-2 p-6'),
          fc.constant('bg-red-500'), // Potential conflict
          fc.constant('border-blue-500'), // Potential conflict
          fc.string({ minLength: 0, maxLength: 50 })
        ),
        fc.boolean(),
        (customClassName, hoverEffect) => {
          const { container } = render(
            <GlassCard className={customClassName} hoverEffect={hoverEffect}>
              <div>Test Content</div>
            </GlassCard>
          );

          const glassCard = container.firstChild as HTMLElement;
          const classes = glassCard.className;
          
          // Core glassmorphism properties must always be present
          expect(classes).toContain('bg-white/5');
          expect(classes).toContain('backdrop-blur-lg');
          expect(classes).toContain('border');
          expect(classes).toContain('border-white/10');
          expect(classes).toContain('rounded-xl');
          
          // Custom className should also be present if provided
          if (customClassName && customClassName.trim()) {
            expect(classes).toContain(customClassName);
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should have glassmorphism styling with or without hover effect', () => {
    fc.assert(
      fc.property(
        fc.boolean(),
        (hoverEffect) => {
          const { container } = render(
            <GlassCard hoverEffect={hoverEffect}>
              <p>Content</p>
            </GlassCard>
          );

          const glassCard = container.firstChild as HTMLElement;
          const classes = glassCard.className;
          
          // Glassmorphism styling must be present regardless of hoverEffect
          expect(classes).toContain('bg-white/5');
          expect(classes).toContain('backdrop-blur-lg');
          expect(classes).toContain('border');
          expect(classes).toContain('border-white/10');
          expect(classes).toContain('rounded-xl');
        }
      ),
      { numRuns: 100 }
    );
  });
});
