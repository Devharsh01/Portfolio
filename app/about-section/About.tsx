import SongCarousel from "./SongCarousel";
import "../animations/animate.css";
import AnimatedBody from "../animations/AnimatedBody";
import AnimatedTitle from "../animations/AnimatedTitle";

const About = () => {
  return (
    <section
      className="relative z-10 w-full items-center justify-center overflow-hidden bg-[#0E1016] bg-cover bg-center pt-16md:pt-20 lg:pt-20"
      id="about"
    >
      <div className="mx-auto flex w-[90%] flex-col items-center justify-center lg:max-w-[1212.8px]">
        <AnimatedTitle
          text={
            "I MAKE INTERFACES STUNNING, BACKENDS STRONG AND EXPERIENCES UNFORGETTABLE."
          }
          className={
            "mb-10 text-left text-[40px] font-bold leading-[0.9em] tracking-tighter text-[#e4ded7] sm:text-[45px] md:mb-16 md:text-[60px] lg:text-[80px]"
          }
          wordSpace={"mr-[14px]"}
          charSpace={"mr-[0.001em]"}
        />

        <div className="mx-auto flex w-[100%] flex-col lg:max-w-[1200px] lg:flex-row lg:gap-20">
          <div className="mb-10 flex w-[100%] flex-col gap-4 text-[18px] font-medium  leading-relaxed tracking-wide text-[#e4ded7] md:mb-16 md:gap-6 md:text-[20px] md:leading-relaxed lg:mb-16  lg:max-w-[90%] lg:text-[24px] ">
            <AnimatedBody
              text={
                "Software Engineering isn't just about writing code, it's about understanding problems, making thoughtful decisions, and building solutions that people can rely on. That's what I enjoy most about it. I find myself drawn to understanding how systems fit together, why they behave the way they do, and the trade-offs behind the decisions that shape them. "
              }
            />
            <AnimatedBody
              text={
                "I enjoy creating products that are scalable, reliable, and polished while taking ownership from idea to production. Every project teaches me something new, whether it's a different architecture, a better design pattern, or a new way to approach a problem."
              }
            />
            <AnimatedBody
              text={
                "Beyond engineering, my experiences have strengthened my communication, collaboration, and sense of ownership. They've taught me that building great software isn't just about writing good code—it's about understanding people, working together, and solving problems from different perspectives."
              }
            />  
          </div>

          <div className="mb-24 flex w-[100%] flex-col gap-4 text-[18px] font-normal leading-relaxed tracking-wide text-[#e4ded7]/80 sm:mb-32 md:mb-40 md:gap-6 md:text-[16px] md:leading-normal lg:mt-0 lg:mb-16 lg:max-w-[30%] lg:text-[18px]">
            <div className="flex flex-col gap-4 md:gap-3">
              <AnimatedTitle
                text={"Programming Languages"}
                className={
                  "text-[24px] text-[#e4ded7] md:text-[30px] lg:text-[20px]"
                }
                wordSpace={"mr-[0.25em]"}
                charSpace={"mr-[0.01em]"}
              />
              <AnimatedBody
                text={
                  "Java, C++, JavaScript, TypeScript, Python, SQL."
                }
              />
            </div>
            <div className="flex flex-col gap-3">
              <AnimatedTitle
                text={"Frameworks & Technologies"}
                className={
                  "text-[24px] text-[#e4ded7] md:text-[30px] lg:text-[20px]"
                }
                wordSpace={"mr-[0.25em]"}
                charSpace={"mr-[0.01em]"}
              />
              <AnimatedBody
                text={
                  "Spring Boot, Node.js, Express.js, React.js, Next.js, REST APIs."
                }
              />
            </div>
            <div className="flex flex-col gap-3">
              <AnimatedTitle
                text={"Databases"}
                className={
                  "text-[24px] text-[#e4ded7] md:text-[30px] lg:text-[20px]"
                }
                wordSpace={"mr-[0.25em]"}
                charSpace={"mr-[0.01em]"}
              />
              <AnimatedBody
                text={
                  "PostgreSQL, MySQL, MongoDB, DynamoDB, Snowflake."
                }
              />
            </div>
            <div className="flex flex-col gap-3">
              <AnimatedTitle
                text={"Cloud & DevOps"}
                className={
                  "text-[24px] text-[#e4ded7] md:text-[30px] lg:text-[20px]"
                }
                wordSpace={"mr-[0.25em]"}
                charSpace={"mr-[0.01em]"}
              />
              <AnimatedBody
                text={
                  "AWS (Lambda, API Gateway, S3, SQS, SNS, RDS), Terraform, Docker, Kafka, Git, GitHub Actions, CI/CD."
                }
              />
            </div>
            <div className="flex flex-col gap-3">
              <AnimatedTitle
                text={"Core Competencies"}
                className={
                  "text-[24px] text-[#e4ded7] md:text-[30px] lg:text-[20px]"
                }
                wordSpace={"mr-[0.25em]"}
                charSpace={"mr-[0.01em]"}
              />
              <AnimatedBody
                text={
                  "Distributed Systems, System Design, Data Structures & Algorithms, Scalable Backend Systems, Object-Oriented Programming, Unit & Integration Testing, Microservices."
                }
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
