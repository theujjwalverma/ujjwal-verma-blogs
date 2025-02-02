"use client";

import { Button } from "@/components/ui/button";
import { Project, ProjectContent } from "@/lib/constants";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

interface BlogPostProps {
  project: Project;
}

export default function BlogPost({ project }: BlogPostProps) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.8, 1]);

  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      const blob = document.getElementById("blob");
      if (blob)
        blob.animate(
          {
            left: `${ev.clientX}px`,
            top: `${ev.clientY}px`,
          },
          { duration: 4000, fill: "forwards", easing: "ease-out" }
        );
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;

    const scroll = () => {
      if (gallery.scrollLeft >= gallery.scrollWidth - gallery.clientWidth)
        gallery.scrollTo({ left: 0, behavior: "smooth" });
      else gallery.scrollBy({ left: 300, behavior: "smooth" });
    };

    const interval = setInterval(scroll, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.article
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="container mx-auto px-4 py-12  relative overflow-hidden"
    >
      <div
        id="blob"
        className="absolute bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 rounded-full filter blur-3xl opacity-20 w-96 h-96 -z-10 transition-all duration-1000"
      ></div>
      <div className="relative z-10">
        <Link href="/portfolio#projects">
          <Button
            variant="outline"
            className="mb-8 hover:scale-105 transition-transform duration-300"
          >
            &larr; Back to Projects
          </Button>
        </Link>
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="text-5xl font-bold mb-8 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent"
        >
          {project.title}
        </motion.h1>

        <motion.div style={{ opacity, scale }} className="mb-12">
          <Image
            src={project.cover || "/placeholder.svg"}
            alt={project.title}
            width={800}
            height={400}
            className="rounded-xl shadow-2xl hover:shadow-3xl transition-shadow duration-500 object-cover"
          />
        </motion.div>

        <motion.div className="prose dark:prose-invert max-w-none">
          {project.body.map((item: ProjectContent, index: number) => {
            switch (item.type) {
              case "text":
                return (
                  <motion.p
                    key={index}
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.1 * index }}
                    className="text-lg leading-relaxed"
                  >
                    {item.content as string}
                  </motion.p>
                );
              case "image":
                return item.gallery ? (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="my-12"
                  >
                    <div
                      ref={galleryRef}
                      className="flex gap-4 overflow-x-hidden scroll-smooth py-4"
                    >
                      {(item.gallery as string[]).map((img, idx) => (
                        <Image
                          key={idx}
                          src={img || "/placeholder.svg"}
                          alt={`Gallery image ${idx + 1}`}
                          width={400}
                          height={300}
                          className="rounded-lg shadow-lg hover:scale-105 transition-transform duration-500 flex-shrink-0"
                        />
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key={index}
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="my-12"
                  >
                    <Image
                      src={(item.content as string) || "/placeholder.svg"}
                      alt={`Project image ${index + 1}`}
                      width={400}
                      height={300}
                      className="rounded-lg shadow-lg hover:scale-105 transition-transform duration-500"
                    />
                  </motion.div>
                );
              case "list":
                return (
                  <motion.ul
                    key={index}
                    initial={{ x: -50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="space-y-2"
                  >
                    {(item.content as string[]).map((listItem, listIndex) => (
                      <motion.li
                        key={listIndex}
                        initial={{ x: -20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 * listIndex, duration: 0.5 }}
                        className="flex items-center space-x-2"
                      >
                        <span className="text-purple-500">•</span>
                        <span>{listItem}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                );
              default:
                return null;
            }
          })}
        </motion.div>
      </div>
    </motion.article>
  );
}
