import Link from "next/link";
import Image from "next/image";
import { monaSans } from "../fonts/monaSans";
import { motion } from "framer-motion";
import { imageAnimation, bodyAnimation } from "../animations/animations";
import AnimatedWords from "../animations/AnimatedWords";
import profile from "../../public/profile1.jpeg";
import { GITHUB_URL, LINKEDIN_URL, LEETCODE_URL } from "@/constants/site";
import { getPreloaderFlag } from "../utils/preloaderFlag";

const Hero = () => {
  const isFirstLoad = getPreloaderFlag();
  const imgAnim = imageAnimation(isFirstLoad);
  const bodyAnim = bodyAnimation(isFirstLoad);

  return (
    <motion.section
      className="relative z-10 flex h-[85vh] w-full items-stretch justify-center bg-[url('.//../public/hero.jpg')] Wbg-cover  bg-center py-0 sm:h-[90vh]  md:h-[100vh] 3xl:h-[85vh]"
      id="home"
      initial="initial"
      animate="animate"
    >
      <motion.div className="absolute left-0 top-0 right-0 bottom-0 h-full w-full bg-[#0E1016] mix-blend-color"></motion.div>

      <div className="absolute top-10 flex justify-between sm:w-[90%] lg:max-w-[1440px]">
        <div>
          <Link
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("contact")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
            aria-label="Scroll to Contact Section"
          >
            <motion.button
              className="hidden rounded-md border-2 border-[#e4ded7] py-2 px-4 text-[14px] font-semibold text-[#e4ded7] sm:block  md:text-[16px] lg:block"
              variants={bodyAnim}
            >
              LET'S TALK
            </motion.button>
          </Link>
        </div>

        <div className="flex gap-10 text-[#e4ded7] sm:gap-12 md:gap-14 lg:gap-14">
          <Link
            href={GITHUB_URL}
            target="_blank"
            aria-label="View GitHub Profile"
            data-blobity-tooltip="GitHub"
            data-blobity-magnetic="false"
          >
            <motion.p
              className="text-[16px] font-bold text-[#e4ded7] md:text-[16px]"
              variants={bodyAnim}
            >
              GH
            </motion.p>
          </Link>
          <Link
            href={LINKEDIN_URL}
            target="_blank"
            aria-label="View LinkedIn Profile"
            data-blobity-tooltip="LinkedIn"
            data-blobity-magnetic="false"
          >
            <motion.p
              className="text-[16px] font-bold text-[#e4ded7] md:text-[16px]"
              variants={bodyAnim}
            >
              LN
            </motion.p>
          </Link>
          <Link
            href={LEETCODE_URL}
            target="_blank"
            aria-label="View LeetCode Profile"
            data-blobity-tooltip="LeetCode"
            data-blobity-magnetic="false"
          >
            <motion.p
              className="text-[16px] font-bold text-[#e4ded7] md:text-[16px]"
              variants={bodyAnim}
            >
              LT
            </motion.p>
          </Link>
        </div>
      </div>

      <div className="-mt-36 flex flex-col items-center justify-center sm:-mt-20 lg:my-40 lg:-mt-2 lg:py-40 ">
        <div
          className={`relative flex flex-col items-center justify-center ${monaSans.className}`}
        >
          <AnimatedWords
            title="DEV HARSH_AGARWAL"
            style="inline-block overflow-hidden pt-1 -mr-4 sm:-mr-5 md:-mr-7 lg:-mr-9 -mb-1 sm:-mb-2 md:-mb-3 lg:-mb-4"
          />
          <motion.div
            className="absolute bottom-[-110px] mx-auto sm:bottom-[-100px] md:bottom-[-130px] lg:bottom-[-170px]"
            variants={imgAnim}
          >
            <Image
              src={profile}
              priority
              alt="Dev Harsh's headshot"
              data-blobity-tooltip="Dev Harsh"
              data-blobity-invert="false"
              className=" w-[150px] rounded-[16px] grayscale hover:grayscale-0 md:w-[200px] md:rounded-[32px] lg:w-[245px]"
            />
          </motion.div>
        </div>
      </div>

      <div
        className="absolute bottom-10 flex items-center 
      justify-center
      md:bottom-10 lg:w-[90%] lg:max-w-[1440px] lg:justify-between"
      >
        <motion.div
          className="  max-w-[350px] md:max-w-[400px] lg:max-w-[400px]"
          variants={bodyAnim}
        >
          <p className="z-50 text-center text-[16px] font-medium text-[#e4ded7] md:text-[20px] lg:text-left">
            Full Stack Engineer and Web Designer, prev at{" "}
            <Link
              href="https://www.flexport.com/"
              target="_blank"
              className="underline underline-offset-2 hover:no-underline"
              aria-label="Flexport Website"
            >
              Flexport,
            </Link>{" "}
            currently available for work.
          </p>
        </motion.div>

        <motion.div
          className="  hidden max-w-[500px] lg:block lg:max-w-[420px]"
          variants={bodyAnim}
        >
          <p className="text-right text-[16px] font-semibold text-[#e4ded7] md:text-[20px]">
            Focused on interfaces and experiences, working from India.
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Hero;
