"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { fetchApprovedReviews, submitReview } from "@/app/actions/reviewActions";
import { smoothScrollTo } from "@/lib/scrollUtils";

const initialReviews: any[] = [];

// Unified Premium Easing (Apple-like slow, buttery glide)
const premiumEasing = [0.16, 1, 0.3, 1];
const premiumTransition = { duration: 1.2, ease: premiumEasing }; // Increased duration for cinematic feel

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(6px)", scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 90,
      damping: 18,
    },
  },
};

// The "Reality Distortion Field" Card
function ReviewCard({ 
  review, 
  index, 
  showAll, 
  isNew, 
  hoveredCardId, 
  setHoveredCardId 
}: { 
  review: any, 
  index: number, 
  showAll: boolean, 
  isNew: boolean,
  hoveredCardId: number | null,
  setHoveredCardId: (id: number | null) => void
}) {
  // 3D Tilt values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);
  const brightness = useTransform(mouseYSpring, [-0.5, 0.5], [1.05, 0.95]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setHoveredCardId(null);
  };

  const handleMouseEnter = () => {
    setHoveredCardId(review.id);
  };

  const isHovered = hoveredCardId === review.id;
  const isOtherHovered = hoveredCardId !== null && hoveredCardId !== review.id;

  return (
    <motion.div
      layout
      variants={cardVariants}
      initial={isNew ? { opacity: 0, scale: 0.9, x: -50, filter: "blur(6px)" } : (showAll ? { opacity: 0, scale: 0.98 } : undefined)}
      animate={{ 
        opacity: isOtherHovered ? 0.35 : 1, 
        scale: isHovered ? 1.02 : isOtherHovered ? 0.96 : 1, 
        x: 0, 
        filter: "none",
        zIndex: isHovered ? 50 : 10
      }}
      exit={{ opacity: 0, scale: 0.9, filter: "none" }}
      transition={{
        type: "spring",
        stiffness: 90,
        damping: 18,
        delay: index * 0.05,
        opacity: { type: "tween", ease: [0.16, 1, 0.3, 1], duration: 0.8 },
        filter: { type: "tween", ease: [0.16, 1, 0.3, 1], duration: 0.8 },
      }}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1200,
        filter: showAll && !isOtherHovered ? "none" : `brightness(${brightness})`, // Only apply brightness shift if not in grid to save performance
      }}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`
        group relative flex flex-col justify-between overflow-hidden shrink-0 snap-center cursor-crosshair
        w-[85vw] sm:w-[340px] md:w-[400px] h-[360px] md:h-[400px]
        p-8 md:p-10 rounded-[32px]
        bg-[#0D0D10]/75 backdrop-blur-2xl transform-gpu
        border ${isNew ? "border-blue-500/40" : "border-white/[0.08]"}
        shadow-[0_12px_40px_rgba(0,0,0,0.5)]
        transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
      `}
    >
      {/* Liquid Iridescent Border on Hover */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none rounded-[32px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
        style={{
          background: `radial-gradient(1200px circle at ${useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"])} ${useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"])}, rgba(255,255,255,0.08), transparent 40%)`,
        }}
      />
      
      {/* Dynamic Shine Layer - Flashlight effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 mix-blend-overlay"
        style={{
          background: `radial-gradient(circle 250px at ${useTransform(mouseXSpring, [-0.5, 0.5], ["-20%", "120%"])} ${useTransform(mouseYSpring, [-0.5, 0.5], ["-20%", "120%"])}, rgba(255,255,255,0.1) 0%, transparent 80%)`,
        }}
      />

      {/* Magical Background Quote */}
      <span className="absolute top-4 right-6 text-[140px] leading-none font-serif text-white/[0.015] select-none pointer-events-none group-hover:text-white/[0.05] group-hover:scale-110 transition-all duration-1000 origin-top-right">
        &quot;
      </span>

      {isNew && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
      )}

      <div className="relative z-10 flex flex-col flex-grow overflow-hidden">
        {isNew && (
          <span className="self-start mb-3 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-[11px] font-semibold tracking-wider uppercase border border-blue-500/20 shadow-[0_0_10px_rgba(59,130,246,0.2)]">
            Just Now
          </span>
        )}
        <div className="flex-grow overflow-y-auto hide-scrollbar pr-1 pb-4">
          <p className={`
            font-sans leading-[1.7] tracking-[-0.015em] transition-colors duration-700
            ${isHovered ? "text-white" : "text-zinc-200/90 font-medium"}
            ${(review.review || review.text).length < 50 ? "text-[20px] md:text-[24px]" : "text-[16px] md:text-[17px]"}
          `}>
            &quot;{review.review || review.text}&quot;
          </p>
        </div>
      </div>
      
      <div className="relative z-10 flex items-center gap-4 mt-10 md:mt-12">
        <div className={`relative flex items-center justify-center w-10 h-10 md:w-11 md:h-11 rounded-full overflow-hidden shadow-inner border transition-colors duration-700 ${isNew ? 'bg-blue-900/20 border-blue-500/20 group-hover:border-blue-400/50' : 'bg-[#0F0F11] border-white/10 group-hover:border-white/30'}`}>
          
          {/* Spinning Iridescent Ring behind the letter */}
          <div className="absolute inset-[-50%] w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0%,rgba(255,255,255,0.05)_25%,rgba(255,255,255,0.5)_50%,rgba(255,255,255,0.05)_75%,transparent_100%)] animate-[spin_4s_linear_infinite] group-hover:animate-[spin_1.5s_linear_infinite] opacity-30 group-hover:opacity-100 transition-opacity duration-700" />
          
          {/* Inner core to mask the ring so it looks like a glowing border stroke */}
          <div className={`absolute inset-[1.5px] rounded-full flex items-center justify-center ${isNew ? 'bg-[#0A101D]' : 'bg-[#121214]'} shadow-[inset_0_2px_10px_rgba(0,0,0,0.8)]`}>
            
            {/* Shimmering Animated Letter */}
            <motion.span 
              animate={{ backgroundPosition: ["0% 50%", "200% 50%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className={`
                relative z-10 font-bold text-[15px] md:text-[17px] tracking-tight
                bg-clip-text text-transparent bg-[length:200%_100%]
                group-hover:scale-125 transition-transform duration-500
                ${isNew 
                  ? "bg-[linear-gradient(90deg,rgba(96,165,250,0.5),rgba(255,255,255,1),rgba(96,165,250,0.5))]" 
                  : "bg-[linear-gradient(90deg,rgba(255,255,255,0.3),rgba(255,255,255,1),rgba(255,255,255,0.3))]" }
              `}
            >
              {review.avatar}
            </motion.span>
          </div>
        </div>
        <div className="flex flex-col">
          <span className={`text-[14px] md:text-[16px] font-semibold tracking-tight transition-colors duration-700 ${isHovered ? "text-white" : "text-zinc-100"}`}>
            {review.name}
          </span>
          <span className={`text-[13px] md:text-[14px] font-medium transition-colors duration-700 ${isHovered ? "text-zinc-300" : "text-zinc-400"}`}>
            {review.role}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function PremiumReviews() {
  const [showAll, setShowAll] = useState(false);
  const [reviewsList, setReviewsList] = useState(initialReviews);
  const [isClient, setIsClient] = useState(false);
  const [hoveredCardId, setHoveredCardId] = useState<number | null>(null);
  
  // Form State
  const [newName, setNewName] = useState("");
  const [newRole, setNewRole] = useState("");
  const [newText, setNewText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isLoadingReviews, setIsLoadingReviews] = useState(true);

  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  // Load reviews from DB on mount
  useEffect(() => {
    setIsClient(true);
    
    async function loadReviews() {
      setIsLoadingReviews(true);
      try {
        const dbReviews = await fetchApprovedReviews();
        if (dbReviews && dbReviews.length > 0) {
          // Merge real DB reviews with the initial hardcoded reviews
          setReviewsList([...dbReviews, ...initialReviews]);
        } else {
          // Fallback to initial if DB is empty or fails
          setReviewsList(initialReviews);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setReviewsList(initialReviews);
      } finally {
        setIsLoadingReviews(false);
      }
    }

    loadReviews();
  }, []);

  // Dedicated Neural Canvas for the Reviews Section
  useEffect(() => {
    if (!isClient) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d")!;
    if (!ctx) return;

    let w = canvas.parentElement?.offsetWidth || window.innerWidth;
    let h = canvas.parentElement?.offsetHeight || window.innerHeight;
    
    const mouse = { x: -9999, y: -9999 };
    let nodes: any[] = [];

    function createNodes() {
      const nodeCount = window.innerWidth < 768 ? 40 : 70;
      nodes = Array.from({ length: nodeCount }).map(() => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
      }));
    }

    const resize = () => {
      if (!canvas.parentElement) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.parentElement.offsetWidth;
      h = canvas.parentElement.offsetHeight;

      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      canvas.width = w * dpr;
      canvas.height = h * dpr;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      createNodes();
    };

    resize();

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const onMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    window.addEventListener("resize", resize);
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);

    let animationId: number;

    function draw() {
      ctx.clearRect(0, 0, w, h);

      nodes.forEach((a) => {
        const dxm = a.x - mouse.x;
        const dym = a.y - mouse.y;
        const distMouse = Math.sqrt(dxm * dxm + dym * dym);

        if (distMouse < 160 && distMouse > 0.1) {
          const force = (160 - distMouse) / 160;
          a.vx += (dxm / distMouse) * force * 0.4;
          a.vy += (dym / distMouse) * force * 0.4;
        }

        a.x += a.vx;
        a.y += a.vy;

        /* smoother damping matching page.tsx */
        a.vx *= 0.95;
        a.vy *= 0.95;

        if (a.x < 0 || a.x > w) a.vx *= -1;
        if (a.y < 0 || a.y > h) a.vy *= -1;

        // Note: lines are NOT drawn here to match the exact resting state of page.tsx
        // page.tsx only draws lines when 'pulse' is true (on logo click)

        ctx.beginPath();
        ctx.fillStyle = "rgba(255,255,255,0.35)";
        ctx.arc(a.x, a.y, distMouse < 120 ? 2.4 : 1.6, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(draw);
    }

    draw();

    // Re-calculate size periodically in case the reviews section grows (e.g. "Read all stories" clicked)
    const interval = setInterval(() => {
      if (canvas.parentElement && canvas.parentElement.offsetHeight !== h) {
        resize();
      }
    }, 1000);

    return () => {
      cancelAnimationFrame(animationId);
      clearInterval(interval);
      window.removeEventListener("resize", resize);
      if (canvas) {
        canvas.removeEventListener("mousemove", onMouseMove);
        canvas.removeEventListener("mouseleave", onMouseLeave);
      }
    };
  }, [isClient, showAll]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newText.trim()) return;

    setIsSubmitting(true);

    const formData = {
      name: newName,
      role: newRole || "NIRA User",
      review: newText,
      avatar: newName.charAt(0).toUpperCase(),
    };

    const result = await submitReview(formData);

    if (result.success) {
      // Optimistically add to UI (pending approval context)
      const optimisticReview = {
        id: Date.now(),
        name: formData.name,
        role: formData.role,
        review: formData.review,
        avatar: formData.avatar,
      };

      setReviewsList([optimisticReview, ...reviewsList]);
      
      setNewName("");
      setNewRole("");
      setNewText("");
      
      setTimeout(() => {
        const reviewContainer = document.getElementById("reviews-scroll-container");
        if (reviewContainer && !showAll) {
          reviewContainer.scrollTo({ left: 0, behavior: 'smooth' });
        }
      }, 100);
    } else {
      alert(`Database Error: ${result.error || 'Unknown error'}\n\nMake sure you restarted your server after adding .env.local!`);
      console.error("Supabase Error:", result.error);
    }

    setIsSubmitting(false);
  };

  // Prevent hydration mismatch by not rendering the list until client-side matches
  if (!isClient) return null;

  return (
    <div id="reviews-section" className="relative w-full pt-12 pb-20 md:pt-16 md:pb-32 overflow-visible bg-transparent perspective-[1200px] flex flex-col items-center select-none">

      {/* Dedicated Neural Canvas for Reviews Section */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 pointer-events-none opacity-100"
      />

      <motion.div 
        initial={{ opacity: 0, y: 30, filter: "blur(6px)", scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center justify-center mb-16 md:mb-24 text-center px-6 relative z-10"
      >
        <h2 className="text-3xl sm:text-4xl md:text-[52px] font-[700] tracking-[-0.03em] text-white leading-tight transition-all duration-1000 font-sans"
            style={{ opacity: hoveredCardId ? 0.3 : 1, filter: hoveredCardId ? "blur(2px)" : "blur(0px)" }}>
          Loved by pioneers.
        </h2>
        <p className="mt-3 md:mt-4 text-[15px] sm:text-[17px] text-zinc-400 max-w-2xl font-normal leading-relaxed tracking-tight transition-all duration-1000"
           style={{ opacity: hoveredCardId ? 0.1 : 1, filter: hoveredCardId ? "blur(2px)" : "blur(0px)" }}>
          Join thousands of researchers, educators, and teams building the future with NIRA Intelligence.
        </p>
      </motion.div>

      {/* Main Review Container */}
      <motion.div layout transition={premiumTransition} className="relative w-full max-w-[1400px] mx-auto origin-top flex flex-col items-center">
        
        {/* Edge Fade Masks for Horizontal Scroll */}
        <AnimatePresence>
          {!showAll && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 pointer-events-none z-10"
            >
              <div className="absolute left-0 top-0 bottom-0 w-8 md:w-32 bg-gradient-to-r from-black to-transparent transition-opacity duration-1000" style={{ opacity: hoveredCardId ? 0 : 1 }} />
              <div className="absolute right-0 top-0 bottom-0 w-8 md:w-32 bg-gradient-to-l from-black to-transparent transition-opacity duration-1000" style={{ opacity: hoveredCardId ? 0 : 1 }} />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div 
          layout
          className="w-full rounded-[32px] overflow-hidden"
          style={{ willChange: "height" }}
        >
          <motion.div 
            id="reviews-scroll-container"
            layout
            transition={premiumTransition}
            className={`
              w-full flex gap-6 px-6 md:px-12 pb-6 pt-4 perspective-[2000px]
              ${showAll 
                ? "flex-wrap justify-center" 
                : "flex-nowrap overflow-x-auto glass-scrollbar snap-x snap-mandatory md:px-32"
              }
            `}
          >
            <AnimatePresence initial={false}>
              {isLoadingReviews ? (
                <div className="flex w-full items-center justify-center py-20">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                </div>
              ) : reviewsList.length === 0 ? (
                <div className="flex flex-col items-center justify-center w-full py-16 text-center select-none">
                  <p className="text-zinc-400 text-lg font-semibold tracking-tight">No reviews yet.</p>
                  <p className="text-zinc-500 text-sm mt-1.5 font-medium max-w-sm">Be the first to share your experience below!</p>
                </div>
              ) : (
                reviewsList.map((review, index) => (
                  <ReviewCard 
                    key={review.id} 
                    review={review} 
                    index={index} 
                    showAll={showAll} 
                    isNew={review.id > 100} // IDs from DB will likely be UUIDs or large numbers
                    hoveredCardId={hoveredCardId}
                    setHoveredCardId={setHoveredCardId}
                  />
                ))
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </motion.div>

      {reviewsList.length > 0 && (
        <motion.div 
          layout 
          transition={premiumTransition}
          className="flex justify-center mt-6 md:mt-10 px-6 relative z-20"
          style={{ opacity: hoveredCardId ? 0.2 : 1, filter: hoveredCardId ? "blur(4px)" : "blur(0px)", transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1)" }}
        >
          <button 
            onClick={() => {
              if (showAll) {
                const el = document.getElementById("reviews-section");
                if (el) {
                  const y = el.getBoundingClientRect().top + window.scrollY - 100;
                  smoothScrollTo(y, 850);
                }
              }
              setShowAll(!showAll);
            }}
            className="
              group relative flex items-center justify-center gap-2
              px-6 py-3 md:px-7 md:py-3.5 rounded-full
              bg-[#1A1A1C]/80 backdrop-blur-2xl border border-white/[0.08]
              text-white/90 font-medium text-[14px] md:text-[15px] tracking-tight
              transition-all duration-300 ease-out
              hover:bg-[#2A2A2D]/90 hover:border-white/[0.15]
              active:scale-[0.97] overflow-hidden
            "
          >
            {showAll ? "Show less stories" : "Read all stories"}
            <motion.svg 
              animate={{ rotate: showAll ? -90 : 0 }}
              transition={premiumTransition}
              className="w-4 h-4 text-white/50 group-hover:text-white/90 transition-colors duration-300" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </motion.svg>
          </button>
        </motion.div>
      )}

      {/* Ultra-Premium Review Submission Form */}
      <motion.div 
        layout
        initial={{ opacity: 0, y: 30, filter: "blur(6px)", scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        className="mt-20 md:mt-32 w-full max-w-2xl mx-auto px-6 relative z-10 transition-all duration-1000"
        style={{ opacity: hoveredCardId ? 0.2 : 1, filter: hoveredCardId ? "blur(2px)" : "blur(0px)" }}
      >
        <div className="relative p-1 rounded-[36px] bg-gradient-to-b from-white/[0.08] to-transparent shadow-[0_0_50px_rgba(0,0,0,0.5)] group overflow-hidden">
          
          {/* Moving Aurora Background behind the form */}
          <div className="absolute inset-0 w-[200%] h-[200%] top-[-50%] left-[-50%] bg-[conic-gradient(from_90deg_at_50%_50%,#000000_0%,#1a2942_50%,#000000_100%)] opacity-30 animate-[spin_10s_linear_infinite] pointer-events-none" />
          
          <div className="relative p-6 md:p-10 rounded-[34px] bg-[#050505]/90 backdrop-blur-3xl transform-gpu border border-white/[0.05] transition-all duration-500">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[2px] bg-gradient-to-r from-transparent via-blue-500/80 to-transparent blur-[2px] opacity-70" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60px] h-[1px] bg-white opacity-50" />

            <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-2 flex items-center gap-3.5">
              <div className="relative flex items-center justify-center w-10 h-10 md:w-11 md:h-11 rounded-full bg-[#0A0A0C] border border-[#2A2A2D] shadow-[inset_0_2px_8px_rgba(255,255,255,0.08),0_4px_20px_rgba(0,0,0,0.5)] group-hover:border-[#3A3A3D] transition-colors duration-500 overflow-hidden">
                {/* Ultra-subtle metallic sweep effect inside the bezel */}
                <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent_20%,rgba(255,255,255,0.03)_40%,transparent_60%)] group-hover:translate-x-full transition-transform duration-1000" />
                
                {/* Minimalist Premium Message Circle (Human/Experience) */}
                <svg className="relative z-10 w-[18px] h-[18px] text-[#E4E4E7]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
              </div>
              Share your experience
            </h3>
            <p className="text-[14px] md:text-[15px] text-white/50 mb-8 font-medium">How has NIRA Intelligence transformed your workflow?</p>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="relative group/input z-0">
                  <input
                    type="text"
                    required
                    id="authorName"
                    placeholder=" "
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="peer relative z-10 w-full px-5 py-4 rounded-2xl bg-white/[0.02] border border-white/[0.08] text-white/80 text-[15px] focus:outline-none focus:border-transparent focus:bg-[#080B12] transition-all duration-700 shadow-inner"
                  />
                  <div className="absolute -inset-[1px] -z-10 rounded-[17px] opacity-0 peer-focus:opacity-100 overflow-hidden transition-opacity duration-700 shadow-[0_0_12px_rgba(56,189,248,0.15)]">
                    <div className="absolute inset-[-50%] w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0%,rgba(56,189,248,0.4)_20%,rgba(129,140,248,0.3)_40%,rgba(56,189,248,0.4)_60%,transparent_80%)] animate-[spin_8s_linear_infinite]" />
                  </div>
                  <label htmlFor="authorName" className="absolute z-20 left-5 top-4 text-white/40 text-[15px] pointer-events-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] peer-focus:-top-2 peer-focus:left-4 peer-focus:text-[11px] peer-focus:text-sky-200/80 peer-focus:bg-[#080B12] peer-focus:px-1 peer-valid:-top-2 peer-valid:left-4 peer-valid:text-[11px] peer-valid:text-white/50 peer-valid:bg-[#080B12] peer-valid:px-1 rounded-sm">
                    Your Name
                  </label>
                </div>
                
                <div className="relative group/input z-0">
                  <input
                    type="text"
                    id="authorRole"
                    placeholder=" "
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    className="peer relative z-10 w-full px-5 py-4 rounded-2xl bg-white/[0.02] border border-white/[0.08] text-white/80 text-[15px] focus:outline-none focus:border-transparent focus:bg-[#080B12] transition-all duration-700 shadow-inner"
                  />
                  <div className="absolute -inset-[1px] -z-10 rounded-[17px] opacity-0 peer-focus:opacity-100 overflow-hidden transition-opacity duration-700 shadow-[0_0_12px_rgba(56,189,248,0.15)]">
                    <div className="absolute inset-[-50%] w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0%,rgba(56,189,248,0.4)_20%,rgba(129,140,248,0.3)_40%,rgba(56,189,248,0.4)_60%,transparent_80%)] animate-[spin_8s_linear_infinite]" />
                  </div>
                  <label htmlFor="authorRole" className="absolute z-20 left-5 top-4 text-white/40 text-[15px] pointer-events-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] peer-focus:-top-2 peer-focus:left-4 peer-focus:text-[11px] peer-focus:text-sky-200/80 peer-focus:bg-[#080B12] peer-focus:px-1 peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:left-4 peer-[&:not(:placeholder-shown)]:text-[11px] peer-[&:not(:placeholder-shown)]:text-white/50 peer-[&:not(:placeholder-shown)]:bg-[#080B12] peer-[&:not(:placeholder-shown)]:px-1 rounded-sm">
                    Role (Optional)
                  </label>
                </div>
              </div>
              
              <div className="relative group/input z-0">
                <textarea
                  required
                  id="authorReview"
                  placeholder=" "
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  rows={4}
                  className="peer relative z-10 w-full px-5 py-4 rounded-2xl bg-white/[0.02] border border-white/[0.08] text-white/80 text-[15px] focus:outline-none focus:border-transparent focus:bg-[#080B12] transition-all duration-700 shadow-inner resize-none"
                />
                <div className="absolute -inset-[1px] -z-10 rounded-[17px] opacity-0 peer-focus:opacity-100 overflow-hidden transition-opacity duration-700 shadow-[0_0_12px_rgba(56,189,248,0.15)]">
                  <div className="absolute inset-[-50%] w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0%,rgba(56,189,248,0.4)_20%,rgba(129,140,248,0.3)_40%,rgba(56,189,248,0.4)_60%,transparent_80%)] animate-[spin_8s_linear_infinite]" />
                </div>
                <label htmlFor="authorReview" className="absolute z-20 left-5 top-4 text-white/40 text-[15px] pointer-events-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] peer-focus:-top-2 peer-focus:left-4 peer-focus:text-[11px] peer-focus:text-sky-200/80 peer-focus:bg-[#080B12] peer-focus:px-1 peer-valid:-top-2 peer-valid:left-4 peer-valid:text-[11px] peer-valid:text-white/50 peer-valid:bg-[#080B12] peer-valid:px-1 rounded-sm">
                  Write your review... NIRA is waiting to hear your story.
                </label>
              </div>

              <div className="flex justify-end mt-4">
                <button
                  type="submit"
                  disabled={isSubmitting || !newName.trim() || !newText.trim()}
                  className="
                    relative flex items-center justify-center
                    px-8 py-3 rounded-full
                    bg-white text-black font-semibold text-[15px] tracking-tight
                    transition-all duration-300 ease-out
                    hover:bg-white/90 hover:scale-[1.01] active:scale-[0.96] shadow-sm
                    disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-white
                  "
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      Submitting
                    </span>
                  ) : "Post Review"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>

    </div>
  );
}
