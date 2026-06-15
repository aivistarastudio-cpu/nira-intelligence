"use client"

import { useState,useEffect } from "react"

const MODELS = [

{
name:"Nano Banana",
desc:"Fast generation",
speed:1,
icon:"/nano-banana.svg"
},

{
name:"Nano Banana Pro",
desc:"High quality",
speed:2,
icon:"/nano-pro.svg"
},

{
name:"Imagen 4",
desc:"Balanced quality",
speed:2,
icon:"/imagen.svg"
},

{
name:"Imagen 4 Ultra",
desc:"Ultra realism",
speed:3,
icon:"/ultra.svg"
},

{
name:"Imagen 4 Fast",
desc:"Turbo speed",
speed:3,
icon:"/fast.svg"
}

]

export default function ModelCommandPalette({model,setModel,closePalette}:any){

const [search,setSearch] = useState("")

/* selected model index */

const [selectedIndex,setSelectedIndex] = useState(
MODELS.findIndex(m => m.name === model)
)

/* ---------- FILTER ---------- */

const filtered = MODELS.filter(m =>
m.name.toLowerCase().includes(search.toLowerCase())
)

/* ---------- RESET INDEX ON SEARCH ---------- */

useEffect(()=>{

setSelectedIndex(0)

},[search])

/* ---------- SYNC SELECTED MODEL ---------- */

useEffect(()=>{

const index = filtered.findIndex(m => m.name === model)

if(index >= 0){
setSelectedIndex(index)
}

},[model,filtered])

/* ---------- KEYBOARD NAVIGATION ---------- */

useEffect(()=>{

const handler=(e:any)=>{

if(e.key==="ArrowDown"){
setSelectedIndex(i => Math.min(i+1, filtered.length-1))
}

if(e.key==="ArrowUp"){
setSelectedIndex(i => Math.max(i-1,0))
}

if(e.key==="Enter"){

const m = filtered[selectedIndex]

if(m){
setModel(m.name)
closePalette()
}

}

if(e.key==="Escape"){
closePalette()
}

}

window.addEventListener("keydown",handler)

return()=>window.removeEventListener("keydown",handler)

},[filtered,selectedIndex,setModel,closePalette])

/* ---------- UI ---------- */

return(

<div
className="nira-command-overlay"
onClick={closePalette}
>

<div
className="nira-command-panel"
onClick={(e)=>e.stopPropagation()}
>

<input
className="nira-command-search"
placeholder="Search model..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
autoFocus
/>

<div className="nira-command-list">

{filtered.map((m,i)=>{

const active = i === selectedIndex

return(

<div
key={m.name}
className={`nira-command-item ${active ? "active":""}`}
onClick={()=>{

setModel(m.name)
closePalette()

}}
>

<div className="nira-model-left">

<img
src={m.icon}
className="nira-model-svg"
/>

<div>

<div className="nira-model-name">
{m.name}
</div>

<div className="nira-model-desc">
{m.desc}
</div>

</div>

</div>

<div className="nira-model-right">

{model === m.name && (
<div className="nira-model-active">
✓
</div>
)}

<div className={`nira-speed speed-${m.speed}`}>
{m.speed === 1 && "Low"}
{m.speed === 2 && "Medium"}
{m.speed === 3 && "High"}
</div>

</div>

</div>

)

})}

</div>

</div>

</div>

)

}