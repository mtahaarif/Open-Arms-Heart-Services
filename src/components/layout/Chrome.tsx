"use client";

import Link from "next/link";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { HeartHandshake, Phone } from "lucide-react";
import { useState } from "react";
import { site } from "@/lib/site";

/** Thin gradient reading-progress bar pinned to the top of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-linear-to-r from-iris-700 via-iris-400 to-blush-400"
    />
  );
}

/** Floating glass action bar for phones — appears once the hero has scrolled away. */
export function MobileCallBar() {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setShow(y > 520));

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 26 }}
          className="glass fixed inset-x-3 bottom-3 z-40 flex gap-2 rounded-full p-2 lg:hidden"
        >
          <a href={site.phone.href} className="btn flex-1 bg-white py-3 text-iris-800">
            <Phone className="size-4" /> Call
          </a>
          <Link href="/contact" className="btn-primary flex-[1.4] py-3">
            <HeartHandshake className="size-4" /> Request care
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
