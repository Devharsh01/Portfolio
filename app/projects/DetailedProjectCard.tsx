"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { ProjectProps } from "../../constants/projectDetails";
import Link from "next/link";
import Image from "next/image";
import AnimatedTitle from "../animations/AnimatedTitle";
import AnimatedBody from "../animations/AnimatedBody";
import { motion } from "framer-motion";

const DetailedProjectCard = ({
  id,
  name,
  description,
  technologies,
  github,
  demo,
  image,
  available,
}: ProjectProps) => {
  return (
    <motion.div
      style={
        {
          backgroundColor: "#212531",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          position: "relative",
        } as React.CSSProperties
      }
      className={`relative z-10 h-[400px] w-full items-stretch justify-center overflow-hidden rounded-3xl bg-center py-0 sm:h-[450px] sm:w-[100%] md:h-[420px] md:w-[100%] lg:h-[380px]`}
      initial="initial"
      animate="animate"
    >
      <Image
        src={image}
        alt={name}
        className={`absolute -bottom-2 w-[65%] sm:w-[75%] md:w-[55%] lg:max-w-[50%] ${
          id % 2 === 0 ? "right-0" : "left-0"
        }`}
      />
      <div
        className={`absolute top-0 text-[#0E1016] ${
          id % 2 === 0 ? "left-0 ml-8 lg:ml-14" : "right-0 mr-8 lg:mr-14"
        } mt-4 flex items-center justify-center gap-4 lg:mt-8`}
      >
        {available ? (
          <>
            {github && (
              <Link
                href={github}
                target="_blank"
                className="rounded-full"
                aria-label="Open GitHub Repository"
              >
                <FontAwesomeIcon
                  icon={faGithub}
                  className=" w-[18px] rounded-full bg-white p-4 text-[18px] md:w-[20px] md:text-[20px] lg:w-[22px] lg:text-[22px]"
                  data-blobity
                  data-blobity-radius="32"
                  data-blobity-offset-x="4"
                  data-blobity-offset-y="4"
                  data-blobity-magnetic="true"
                />
              </Link>
            )}
            {demo && (
              <Link href={demo} target="_blank" aria-label="Open Live Demo">
                <FontAwesomeIcon
                  icon={faLink}
                  className=" w-[18px] rounded-full bg-white p-4 text-[18px] md:w-[20px] md:text-[20px] lg:w-[22px] lg:text-[22px]"
                  data-blobity
                  data-blobity-radius="32"
                  data-blobity-offset-x="4"
                  data-blobity-offset-y="4"
                  data-blobity-magnetic="trues"
                />
              </Link>
            )}
          </>
        ) : (
          <div className=" flex items-center justify-center gap-4">
            <Link
              href={github}
              target="_blank"
              className="mt-1 rounded-full"
              aria-label="Open GitHub Repository"
            >
              <FontAwesomeIcon
                icon={faGithub}
                className=" w-[18px]  rounded-full bg-white p-4 text-[18px] md:w-[20px] md:text-[20px] lg:w-[22px] lg:text-[22px]"
                data-blobity
                data-blobity-radius="32"
                data-blobity-offset-x="4"
                data-blobity-offset-y="4"
                data-blobity-magnetic="true"
              />
            </Link>
            <div className=" rounded-xl bg-white px-4 py-2 md:px-5 md:py-3 lg:px-6 lg:py-4">
              <h3 className="text-[16px] md:text-[18px] lg:text-[20px] ">
                Coming soon
              </h3>
            </div>
          </div>
        )}
      </div>
      <div
        className={`absolute text-white  ${
          !(id % 2 === 0)
            ? "right-0 top-20 mr-0 ml-10 md:right-0 md:ml-0 lg:right-0 lg:top-24 lg:mr-4"
            : "left-10 top-20 ml-0 md:mr-12 lg:top-20 lg:ml-4"
        } mb-6 md:mb-8 lg:mb-6 `}
      >
        <AnimatedTitle
          text={name}
          className={
            `${id % 2 === 0 ? "lg:pt-10" : "lg:pt-6"} max-w-[90%] text-[32px] leading-none text-white md:text-[36px] md:leading-none lg:max-w-[450px] lg:text-[40px] lg:leading-none`
          }
          wordSpace={"mr-[0.25em]"}
          charSpace={"-mr-[0.01em]"}
        />
        <AnimatedBody
          text={description.length > 120 ? `${description.substring(0, 120)}...` : description}
          className={
            "mt-3 w-[90%] max-w-[500px] text-[14px] font-medium text-[#95979D] leading-relaxed"
          }
        />
        <div className="mt-4 flex flex-wrap gap-2 items-baseline">
          {technologies.slice(0, 3).map((tech, techId) => (
            <AnimatedTitle
              text={tech}
              wordSpace={"mr-[0.25em]"}
              charSpace={"mr-[0.01em]"}
              key={techId}
              className={
                "text-[12px] font-bold uppercase md:text-[13px] lg:text-[14px] text-[#e4ded7]/80"
              }
            />
          ))}
          {technologies.length > 3 && (
            <AnimatedTitle
              text={`+${technologies.length - 3} more`}
              wordSpace={"mr-[0.25em]"}
              charSpace={"mr-[0.01em]"}
              className="text-[12px] font-bold uppercase md:text-[13px] lg:text-[14px] text-[#e4ded7]/60"
            />
          )}
        </div>
        
        {/* View Details Button */}
        <Link href={`/projects/${name.toLowerCase().replace(/\s+/g, '-')}`}>
          <motion.button
            className="mt-4 px-4 py-2 bg-[#e4ded7]/10 text-[#e4ded7] text-[14px] font-semibold rounded-lg backdrop-blur-sm border border-[#e4ded7]/20 hover:bg-[#e4ded7]/20 transition-all duration-300 hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Details
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
};

export default DetailedProjectCard;
