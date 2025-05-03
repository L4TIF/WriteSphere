import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import authService from './appwrite/auth';
import { login, logout } from './store/authSlice'
import { Header, Footer } from './components'
import { Outlet } from "react-router-dom";




function App() {

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.status) || JSON.parse(localStorage.getItem("isLoggedIn"));
  useEffect(() => {
    if (isLoggedIn)
      authService.getCurrentUser()
        .then((userData) => {
          if (userData) {

            dispatch(login(userData))
            localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
          }
          else
            dispatch(logout())
        }).catch((error) => (console.log(error)))
        .finally(() => setLoading(false))
    else
      setLoading(false)
  }, [isLoggedIn])

  if (loading) return null
  return (
    <>
      <div className="min-h-screen flex flex-wrap  content-between ">
        <div className="w-full  min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </>
  )
}

export default App
