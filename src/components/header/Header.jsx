import React from 'react'
import { Container, Logoutbtn } from '../index'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';



const Header = () => {
  const isLoggedIn = useSelector(state => state.auth.status);
  const userData = useSelector(state => state.auth.userData);
  console.log(userData);

  const navigate = useNavigate();
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
      name: "All Posts",
      slug: "/all-posts",
      active: isLoggedIn,
    },
    {
      name: "Add Posts",
      slug: "/add-post",
      active: isLoggedIn,
    },
  ]
  return (
    <>
      <header className='py-4 shadow bg-gray-100'>
        <Container>
          <nav className='md:flex  items-center'>
            <div className='mr-4 '>
              <Link to='/'>
                <p className='text-3xl text-center md:text-start font-bold text-blue-600'>WriteSphere</p>
              </Link>
            </div>
            <ul className='flex ml-auto justify-center items-center '>
              {navItems.map(item => (
                item.active ?
                  (<li key={item.name}>
                    <button className={`py-2  px-3  cursor-pointer ${item.name === 'Sign up' && `font-semibold rounded-sm ml-2 bg-blue-600 text-white `}`} onClick={
                      () =>
                        navigate(item.slug)
                    }>{item.name}</button>
                  </li>) : null
              ))}
              {isLoggedIn && (<li className='py-2 text-green-700 px-3'>User: {userData.name.toUpperCase()}</li>)}

              {isLoggedIn && (<li className='py-2  px-3'><Logoutbtn /></li>)}
            </ul>
          </nav>

        </Container>

      </header>
    </>
  )
}

export default Header