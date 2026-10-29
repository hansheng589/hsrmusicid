"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function SectionHeading({
  kicker,
  title,
  accent,
  description,
  align = "left",
  className,
}: {
  kicker: string;
  title: string;
  accent?: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "mb-10 md:mb-14",
        align === "center" && "text-center",
        className
      )}
    >
      <div
        className={cn(
          "mb-4 flex items-center gap-3",
          align === "center" && "justify-center"
        )}
      >
        <span className="h-px w-10 bg-gradient-to-r from-transparent to-gold" aria-hidden />
        <span className="mono-label text-gold">{kicker}</span>
        <span className="h-px w-10 bg-gradient-to-l from-transparent to-gold" aria-hidden />
      </div>
      <h2 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
        {title}{" "}
        {accent && <span className="gold-text italic">{accent}</span>}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
