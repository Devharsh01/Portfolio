"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RESUME_URL } from "@/constants/site";

const NavBar = () => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    // first prevent the default behavior
    e.preventDefault();
    // get the href and remove everything before the hash (#)
    const href = e.currentTarget.href;
    const targetId = href.replace(/.*\#/, "");
    // get the element by id and use scrollIntoView
    const elem = document.getElementById(targetId);
    elem?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <nav className={`fixed bottom-10 left-0 right-0 z-50 my-0 mx-auto flex items-center justify-center gap-1 rounded-lg bg-[#07070a]/90 px-1 py-1 text-[#e4ded7] backdrop-blur-md md:p-2 ${
      isHomePage 
        ? "w-[380px] sm:w-[480px] lg:w-[490px]" 
        : "w-[200px] sm:w-[240px] lg:w-[260px]"
    }`}>
      <Link
        href={RESUME_URL}
        target="_blank"
        className="flex"
        aria-label="Open my resume"
        data-blobity-tooltip="View Resume"
        data-blobity-magnetic="false"
      >
        <FontAwesomeIcon
          icon={faFilePdf}
          className="py-2 px-2 text-[16px] sm:px-4 md:py-1"
        />
      </Link>

      {isHomePage ? (
        // Full navigation for home page
        <>
          <Link
            href="#home"
            data-blobity-magnetic="false"
            onClick={handleScroll}
            aria-label="Scroll to Home Section"
          >
            <h4 className="rounded py-2 px-2 sm:px-4 text-[12px] sm:text-[14px] md:py-1 md:px-4">
              Home
            </h4>
          </Link>
          <Link
            href="#work"
            data-blobity-magnetic="false"
            onClick={handleScroll}
            aria-label="Scroll to Work Section"
          >
            <h4 className="rounded py-2 px-2 sm:px-4 text-[12px] sm:text-[14px] md:py-1 md:px-4">
              Work
            </h4>
          </Link>

          <Link
            href="#about"
            data-blobity-magnetic="false"
            onClick={handleScroll}
            aria-label="Scroll to About Section"
          >
            <h4 className="rounded py-2 px-2 sm:px-4 text-[12px] sm:text-[14px] md:py-1 md:px-4">
              About
            </h4>
          </Link>

          <Link
            href="#experience"
            data-blobity-magnetic="false"
            onClick={handleScroll}
            aria-label="Scroll to Experience Section"
          >
            <h4 className="rounded py-2 px-2 sm:px-4 text-[12px] sm:text-[14px] md:py-1 md:px-4">
              Experience
            </h4>
          </Link>

          <Link
            href="#contact"
            data-blobity-magnetic="false"
            onClick={handleScroll}
            aria-label="Scroll to Contact Section"
          >
            <h4 className="rounded py-2 px-2 sm:px-4 text-[12px] sm:text-[14px] md:py-1 md:px-4">
              Contact
            </h4>
          </Link>
        </>
      ) : (
        // Return to Home button for other pages
        <Link
          href="/"
          data-blobity-magnetic="false"
          aria-label="Return to Home"
        >
          <h4 className="rounded py-2 px-2 sm:px-4 text-[12px] sm:text-[14px] md:py-1 md:px-4">
            Return to Home
          </h4>
        </Link>
      )}
    </nav>
  );
};

export default NavBar;
