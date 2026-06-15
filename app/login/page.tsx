'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { playUISound } from '@/lib/audioEngine'

/* ---------- AUDIO ENGINE ---------- */
function playClick(freq = 600, duration = 0.05, volume = 0.12) {
  if (freq <= 420) {
    playUISound("hover");
  } else {
    playUISound("click");
  }
}

function playWhoosh() {
  playUISound("enter");
}

/* ---------- ICONS ---------- */
const GoogleIcon = () => (
  <div className="relative flex items-center justify-center group">
    <div className="absolute inset-0 bg-[conic-gradient(from_0deg,#4285F4,#34A853,#FBBC05,#EA4335,#4285F4)] opacity-0 group-hover:opacity-50 blur-[10px] rounded-full animate-[spin_3s_linear_infinite] transition-opacity duration-700 scale-75 group-hover:scale-125" />
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="relative z-10 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" className="fill-[#4285F4] transition-all duration-300 group-hover:brightness-125" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" className="fill-[#34A853] transition-all duration-300 delay-75 group-hover:brightness-125" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" className="fill-[#FBBC05] transition-all duration-300 delay-150 group-hover:brightness-125" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" className="fill-[#EA4335] transition-all duration-300 delay-200 group-hover:brightness-125" />
    </svg>
  </div>
)

const AppleIcon = () => (
  <div className="relative flex items-center justify-center group">
    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 blur-[8px] transition-opacity duration-500 rounded-full scale-50 group-hover:scale-125" />
    <svg width="18" height="18" viewBox="0 0 24 24" className="relative z-10 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,1)]">
      <path fill="#ffffff" d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.126 3.802 3.058 1.49-.064 2.081-.97 3.87-.97 1.777 0 2.336.97 3.924.946 1.636-.026 2.65-1.523 3.6-2.951 1.127-1.647 1.593-3.238 1.615-3.32-.036-.017-3.111-1.196-3.151-4.79-.036-3.003 2.453-4.468 2.569-4.542-1.408-2.062-3.578-2.34-4.354-2.41-2.003-.207-4.148 1.144-5.111 1.144-.012-.008-.024-.015-.036-.022zM15.42 3.99c.813-.984 1.36-2.35 1.211-3.72-.1.008-.2.015-.3.022-1.32.062-2.76.886-3.606 1.899-.757.88-1.378 2.26-1.195 3.607 1.439.111 2.802-.674 3.65-1.637l.24-.171z" />
    </svg>
  </div>
)

const MicrosoftIcon = () => (
  <div className="relative flex items-center justify-center group">
    <svg width="18" height="18" viewBox="0 0 22 22" className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110">
      <rect x="1" y="1" width="9" height="9" className="fill-[#F25022] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-[2px] group-hover:-translate-x-[2px] group-hover:brightness-125" />
      <rect x="12" y="1" width="9" height="9" className="fill-[#7FBA00] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] delay-[50ms] group-hover:-translate-y-[2px] group-hover:translate-x-[2px] group-hover:brightness-125" />
      <rect x="1" y="12" width="9" height="9" className="fill-[#00A4EF] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] delay-[100ms] group-hover:translate-y-[2px] group-hover:-translate-x-[2px] group-hover:brightness-125" />
      <rect x="12" y="12" width="9" height="9" className="fill-[#FFB900] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] delay-[150ms] group-hover:translate-y-[2px] group-hover:translate-x-[2px] group-hover:brightness-125" />
    </svg>
  </div>
)

const NiraLogo = ({ size = 48 }: { size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 200 200" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className="animate-[spin_60s_linear_infinite]"
  >
    <g stroke="currentColor" strokeWidth="12" strokeLinecap="round" opacity="0.95">
      <ellipse cx="100" cy="100" rx="35" ry="80" />
      <ellipse cx="100" cy="100" rx="35" ry="80" transform="rotate(60 100 100)" />
      <ellipse cx="100" cy="100" rx="35" ry="80" transform="rotate(-60 100 100)" />
    </g>
  </svg>
)

/* ---------- INNER CONTENT WRAPPED FOR SUSPENSE ---------- */
function LoginContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const frameRef = useRef<number | null>(null)
  const [exit, setExit] = useState(false)
  const [email, setEmail] = useState('')
  const [socialStatus, setSocialStatus] = useState<string | null>(null)
  const [buttonState, setButtonState] = useState<'idle' | 'empty' | 'restricted'>('idle')
  const notifTimeout = useRef<NodeJS.Timeout | null>(null)
  const btnTimeout = useRef<NodeJS.Timeout | null>(null)

  // Auto show waitlist if restricted
  useEffect(() => {
    if (searchParams.get('restricted') === 'true') {
      setTimeout(() => {
        setSocialStatus("Early access is restricted to invited users.")
      }, 500)
    }
  }, [searchParams])

  const handleEmailLogin = () => {
    if (buttonState !== 'idle') return;

    if (!email.trim()) {
      playClick(300, 0.05, 0.08)
      setButtonState('empty')
      if (btnTimeout.current) clearTimeout(btnTimeout.current)
      btnTimeout.current = setTimeout(() => setButtonState('idle'), 2000)
    } else {
      playClick(640, 0.05, 0.12)
      playWhoosh()
      setButtonState('restricted')
      if (btnTimeout.current) clearTimeout(btnTimeout.current)
      btnTimeout.current = setTimeout(() => setButtonState('idle'), 4000)
    }
  }

  const handleSocialLogin = () => {
    playClick(640, 0.05, 0.12)
    playWhoosh()

    setSocialStatus("Public access coming soon")
    if (notifTimeout.current) clearTimeout(notifTimeout.current)
    notifTimeout.current = setTimeout(() => setSocialStatus(null), 3000)
  }

  /* ---------- NEURAL BACKGROUND ---------- */
  useEffect(()=>{
    const canvas = canvasRef.current
    if(!canvas) return

    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    let mounted = true
    let w = canvas.width = window.innerWidth
    let h = canvas.height = window.innerHeight

    const count = window.innerWidth < 768 ? 70 : 120
    const dots = Array.from({length:count}).map(()=>({
      x:Math.random()*w,
      y:Math.random()*h,
      vx:(Math.random()-0.5)*0.18,
      vy:(Math.random()-0.5)*0.18
    }))

    const mouse = {x:-9999,y:-9999}
    const onMove=(e:MouseEvent)=>{
      mouse.x=e.clientX
      mouse.y=e.clientY
    }
    const onResize=()=>{
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    }

    window.addEventListener('mousemove',onMove)
    window.addEventListener('resize',onResize)

    function draw(){
      if(!mounted) return
      ctx.clearRect(0,0,w,h)

      dots.forEach(d=>{
        d.x += d.vx
        d.y += d.vy

        if(d.x<0||d.x>w) d.vx *= -1
        if(d.y<0||d.y>h) d.vy *= -1

        ctx.fillStyle='#7aa2ff'
        ctx.fillRect(d.x,d.y,1.4,1.4)

        const dx=d.x-mouse.x
        const dy=d.y-mouse.y
        const dist=Math.sqrt(dx*dx+dy*dy)

        if(dist<120){
          ctx.strokeStyle='rgba(122,162,255,0.25)'
          ctx.beginPath()
          ctx.moveTo(d.x,d.y)
          ctx.lineTo(mouse.x,mouse.y)
          ctx.stroke()
        }
      })
      frameRef.current=requestAnimationFrame(draw)
    }
    draw()

    return()=>{
      mounted=false
      window.removeEventListener('mousemove',onMove)
      window.removeEventListener('resize',onResize)
      if(frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  },[])

  return (
    <>
      <canvas ref={canvasRef} className="absolute inset-0"/>

      <div className="relative z-10 flex min-h-[100svh] w-full flex-col items-center justify-center py-12">



        <div 
          className="w-[92%] sm:w-[440px] rounded-2xl px-6 py-8 sm:px-10 sm:py-10 relative overflow-hidden bg-[#09090b]/80 backdrop-blur-3xl border border-white/[0.08] animate-[fadeIn_0.8s_ease-out]"
          style={{ fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif' }}
        >

          <div className="flex flex-col items-center text-center">
            <div className="mb-8 inline-flex items-center justify-center px-3.5 py-1.5 text-[11px] font-medium text-white/70 bg-white/[0.03] border border-white/[0.08] rounded-full backdrop-blur-md tracking-wide">
              Public Release Soon
            </div>

            <div className="mb-5 text-white">
              <NiraLogo size={64} />
            </div>
            
            <h1 className="text-[24px] tracking-tight font-semibold text-white">
              Nira Intelligence
            </h1>

            <p className="mt-2 text-[14px] text-white/50 leading-relaxed">
              Private access to next-generation intelligence
            </p>
          </div>

          <div className="mt-8 w-full">
            <div className="relative w-full">
              <input
                placeholder="Enter your work email"
                value={email}
                onChange={e => {
                  setEmail(e.target.value)
                  if (buttonState === 'empty') setButtonState('idle')
                }}
                onFocus={()=>playClick(420,0.03,0.06)}
                onKeyDown={(e)=>e.key==='Enter'&&handleEmailLogin()}
                className={`
                  peer w-full rounded-xl
                  bg-black/20 px-4 py-3.5 text-[14px]
                  border ${buttonState === 'empty' ? 'border-red-500/50' : 'border-white/10'}
                  placeholder:text-white/30
                  outline-none focus:outline-none focus:ring-0
                  text-white
                  transition-colors duration-300
                  focus:bg-black/40
                  focus:border-white/10
                  ${buttonState === 'empty' ? 'animate-[shake_0.4s_ease-in-out]' : ''}
                `}
              />
              
              {/* Futuristic HUD Lock-on Brackets */}
              <div className="absolute -top-[1px] -left-[1px] w-4 h-4 border-t-2 border-l-2 border-white/40 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] peer-focus:opacity-100 rounded-tl-xl translate-x-2 translate-y-2 peer-focus:translate-x-0 peer-focus:translate-y-0 pointer-events-none"></div>
              <div className="absolute -top-[1px] -right-[1px] w-4 h-4 border-t-2 border-r-2 border-white/40 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] peer-focus:opacity-100 rounded-tr-xl -translate-x-2 translate-y-2 peer-focus:translate-x-0 peer-focus:translate-y-0 pointer-events-none"></div>
              <div className="absolute -bottom-[1px] -left-[1px] w-4 h-4 border-b-2 border-l-2 border-white/40 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] peer-focus:opacity-100 rounded-bl-xl translate-x-2 -translate-y-2 peer-focus:translate-x-0 peer-focus:translate-y-0 pointer-events-none"></div>
              <div className="absolute -bottom-[1px] -right-[1px] w-4 h-4 border-b-2 border-r-2 border-white/40 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] peer-focus:opacity-100 rounded-br-xl -translate-x-2 -translate-y-2 peer-focus:translate-x-0 peer-focus:translate-y-0 pointer-events-none"></div>
            </div>

            <div className="flex justify-center w-full mt-6">
              <button
                onMouseEnter={()=> {
                  if (buttonState === 'idle') playClick(420,0.03,0.08)
                }}
                onClick={handleEmailLogin}
                className={`
                  group relative rounded-full
                  bg-black text-white
                  py-2.5 px-10 text-[14px] font-semibold tracking-tight
                  overflow-hidden
                  border border-white/[0.08] hover:border-white/[0.15] active:border-white/[0.25]
                  transition-all duration-300 active:duration-75 
                  ${buttonState === 'idle' ? 'active:scale-[0.96] active:bg-[#0a0a0c]' : ''}
                  shadow-[0_4px_20px_rgba(0,0,0,0.5)] active:shadow-[0_0_0_rgba(0,0,0,0)]
                  ${buttonState === 'restricted' ? 'w-full' : 'w-auto'}
                `}
              >
                <div className="relative z-10 flex items-center justify-center gap-2">
                  <AnimatePresence mode="wait">
                    {buttonState === 'idle' && (
                      <motion.div key="idle" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex items-center gap-2">
                        <span className="transition-all duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#7aa2ff] group-hover:via-[#b37aff] group-hover:to-[#ff7aed]">
                          Continue with Email
                        </span>
                        <svg className="w-4 h-4 opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] text-[#ff7aed]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </motion.div>
                    )}
                    {buttonState === 'empty' && (
                      <motion.div key="empty" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="flex items-center gap-2 text-white/60">
                        <span>Enter email first</span>
                      </motion.div>
                    )}
                    {buttonState === 'restricted' && (
                      <motion.div key="restricted" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex items-center gap-2 text-white/80">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-60">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                        <span className="font-medium text-[13px]">Available only to early users</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                {buttonState === 'idle' && (
                  <div className="absolute bottom-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-[#7aa2ff] via-[#b37aff] to-[#ff7aed] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] origin-center" />
                )}
              </button>
            </div>

            <div className="mt-5 text-center text-[12px] text-white/40 tracking-wide">
              No password required • Instant access
            </div>

            <div className="mt-8 flex flex-col items-center justify-center relative">
              <div className="relative p-[1.5px] rounded-[22px] group/dock overflow-hidden shadow-[0_0_20px_rgba(0,164,239,0.05)]">
                <div className="absolute inset-[-150%] bg-[conic-gradient(from_0deg,transparent_0%,#ffffff_20%,#00A4EF_50%,#EA4335_80%,transparent_100%)] animate-[spin_4s_linear_infinite] opacity-50 group-hover/dock:opacity-100 transition-opacity duration-500" />
                <div className="relative flex items-center p-[5px] rounded-[20.5px] bg-[#09090b]">
                  <button onClick={handleSocialLogin} className="group flex items-center justify-center w-[80px] h-[44px] rounded-[14px] hover:bg-white/[0.05] transition-all duration-300">
                    <AppleIcon />
                  </button>
                  <button onClick={handleSocialLogin} className="group flex items-center justify-center w-[80px] h-[44px] rounded-[14px] hover:bg-white/[0.05] transition-all duration-300">
                    <MicrosoftIcon />
                  </button>
                  <button onClick={handleSocialLogin} className="group flex items-center justify-center w-[80px] h-[44px] rounded-[14px] hover:bg-white/[0.05] transition-all duration-300">
                    <GoogleIcon />
                  </button>
                </div>
              </div>

              {/* INLINE SOCIAL NOTIFICATION */}
              <div className="h-[20px] mt-4 w-full flex items-center justify-center">
                <AnimatePresence mode="wait">
                  {socialStatus && (
                    <motion.div
                      key="social-status"
                      initial={{ opacity: 0, y: -4, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-2 text-white/70"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-60">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                      </svg>
                      <span className="text-[12px] font-medium tracking-wide">
                        {socialStatus}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="absolute bottom-6 sm:bottom-8 left-0 w-full flex justify-center z-20">
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 px-4 text-[11px] sm:text-[12px] text-white/30 font-medium tracking-wide">
          <a href="/privacy" className="hover:text-white/90 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] transition-all duration-300 whitespace-nowrap">Privacy Policy</a>
          <div className="w-[3px] h-[3px] rounded-full bg-white/15 hidden sm:block" />
          <a href="/terms" className="hover:text-white/90 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] transition-all duration-300 whitespace-nowrap">Terms of Service</a>
          <div className="w-[3px] h-[3px] rounded-full bg-white/15 hidden sm:block" />
          <a href="/guidelines" className="hover:text-white/90 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] transition-all duration-300 whitespace-nowrap">User Guide</a>
        </div>
      </div>
    </>
  )
}

/* ---------- MAIN EXPORT ---------- */
export default function NiraLogin() {
  return (
    <main className="force-dark relative min-h-[100dvh] w-full overflow-x-hidden bg-[var(--nira-bg)] text-[var(--nira-text)]">
      <Suspense fallback={
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-[spin_20s_linear_infinite] text-[var(--nira-text)] opacity-50">
            <svg width="48" height="48" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g stroke="currentColor" strokeWidth="12" strokeLinecap="round" opacity="0.95">
                <ellipse cx="100" cy="100" rx="35" ry="80" />
                <ellipse cx="100" cy="100" rx="35" ry="80" transform="rotate(60 100 100)" />
                <ellipse cx="100" cy="100" rx="35" ry="80" transform="rotate(-60 100 100)" />
              </g>
            </svg>
          </div>
        </div>
      }>
        <LoginContent />
      </Suspense>
    </main>
  )
}