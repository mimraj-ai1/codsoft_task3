import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import CourseDetail from './CourseDetail';
import { Auth0Provider } from '@auth0/auth0-react'; // Navbar probably uses this

// Provide a mock user sync component if it's imported globally or mock Auth0
vi.mock('@auth0/auth0-react', () => ({
  Auth0Provider: ({ children }) => <div>{children}</div>,
  useAuth0: () => ({
    isAuthenticated: false,
    user: null,
    loginWithRedirect: vi.fn(),
    logout: vi.fn(),
  })
}));

describe('CourseDetail Component', () => {
  it('renders the course title based on the URL parameter', () => {
    // Render the component within MemoryRouter to simulate the /course/java URL
    render(
      <Auth0Provider>
        <MemoryRouter initialEntries={['/course/java']}>
          <Routes>
            {/* The component expects a route with :courseId */}
            <Route path="/course/:courseId" element={<CourseDetail />} />
          </Routes>
        </MemoryRouter>
      </Auth0Provider>
    );

    // Act & Assert
    // Check if the title text "Java Programming Course" is present
    expect(screen.getByText('Java Programming Course')).toBeInTheDocument();
  });

  it('renders a list of course modules', () => {
    // Use 'react' as the courseId to test rendering multiple modules
    render(
      <Auth0Provider>
        <MemoryRouter initialEntries={['/course/react']}>
          <Routes>
            <Route path="/course/:courseId" element={<CourseDetail />} />
          </Routes>
        </MemoryRouter>
      </Auth0Provider>
    );
    
    // Check if generic expected text from the JSON injection is found:
    expect(screen.getByText('01. What is React JS')).toBeInTheDocument();
  });
});
