import React from 'react'
import { FaGithub } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="w-full py-4 mt-8 border-t border-theme">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center space-x-2 text-theme/70">
          <span>Created by Latif</span>
          <a
            href="https://github.com/l4tif"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors duration-200"
          >
            <FaGithub size={20} />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
