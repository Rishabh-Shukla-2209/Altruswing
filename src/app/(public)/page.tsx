"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";

export default function HomePage() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-[80vh] px-4 overflow-hidden bg-white">
      {/* Abstract background blobs to avoid golf cliches */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob" />
      <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-4000" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 flex flex-col items-center text-center max-w-3xl"
      >
        <span className="inline-flex items-center gap-2 px-3 py-1 text-sm font-medium rounded-full bg-emerald-50 text-emerald-700 mb-6">
          <Heart size={16} /> Play Golf. Make an Impact.
        </span>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-neutral-900 mb-6">
          Drive Change with <br /> Every Swing.
        </h1>

        <p className="text-lg md:text-xl text-neutral-600 mb-10 max-w-2xl">
          Track your performance, enter our monthly draw, and support the
          charities you care about. A modern platform for golfers who want to
          give back.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-white bg-neutral-900 rounded-full hover:bg-neutral-800 transition-colors text-lg font-medium shadow-lg hover:shadow-xl"
          >
            Start Your Impact <ArrowRight size={20} />
          </Link>
          <Link
            href="/charities"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-neutral-900 bg-white border border-neutral-200 rounded-full hover:bg-neutral-50 transition-colors text-lg font-medium"
          >
            Explore Charities
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
