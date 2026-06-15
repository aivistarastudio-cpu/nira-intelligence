"use client"

import { useEffect, useRef } from "react"

export default function BackgroundFX(){

const canvasRef = useRef<HTMLCanvasElement>(null)

useEffect(()=>{

const canvas = canvasRef.current
if(!canvas) return

const ctx = canvas.getContext("2d")!

let w = 0
let h = 0

const PARTICLES = 120
let nodes:any[] = []

/* ---------- CREATE PARTICLES ---------- */

function createParticles(){

nodes = []

for(let i=0;i<PARTICLES;i++){

nodes.push({

x:Math.random()*w,
y:Math.random()*h,
vx:(Math.random()-.5)*0.2,
vy:(Math.random()-.5)*0.2,
r:Math.random()*1.5+0.4

})

}

}

/* ---------- RESIZE ---------- */

function resize(){

const dpr = window.devicePixelRatio || 1

w = window.innerWidth
h = window.innerHeight

canvas.width = w * dpr
canvas.height = h * dpr

canvas.style.width = w + "px"
canvas.style.height = h + "px"

ctx.setTransform(dpr,0,0,dpr,0,0)

createParticles()

}

resize()

window.addEventListener("resize",resize)

/* ---------- DRAW LOOP ---------- */

function draw(){

ctx.clearRect(0,0,w,h)

/* ---------- BASE GRADIENT ---------- */

const g = ctx.createRadialGradient(
w/2,
h/2,
0,
w/2,
h/2,
h
)

g.addColorStop(0,"#0e1a30")
g.addColorStop(.5,"#060c17")
g.addColorStop(1,"#02040a")

ctx.fillStyle = g
ctx.fillRect(0,0,w,h)

/* ---------- AI CORE GLOW ---------- */

const glow = ctx.createRadialGradient(
w/2,
h/2,
0,
w/2,
h/2,
500
)

glow.addColorStop(0,"rgba(60,120,255,0.25)")
glow.addColorStop(.4,"rgba(30,90,200,0.08)")
glow.addColorStop(1,"rgba(0,0,0,0)")

ctx.fillStyle = glow
ctx.fillRect(0,0,w,h)

/* ---------- PARTICLES ---------- */

for(let p of nodes){

p.x += p.vx
p.y += p.vy

if(p.x<0||p.x>w)p.vx*=-1
if(p.y<0||p.y>h)p.vy*=-1

ctx.beginPath()
ctx.arc(p.x,p.y,p.r,0,Math.PI*2)
ctx.fillStyle="rgba(180,220,255,0.45)"
ctx.fill()

}

/* ---------- NEURAL CONNECTIONS ---------- */

for(let i=0;i<nodes.length;i++){

for(let j=i+1;j<nodes.length;j++){

const dx = nodes[i].x - nodes[j].x
const dy = nodes[i].y - nodes[j].y
const dist = Math.sqrt(dx*dx+dy*dy)

if(dist<140){

ctx.strokeStyle = "rgba(120,180,255,.06)"
ctx.lineWidth = 1

ctx.beginPath()
ctx.moveTo(nodes[i].x,nodes[i].y)
ctx.lineTo(nodes[j].x,nodes[j].y)
ctx.stroke()

}

}

}

/* ---------- DEPTH FOG ---------- */

const fog = ctx.createLinearGradient(0,0,0,h)

fog.addColorStop(0,"rgba(0,0,0,0)")
fog.addColorStop(.7,"rgba(0,0,0,.25)")
fog.addColorStop(1,"rgba(0,0,0,.5)")

ctx.fillStyle = fog
ctx.fillRect(0,0,w,h)

/* ---------- LOOP ---------- */

requestAnimationFrame(draw)

}

draw()

return()=>window.removeEventListener("resize",resize)

},[])

return(

<canvas
ref={canvasRef}
className="nira-bg"
/>

)

}