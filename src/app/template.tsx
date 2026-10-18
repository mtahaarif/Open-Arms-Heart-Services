"use client";

import { motion } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";
import { LogoMark } from "@/components/brand/Logo";

const EASE = [0.76, 0, 0.24, 1] as const;
let hasNavigated = false;

/**
 * Route transition. template.tsx re-mounts on every navigation, so each new page
 * is revealed by an iris curtain that sweeps upward while the content rises in.
 * The very first page load skips the curtain.
 */
export default function Template({ children }: { children: ReactNode }) {
  // Server renders and the hydration pass always skip the curtain; client-side navigations show it.
  const [withCurtain] = useState(() => typeof window !== "undefined" && hasNavigated);
  useEffect(() => {
    hasNavigated = true;
  }, []);

  return (
    <>
      {withCurtain && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[100] grid place-items-center bg-linear-to-br from-iris-800 via-iris-700 to-blush-600"
          initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
          animate={{ clipPath: "inset(0% 0% 100% 0%)" }}
          transition={{ duration: 0.85, delay: 0.15, ease: EASE }}
        >
          <motion.div
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <LogoMark tone="light" className="h-20 w-auto" />
          </motion.div>
        </motion.div>
      )}
      <motion.div
        initial={withCurtain ? { opacity: 0, y: 40 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </>
  );
}
