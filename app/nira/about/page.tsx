"use client";

import Navbar from "@/app/components/Navbar";

export default function AboutPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050816] text-white">

      {/* BACKGROUND */}
      <div className="absolute inset-0 -z-10 overflow-hidden">

        {/* RED */}
        <div className="absolute top-[-15%] left-[-10%] w-[45rem] h-[45rem] bg-red-500/12 blur-[180px]" />

        {/* BLUE */}
        <div className="absolute bottom-[-20%] right-[-10%] w-[45rem] h-[45rem] bg-blue-500/12 blur-[180px]" />

        {/* GRID */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:90px_90px]" />

      </div>

      {/* NAVBAR */}
      <Navbar />

      {/* HERO */}
      <section className="relative px-6 md:px-10 pt-16 md:pt-24">

        <div className="max-w-7xl mx-auto">

          {/* TOP */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-2xl">

            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-red-400 to-blue-400 animate-pulse" />

            <span className="text-[10px] tracking-[0.35em] uppercase text-white/40">
              About NIRA
            </span>

          </div>

          {/* MAIN */}
          <div className="mt-10 grid lg:grid-cols-[1.2fr_0.8fr] gap-20 items-center">

            {/* LEFT */}
            <div>

              <h1 className="text-[58px] sm:text-[80px] md:text-[130px] leading-[0.88] tracking-[-0.09em] font-semibold">

                <span className="text-white">
                  Intelligence
                </span>

                <span className="block bg-gradient-to-r from-red-400 via-pink-300 to-blue-400 bg-clip-text text-transparent">

                  that adapts
                </span>

                <span className="block text-white/25">
                  to humans.
                </span>

              </h1>

              <p className="mt-10 max-w-2xl text-base md:text-[21px] leading-relaxed text-white/50 font-light">

                NIRA is a unified intelligence system designed to remove
                complexity from modern AI workflows — bringing reasoning,
                memory, creativity and execution into one seamless layer.

              </p>

              {/* STATS */}
              <div className="mt-14 flex flex-wrap gap-10">

                {[
                  {
                    number: "01",
                    label: "Unified Intelligence Layer",
                  },
                  {
                    number: "02",
                    label: "Adaptive Multi-Model Routing",
                  },
                  {
                    number: "03",
                    label: "Human-Centered Experience",
                  },
                ].map((item, i) => (

                  <div key={i}>

                    <div className="text-3xl md:text-5xl font-semibold tracking-[-0.06em] text-white">
                      {item.number}
                    </div>

                    <div className="mt-2 text-sm text-white/40 max-w-[150px] leading-relaxed">
                      {item.label}
                    </div>

                  </div>

                ))}

              </div>

            </div>

            {/* RIGHT PANEL */}
            <div className="relative">

              <div className="relative overflow-hidden rounded-[38px] border border-white/[0.08] bg-white/[0.03] backdrop-blur-3xl p-8 md:p-10">

                {/* GLOW */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-500/20 blur-3xl" />

                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/20 blur-3xl" />

                {/* CONTENT */}
                <div className="relative">

                  {/* HEADER */}
                  <div className="flex items-center justify-between">

                    <div>

                      <div className="text-white text-lg font-medium">
                        NIRA Core
                      </div>

                      <div className="mt-1 text-sm text-white/35">
                        Intelligence Architecture
                      </div>

                    </div>

                    <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />

                  </div>

                  {/* FLOW */}
                  <div className="mt-10 space-y-5">

                    {[
                      "Intent Understanding",
                      "Context Analysis",
                      "Memory Mapping",
                      "Adaptive Routing",
                      "Structured Response",
                    ].map((item, i) => (

                      <div
                        key={i}
                        className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.025] px-5 py-4"
                      >

                        <div className="flex items-center gap-4">

                          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-400/20 to-blue-400/20 border border-white/10 flex items-center justify-center text-sm">

                            {i + 1}

                          </div>

                          <span className="text-white/75 text-sm md:text-base">
                            {item}
                          </span>

                        </div>

                        <div className="w-2 h-2 rounded-full bg-white/30" />

                      </div>

                    ))}

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* WHY NIRA */}
      <section className="relative px-6 md:px-10 py-28">

        <div className="max-w-7xl mx-auto">

          {/* TITLE */}
          <div className="max-w-4xl">

            <div className="text-[11px] tracking-[0.35em] uppercase text-white/30">
              Why NIRA Exists
            </div>

            <h2 className="mt-8 text-5xl md:text-8xl leading-[0.92] tracking-[-0.08em] font-semibold">

              <span className="text-white">
                AI should feel
              </span>

              <span className="block mt-2 bg-gradient-to-r from-red-400 via-pink-300 to-blue-400 bg-clip-text text-transparent">

                natural, intelligent
              </span>

              <span className="block text-white/25 mt-2">
                and effortless.
              </span>

            </h2>

          </div>

          {/* CARDS */}
          <div className="mt-20 grid md:grid-cols-3 gap-5">

            {[
              {
                title: "One Intelligence",
                desc: "NIRA unifies reasoning, workflows and AI systems into one connected layer.",
              },
              {
                title: "Deep Understanding",
                desc: "Built to understand intent, context and human behavior instead of simple prompts.",
              },
              {
                title: "Adaptive System",
                desc: "Continuously evolves with interactions to create a more personal intelligence experience.",
              },
            ].map((item, i) => (

              <div
                key={i}
                className="group relative overflow-hidden rounded-[32px] border border-white/[0.08] bg-white/[0.025] p-8 backdrop-blur-3xl hover:bg-white/[0.04] transition-all duration-500"
              >

                {/* TOP ICON */}
                <div className="w-14 h-14 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] flex items-center justify-center">

                  <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-red-400 to-blue-400" />

                </div>

                <h3 className="mt-8 text-2xl font-medium tracking-tight text-white">
                  {item.title}
                </h3>

                <p className="mt-4 text-white/45 leading-relaxed text-[15px]">
                  {item.desc}
                </p>

                {/* LINE */}
                <div className="mt-8 h-px w-full bg-gradient-to-r from-white/10 to-transparent" />

              </div>

            ))}

          </div>

        </div>

      </section>

    </main>
  );
}