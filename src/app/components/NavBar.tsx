import Link from "next/link"
import AutoStoriesIcon from '@mui/icons-material/AutoStories';

export default function Component() {
  return (
    <header className="flex h-20 w-full items-center px-4 md:px-6 fixed top-0 z-50">
      <Link className="mr-6" href="#">
        <AutoStoriesIcon style={{ fontSize: 40 }}/>
        <span className="sr-only">Logo</span>
      </Link>
      <nav className="flex gap-6">
        <Link
          className="text-sm font-medium transition-colors hover:text-gray-900 focus:outline-none focus:text-gray-900 dark:hover:text-gray-50 dark:focus:text-gray-50"
          href="/journal"
        >
          Journal
        </Link>
        <Link
          className="text-sm font-medium transition-colors hover:text-gray-900 focus:outline-none focus:text-gray-900 dark:hover:text-gray-50 dark:focus:text-gray-50"
          href="/reflect"
        >
          Reflect
        </Link>
        <Link
          className="text-sm font-medium transition-colors hover:text-gray-900 focus:outline-none focus:text-gray-900 dark:hover:text-gray-50 dark:focus:text-gray-50"
          href="/faq"
        >
          FAQ
        </Link>
      </nav>
    </header>
  )
}
