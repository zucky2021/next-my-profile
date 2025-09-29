import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { usePathname } from 'next/navigation';
import Navigation from './Navigation';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

// Mock next/link
jest.mock('next/link', () => {
  return function MockLink({ children, href, ...props }: any) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  };
});

const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>;

describe('Navigation Component', () => {
  beforeEach(() => {
    // Reset mocks before each test
    mockUsePathname.mockClear();
    // Set NODE_ENV to test by default
    process.env.NODE_ENV = 'test';
  });

  afterEach(() => {
    // Clean up environment variables
    delete process.env.NODE_ENV;
  });

  describe('Basic Rendering', () => {
    test('renders navigation component with correct structure', () => {
      mockUsePathname.mockReturnValue('/');
      render(<Navigation />);
      
      expect(screen.getByRole('navigation')).toBeInTheDocument();
      expect(screen.getByTestId('header-navigation')).toBeInTheDocument();
      expect(screen.getByTestId('header-logo')).toBeInTheDocument();
    });

    test('renders logo with correct text and href', () => {
      mockUsePathname.mockReturnValue('/');
      render(<Navigation />);
      
      const logo = screen.getByTestId('header-logo');
      expect(logo).toHaveTextContent('鈴木 宏尭');
      expect(logo).toHaveAttribute('href', '/');
    });

    test('renders all navigation items', () => {
      mockUsePathname.mockReturnValue('/');
      render(<Navigation />);
      
      expect(screen.getByText('ホーム')).toBeInTheDocument();
      expect(screen.getByText('経歴')).toBeInTheDocument();
      expect(screen.getByText('自己PR')).toBeInTheDocument();
      expect(screen.getByText('趣味')).toBeInTheDocument();
    });

    test('renders desktop navigation with correct ARIA label', () => {
      mockUsePathname.mockReturnValue('/');
      render(<Navigation />);
      
      const desktopNav = screen.getByLabelText('デスクトップナビゲーション');
      expect(desktopNav).toBeInTheDocument();
      expect(desktopNav).toHaveClass('hidden', 'md:flex');
    });

    test('renders mobile menu button with correct initial state', () => {
      mockUsePathname.mockReturnValue('/');
      render(<Navigation />);
      
      const menuButton = screen.getByRole('button', { name: 'モバイルメニューを開く' });
      expect(menuButton).toBeInTheDocument();
      expect(menuButton).toHaveAttribute('aria-expanded', 'false');
      expect(menuButton).toHaveAttribute('aria-controls', 'mobile-menu');
    });
  });

  describe('Environment Badge', () => {
    test('shows development badge when NODE_ENV is development', () => {
      process.env.NODE_ENV = 'development';
      mockUsePathname.mockReturnValue('/');
      render(<Navigation />);
      
      expect(screen.getByText('development')).toBeInTheDocument();
      expect(screen.getByText('development')).toHaveClass('bg-sky-400');
    });

    test('does not show badge when NODE_ENV is not development', () => {
      process.env.NODE_ENV = 'production';
      mockUsePathname.mockReturnValue('/');
      render(<Navigation />);
      
      expect(screen.queryByText('development')).not.toBeInTheDocument();
      expect(screen.queryByText('production')).not.toBeInTheDocument();
    });

    test('does not show badge when NODE_ENV is test', () => {
      process.env.NODE_ENV = 'test';
      mockUsePathname.mockReturnValue('/');
      render(<Navigation />);
      
      expect(screen.queryByText('test')).not.toBeInTheDocument();
    });
  });

  describe('Active State Logic', () => {
    test('marks home as active when on home page', () => {
      mockUsePathname.mockReturnValue('/');
      render(<Navigation />);
      
      const homeLinks = screen.getAllByText('ホーム');
      homeLinks.forEach(link => {
        expect(link).toHaveAttribute('aria-current', 'page');
        expect(link).toHaveClass('bg-blue-50', 'text-blue-600');
      });
    });

    test('does not mark home as active when on subpages', () => {
      mockUsePathname.mockReturnValue('/career');
      render(<Navigation />);
      
      const homeLinks = screen.getAllByText('ホーム');
      homeLinks.forEach(link => {
        expect(link).not.toHaveAttribute('aria-current', 'page');
        expect(link).toHaveClass('text-gray-700', 'hover:bg-gray-50');
      });
    });

    test('marks career as active when on career page', () => {
      mockUsePathname.mockReturnValue('/career');
      render(<Navigation />);
      
      const careerLinks = screen.getAllByText('経歴');
      careerLinks.forEach(link => {
        expect(link).toHaveAttribute('aria-current', 'page');
        expect(link).toHaveClass('bg-blue-50', 'text-blue-600');
      });
    });

    test('marks career as active when on career subpages', () => {
      mockUsePathname.mockReturnValue('/career/experience');
      render(<Navigation />);
      
      const careerLinks = screen.getAllByText('経歴');
      careerLinks.forEach(link => {
        expect(link).toHaveAttribute('aria-current', 'page');
        expect(link).toHaveClass('bg-blue-50', 'text-blue-600');
      });
    });

    test('marks self-pr as active when on self-pr page', () => {
      mockUsePathname.mockReturnValue('/self-pr');
      render(<Navigation />);
      
      const selfPrLinks = screen.getAllByText('自己PR');
      selfPrLinks.forEach(link => {
        expect(link).toHaveAttribute('aria-current', 'page');
        expect(link).toHaveClass('bg-blue-50', 'text-blue-600');
      });
    });

    test('marks hobbies as active when on hobbies page', () => {
      mockUsePathname.mockReturnValue('/hobbies');
      render(<Navigation />);
      
      const hobbiesLinks = screen.getAllByText('趣味');
      hobbiesLinks.forEach(link => {
        expect(link).toHaveAttribute('aria-current', 'page');
        expect(link).toHaveClass('bg-blue-50', 'text-blue-600');
      });
    });

    test('only marks one section as active at a time', () => {
      mockUsePathname.mockReturnValue('/career');
      render(<Navigation />);
      
      expect(screen.getAllByText('経歴')[0]).toHaveAttribute('aria-current', 'page');
      expect(screen.getAllByText('ホーム')[0]).not.toHaveAttribute('aria-current', 'page');
      expect(screen.getAllByText('自己PR')[0]).not.toHaveAttribute('aria-current', 'page');
      expect(screen.getAllByText('趣味')[0]).not.toHaveAttribute('aria-current', 'page');
    });
  });

  describe('Mobile Menu Functionality', () => {
    test('mobile menu is initially closed', () => {
      mockUsePathname.mockReturnValue('/');
      render(<Navigation />);
      
      const mobileMenu = screen.getByTestId('mobile-menu');
      expect(mobileMenu).toHaveClass('max-h-0', '-translate-y-2', 'opacity-0');
      
      const menuButton = screen.getByRole('button', { name: 'モバイルメニューを開く' });
      expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    });

    test('opens mobile menu when hamburger button is clicked', () => {
      mockUsePathname.mockReturnValue('/');
      render(<Navigation />);
      
      const menuButton = screen.getByRole('button', { name: 'モバイルメニューを開く' });
      fireEvent.click(menuButton);
      
      const mobileMenu = screen.getByTestId('mobile-menu');
      expect(mobileMenu).toHaveClass('max-h-64', 'translate-y-0', 'opacity-100');
      expect(menuButton).toHaveAttribute('aria-expanded', 'true');
      expect(menuButton).toHaveAttribute('aria-label', 'モバイルメニューを閉じる');
    });

    test('closes mobile menu when hamburger button is clicked again', () => {
      mockUsePathname.mockReturnValue('/');
      render(<Navigation />);
      
      const menuButton = screen.getByRole('button', { name: 'モバイルメニューを開く' });
      
      // Open menu
      fireEvent.click(menuButton);
      expect(screen.getByTestId('mobile-menu')).toHaveClass('max-h-64', 'translate-y-0', 'opacity-100');
      
      // Close menu
      fireEvent.click(menuButton);
      expect(screen.getByTestId('mobile-menu')).toHaveClass('max-h-0', '-translate-y-2', 'opacity-0');
      expect(menuButton).toHaveAttribute('aria-expanded', 'false');
      expect(menuButton).toHaveAttribute('aria-label', 'モバイルメニューを開く');
    });

    test('closes mobile menu when a mobile navigation link is clicked', () => {
      mockUsePathname.mockReturnValue('/');
      render(<Navigation />);
      
      const menuButton = screen.getByRole('button', { name: 'モバイルメニューを開く' });
      fireEvent.click(menuButton);
      
      const mobileMenu = screen.getByTestId('mobile-menu');
      expect(mobileMenu).toHaveClass('max-h-64', 'translate-y-0', 'opacity-100');
      
      // Click on a mobile navigation link (second instance of the link)
      const mobileLinks = screen.getAllByText('経歴');
      const mobileLink = mobileLinks.find(link => 
        link.closest('div')?.id === 'mobile-menu'
      );
      
      if (mobileLink) {
        fireEvent.click(mobileLink);
        expect(screen.getByTestId('mobile-menu')).toHaveClass('max-h-0', '-translate-y-2', 'opacity-0');
        expect(menuButton).toHaveAttribute('aria-expanded', 'false');
      }
    });

    test('mobile menu has correct ARIA label', () => {
      mockUsePathname.mockReturnValue('/');
      render(<Navigation />);
      
      const mobileMenu = screen.getByLabelText('モバイルメニュー');
      expect(mobileMenu).toBeInTheDocument();
      expect(mobileMenu).toHaveAttribute('id', 'mobile-menu');
    });

    test('mobile menu items have staggered animation delays', () => {
      mockUsePathname.mockReturnValue('/');
      render(<Navigation />);
      
      const menuButton = screen.getByRole('button', { name: 'モバイルメニューを開く' });
      fireEvent.click(menuButton);
      
      const mobileMenu = screen.getByTestId('mobile-menu');
      const menuItems = within(mobileMenu).getAllByRole('listitem');
      
      expect(menuItems[0]).toHaveStyle('transition-delay: 50ms');
      expect(menuItems[1]).toHaveStyle('transition-delay: 100ms');
      expect(menuItems[2]).toHaveStyle('transition-delay: 150ms');
      expect(menuItems[3]).toHaveStyle('transition-delay: 200ms');
    });
  });

  describe('Hamburger Animation', () => {
    test('hamburger lines have correct classes when menu is closed', () => {
      mockUsePathname.mockReturnValue('/');
      render(<Navigation />);
      
      const menuButton = screen.getByRole('button', { name: 'モバイルメニューを開く' });
      const hamburgerContainer = menuButton.querySelector('div');
      const lines = hamburgerContainer?.querySelectorAll('span');
      
      expect(lines?.[0]).toHaveClass('translate-y-0');
      expect(lines?.[1]).toHaveClass('translate-y-2', 'opacity-100');
      expect(lines?.[2]).toHaveClass('translate-y-4');
    });

    test('hamburger lines transform correctly when menu is opened', () => {
      mockUsePathname.mockReturnValue('/');
      render(<Navigation />);
      
      const menuButton = screen.getByRole('button', { name: 'モバイルメニューを開く' });
      fireEvent.click(menuButton);
      
      const hamburgerContainer = menuButton.querySelector('div');
      const lines = hamburgerContainer?.querySelectorAll('span');
      
      expect(lines?.[0]).toHaveClass('translate-y-2', 'rotate-45');
      expect(lines?.[1]).toHaveClass('opacity-0');
      expect(lines?.[2]).toHaveClass('translate-y-2', '-rotate-45');
    });
  });

  describe('Navigation Links Structure', () => {
    test('all navigation links have correct hrefs', () => {
      mockUsePathname.mockReturnValue('/');
      render(<Navigation />);
      
      expect(screen.getAllByText('ホーム')[0]).toHaveAttribute('href', '/');
      expect(screen.getAllByText('経歴')[0]).toHaveAttribute('href', '/career');
      expect(screen.getAllByText('自己PR')[0]).toHaveAttribute('href', '/self-pr');
      expect(screen.getAllByText('趣味')[0]).toHaveAttribute('href', '/hobbies');
    });

    test('navigation links have consistent styling classes', () => {
      mockUsePathname.mockReturnValue('/about');
      render(<Navigation />);
      
      const inactiveLinks = [
        screen.getAllByText('ホーム')[0],
        screen.getAllByText('経歴')[0],
        screen.getAllByText('自己PR')[0],
        screen.getAllByText('趣味')[0]
      ];
      
      inactiveLinks.forEach(link => {
        expect(link).toHaveClass('text-gray-700', 'hover:bg-gray-50', 'hover:text-blue-600');
        expect(link).toHaveClass('rounded-md', 'px-3', 'py-2', 'text-sm', 'font-medium', 'transition-colors');
      });
    });

    test('desktop and mobile navigation have same links with same hrefs', () => {
      mockUsePathname.mockReturnValue('/');
      render(<Navigation />);
      
      const homeLinks = screen.getAllByText('ホーム');
      const careerLinks = screen.getAllByText('経歴');
      const selfPrLinks = screen.getAllByText('自己PR');
      const hobbiesLinks = screen.getAllByText('趣味');
      
      // Should have 2 of each link (desktop and mobile)
      expect(homeLinks).toHaveLength(2);
      expect(careerLinks).toHaveLength(2);
      expect(selfPrLinks).toHaveLength(2);
      expect(hobbiesLinks).toHaveLength(2);
      
      // Both versions should have same href
      expect(homeLinks[0]).toHaveAttribute('href', homeLinks[1].getAttribute('href'));
      expect(careerLinks[0]).toHaveAttribute('href', careerLinks[1].getAttribute('href'));
      expect(selfPrLinks[0]).toHaveAttribute('href', selfPrLinks[1].getAttribute('href'));
      expect(hobbiesLinks[0]).toHaveAttribute('href', hobbiesLinks[1].getAttribute('href'));
    });
  });

  describe('Edge Cases and Error Handling', () => {
    test('handles undefined pathname gracefully', () => {
      mockUsePathname.mockReturnValue(undefined as any);
      
      expect(() => render(<Navigation />)).not.toThrow();
    });

    test('handles empty string pathname', () => {
      mockUsePathname.mockReturnValue('');
      render(<Navigation />);
      
      // Should not mark any items as active
      expect(screen.getAllByText('ホーム')[0]).not.toHaveAttribute('aria-current', 'page');
      expect(screen.getAllByText('経歴')[0]).not.toHaveAttribute('aria-current', 'page');
      expect(screen.getAllByText('自己PR')[0]).not.toHaveAttribute('aria-current', 'page');
      expect(screen.getAllByText('趣味')[0]).not.toHaveAttribute('aria-current', 'page');
    });

    test('handles complex nested paths correctly', () => {
      mockUsePathname.mockReturnValue('/career/experience/frontend');
      render(<Navigation />);
      
      const careerLinks = screen.getAllByText('経歴');
      careerLinks.forEach(link => {
        expect(link).toHaveAttribute('aria-current', 'page');
      });
    });

    test('handles paths with query parameters and fragments', () => {
      mockUsePathname.mockReturnValue('/hobbies?category=music#section1');
      render(<Navigation />);
      
      const hobbiesLinks = screen.getAllByText('趣味');
      hobbiesLinks.forEach(link => {
        expect(link).toHaveAttribute('aria-current', 'page');
      });
    });

    test('handles case-sensitive path matching', () => {
      mockUsePathname.mockReturnValue('/CAREER');
      render(<Navigation />);
      
      // Should not match due to case sensitivity
      const careerLinks = screen.getAllByText('経歴');
      careerLinks.forEach(link => {
        expect(link).not.toHaveAttribute('aria-current', 'page');
      });
    });
  });

  describe('Accessibility Features', () => {
    test('navigation has proper semantic structure', () => {
      mockUsePathname.mockReturnValue('/');
      render(<Navigation />);
      
      const nav = screen.getByRole('navigation');
      expect(nav).toBeInTheDocument();
      
      const lists = screen.getAllByRole('list');
      expect(lists).toHaveLength(2); // Desktop and mobile navigation lists
      
      const listItems = screen.getAllByRole('listitem');
      expect(listItems).toHaveLength(8); // 4 items × 2 (desktop + mobile)
    });

    test('mobile menu button has proper focus management', () => {
      mockUsePathname.mockReturnValue('/');
      render(<Navigation />);
      
      const menuButton = screen.getByRole('button', { name: 'モバイルメニューを開く' });
      expect(menuButton).toHaveClass('focus:ring-2', 'focus:ring-blue-500', 'focus:outline-none');
    });

    test('navigation links have proper ARIA attributes when active', () => {
      mockUsePathname.mockReturnValue('/career');
      render(<Navigation />);
      
      const activeLinks = screen.getAllByText('経歴');
      activeLinks.forEach(link => {
        expect(link).toHaveAttribute('aria-current', 'page');
      });
      
      const inactiveLinks = [
        ...screen.getAllByText('ホーム'),
        ...screen.getAllByText('自己PR'),
        ...screen.getAllByText('趣味')
      ];
      
      inactiveLinks.forEach(link => {
        expect(link).not.toHaveAttribute('aria-current');
      });
    });

    test('mobile menu has proper ARIA relationships', () => {
      mockUsePathname.mockReturnValue('/');
      render(<Navigation />);
      
      const menuButton = screen.getByRole('button', { name: 'モバイルメニューを開く' });
      const mobileMenu = screen.getByTestId('mobile-menu');
      
      expect(menuButton).toHaveAttribute('aria-controls', 'mobile-menu');
      expect(mobileMenu).toHaveAttribute('id', 'mobile-menu');
      expect(mobileMenu).toHaveAttribute('aria-label', 'モバイルメニュー');
    });
  });

  describe('Responsive Design', () => {
    test('desktop navigation has correct responsive classes', () => {
      mockUsePathname.mockReturnValue('/');
      render(<Navigation />);
      
      const desktopNav = screen.getByLabelText('デスクトップナビゲーション');
      expect(desktopNav).toHaveClass('hidden', 'md:flex');
    });

    test('mobile menu button has correct responsive classes', () => {
      mockUsePathname.mockReturnValue('/');
      render(<Navigation />);
      
      const menuButton = screen.getByRole('button', { name: 'モバイルメニューを開く' });
      expect(menuButton).toHaveClass('md:hidden');
    });

    test('mobile menu has correct responsive classes', () => {
      mockUsePathname.mockReturnValue('/');
      render(<Navigation />);
      
      const mobileMenu = screen.getByTestId('mobile-menu');
      expect(mobileMenu).toHaveClass('md:hidden');
    });
  });

  describe('Visual Styling', () => {
    test('navigation has sticky positioning and proper z-index', () => {
      mockUsePathname.mockReturnValue('/');
      render(<Navigation />);
      
      const nav = screen.getByRole('navigation');
      expect(nav).toHaveClass('sticky', 'top-0', 'z-40');
    });

    test('navigation has proper border and background styling', () => {
      mockUsePathname.mockReturnValue('/');
      render(<Navigation />);
      
      const nav = screen.getByRole('navigation');
      expect(nav).toHaveClass('border-b', 'border-gray-200', 'bg-white', 'shadow-sm');
    });

    test('mobile menu has proper shadow and positioning', () => {
      mockUsePathname.mockReturnValue('/');
      render(<Navigation />);
      
      const mobileMenu = screen.getByTestId('mobile-menu');
      expect(mobileMenu).toHaveClass('absolute', 'right-0', 'left-0', 'z-50', 'shadow-lg');
    });

    test('logo has correct font styling', () => {
      mockUsePathname.mockReturnValue('/');
      render(<Navigation />);
      
      const logo = screen.getByTestId('header-logo');
      expect(logo).toHaveClass('font-serif', 'text-xl', 'font-bold', 'text-gray-900');
    });
  });

  describe('Integration with Next.js', () => {
    test('uses Next.js Link component for navigation', () => {
      mockUsePathname.mockReturnValue('/');
      render(<Navigation />);
      
      // The mock should render anchor tags with href attributes
      const homeLink = screen.getAllByText('ホーム')[0];
      expect(homeLink.tagName.toLowerCase()).toBe('a');
      expect(homeLink).toHaveAttribute('href', '/');
    });

    test('correctly uses usePathname hook', () => {
      mockUsePathname.mockReturnValue('/test-path');
      render(<Navigation />);
      
      expect(mockUsePathname).toHaveBeenCalled();
    });
  });
});