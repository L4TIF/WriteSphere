import React, { useState, useEffect } from 'react'
import { Container, LogoutBtn } from '../index'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useTheme } from '../../utils/ThemeContext'
import { logout } from '../../store/authSlice'

const Header = () => {
  const isLoggedIn = useSelector(state => state.auth.status);
  const userData = useSelector(state => state.auth.userData);
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    }, {
      name: "Log in",
      slug: "/login",
      active: !isLoggedIn,
    },
    {
      name: "Sign up",
      slug: "/signup",
      active: !isLoggedIn,
    },
    {
      name: "My Posts",
      slug: "/my-posts",
      active: isLoggedIn,
    },
    {
      name: "Add Posts",
      slug: "/add-post",
      active: isLoggedIn,
    },
  ]

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  }

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const menu = document.getElementById('mobile-menu');
      const menuButton = document.getElementById('menu-button');

      if (isMenuOpen && menu && !menu.contains(event.target) && !menuButton.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <header className='py-4 shadow bg-theme border-b border-theme'>
      <Container>
        <nav className='flex flex-col justify-center'>
          {/* Top section with logo and mobile menu button */}
          <div className='flex items-center justify-between'>
            <Link to='/'>
              <p className='text-3xl font-bold text-primary'>WriteSphere</p>
            </Link>

            {/* Mobile menu button */}
            <button
              id="menu-button"
              className='md:hidden p-2 rounded-lg hover:bg-theme/80 transition-colors duration-200'
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-6 h-6 text-theme" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>

            {/* Desktop navigation */}
            <ul className='hidden md:flex items-center space-x-4'>
              {navItems.map(item => (
                item.active && (
                  <li key={item.name}>
                    <button
                      className={`
                        py-2 px-3 cursor-pointer transition-colors duration-200
                        ${location.pathname === item.slug
                          ? 'text-primary font-semibold'
                          : 'text-theme/80 hover:text-primary'
                        }
                        ${item.name === 'Sign up' && 'font-semibold rounded-lg ml-2 bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600'}
                      `}
                      onClick={() => navigate(item.slug)}
                    >
                      {item.name}
                    </button>
                  </li>
                )
              ))}
              {isLoggedIn && (
                <li className='py-2 text-green-600 dark:text-green-400 px-3'>
                  User: {userData.name.toUpperCase()}
                </li>
              )}
              {isLoggedIn && (
                <li className='py-2 px-3'>
                  <LogoutBtn />
                </li>
              )}
              <li className='py-2 px-3'>
                <button
                  onClick={toggleTheme}
                  className='p-2 rounded-lg bg-theme border border-theme hover:bg-theme/80 transition-colors duration-200'
                >
                  {theme === 'light' ? '🌙' : '☀️'}
                </button>
              </li>
            </ul>
          </div>

          {/* Mobile navigation */}
          {isMenuOpen && (
            <>
              {/* Backdrop */}
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm md:hidden" />

              {/* Mobile Menu */}
              <div
                id="mobile-menu"
                className="fixed top-0 right-0 h-full w-64 bg-theme shadow-lg transform transition-transform duration-300 ease-in-out md:hidden z-50"
              >
                <div className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-theme">Menu</h2>
                    <button
                      onClick={() => setIsMenuOpen(false)}
                      className="p-2 rounded-lg hover:bg-theme/10 transition-colors duration-200"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-theme" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <ul className="space-y-4">
                    {navItems.map(item => (
                      item.active && (
                        <li key={item.name} className="text-center">
                          <button
                            className={`
                              w-full py-3 px-4 rounded-lg transition-all duration-200
                              ${location.pathname === item.slug
                                ? 'bg-primary text-theme font-semibold'
                                : 'bg-theme/10 text-theme hover:bg-theme/20'
                              }
                              ${item.name === 'Sign up' && 'bg-blue-600 hover:bg-blue-700 text-white font-semibold'}
                            `}
                            onClick={() => {
                              navigate(item.slug);
                              setIsMenuOpen(false);
                            }}
                          >
                            {item.name}
                          </button>
                        </li>
                      )
                    ))}
                    {isLoggedIn && (<>
                      <li className=' text-green-600 dark:text-green-400 text-center py-3 px-4'>
                        User: {userData.name.toUpperCase()}
                      </li>
                      <li className="text-center py-3 px-4">
                        <LogoutBtn />
                      </li>
                    </>
                    )}
                    <li className="text-center">
                      <button
                        onClick={toggleTheme}
                        className="w-full p-3 rounded-lg bg-theme/10 text-theme hover:bg-theme/20 transition-all duration-200 inline-flex items-center justify-center"
                        title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                      >
                        {theme === 'dark' ? (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                          </svg>
                        )}
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </>
          )}
        </nav>
      </Container >
    </header >
  )
}

export default Header