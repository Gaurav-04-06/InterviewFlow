import { Link, useLocation } from "react-router";
import { BookOpenIcon, LayoutDashboardIcon, SparklesIcon } from "lucide-react";
import { UserButton, useUser } from "@clerk/clerk-react";
import { toast } from "react-hot-toast";
import { useState } from "react";

function Navbar() {
  const location = useLocation();
  // const navigate = useNavigate();
  const { isSignedIn, isLoaded } = useUser();

  const [theme, setTheme] = useState("dark");

  const handleThemeChange = (e) => {
    const newTheme = e.target.checked ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const isActive = (path) => location.pathname === path;

  const handleProblem = (e) => {
    if (isLoaded && !isSignedIn) {
      e.preventDefault(); // stops the Link from navigating
      toast.error("Please sign in to access the Problems page.");
    }
  };

  const handleDashboard = (e) => {
    if (isLoaded && !isSignedIn) {
      e.preventDefault();
      toast.error("Please sign in to access the Dashboard page.");
    }
  };

  return (
    <nav className='bg-base-100/80 backdrop-blur-md border-b border-primary/20 sticky top-0 z-50 shadow-lg'>
      <div className='max-w-7xl mx-auto p-4 flex items-center justify-between'>
        {/* LOGO */}
        <Link
          to='/'
          className='group flex items-center gap-3 hover:scale-105 transition-transform duration-200'>
          <div className='size-10 rounded-xl bg-gradient-to-r from-primary via-secondary to-accent flex items-center justify-center shadow-lg'>
            <SparklesIcon className='size-6 text-white' />
          </div>

          <div className='flex flex-col'>
            <span className='font-black text-xl bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent font-mono tracking-wider'>
              InterviewFlow
            </span>
            <span className='text-xs text-base-content/60 font-medium -mt-1'>
              Code Together
            </span>
          </div>
        </Link>

        <div className='flex items-center gap-1'>
          {/* PROBLEMS PAGE LINK */}
          <Link
            onClick={handleProblem}
            to='/problems'
            className={`px-4 py-2.5 rounded-lg transition-all duration-200 ${
              isActive("/problems")
                ? "bg-primary text-primary-content"
                : "hover:bg-base-200 text-base-content/70 hover:text-base-content"
            }`}>
            <div className='flex items-center gap-x-2.5'>
              <BookOpenIcon className='size-4' />
              <span className='font-medium hidden sm:inline'>Problems</span>
            </div>
          </Link>

          {/* DASHBOARD PAGE LINK */}
          <Link
            onClick={handleDashboard}
            to='/dashboard'
            className={`px-4 py-2.5 rounded-lg transition-all duration-200 ${
              isActive("/dashboard")
                ? "bg-primary text-primary-content"
                : "hover:bg-base-200 text-base-content/70 hover:text-base-content"
            }`}>
            <div className='flex items-center gap-x-2.5'>
              <LayoutDashboardIcon className='size-4' />
              <span className='font-medium hidden sm:inline'>Dashboard</span>
            </div>
          </Link>

          {/* THEME TOGGLE */}
          <div className='ml-4 mt-2'>
            <label className='flex cursor-pointer gap-2'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='20'
                height='20'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'>
                <circle cx='12' cy='12' r='5' />
                <path d='M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4' />
              </svg>
              <input
                type='checkbox'
                value='synthwave'
                checked={theme === "dark"}
                onChange={handleThemeChange}
                className='toggle theme-controller'
              />
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='20'
                height='20'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'>
                <path d='M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z'></path>
              </svg>
            </label>
          </div>

          {/* USER BUTTON */}
          <div className='ml-4 mt-2'>
            <UserButton />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
