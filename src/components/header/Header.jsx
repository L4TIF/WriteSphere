import React from 'react'
import { Container, Logoutbtn } from '../index'
import { useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useTheme } from '../../utils/ThemeContext'

const Header = () => {
  const isLoggedIn = useSelector(state => state.auth.status);
  const userData = useSelector(state => state.auth.userData);
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

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

  return (
    <header className='py-4 shadow bg-theme border-b border-theme'>
      <Container>
        <nav className='md:flex items-center'>
          <div className='mr-4'>
            <Link to='/'>
              <p className='text-3xl text-center md:text-start font-bold text-primary'>WriteSphere</p>
            </Link>
          </div>
          <ul className='flex ml-auto justify-center items-center'>
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
                <Logoutbtn />
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
        </nav>
      </Container>
    </header>
  )
}

export default Header