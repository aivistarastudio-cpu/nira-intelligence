"use client"

import { History, Settings, User, ChevronDown, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"


const MODEL_ICONS: Record<string,string> = {
  "Nano Banana": "/nano-banana.svg",
  "Nano Banana Pro": "/nano-pro.svg",
  "Imagen 4": "/imagen.svg",
  "Imagen 4 Ultra": "/ultra.svg",
  "Imagen 4 Fast": "/fast.svg"
}

export default function TopSystemBar({
  model,
  openPalette,
  mode,
  setMode,
  isGenerating
}: any){

const router = useRouter()

const iconSrc = MODEL_ICONS[model] || "/nano-banana.svg"

return(

<header className="nira-topbar">

<div className="nira-topbar-glow"/>

{/* LEFT */}

<div className="nira-top-left">

{mode !== "studio" && (
<button
className="nira-back-btn"
onClick={()=>setMode("studio")}
>
<ArrowLeft size={18}/>
</button>
)}

<div className="nira-brand">

<div className={`nira-ai-core ${isGenerating ? "active" : ""}`}/>

<span className="nira-brand-text">
NIRA Intelligence
</span>

</div>

</div>


{/* CENTER */}

<div className="nira-top-center">

{mode === "studio" && (

<button
className="nira-model-selector"
onClick={openPalette}
>

<img
src={iconSrc}
className="nira-model-svg"
alt="model"
/>

<span>{model}</span>

<ChevronDown size={16}/>

</button>

)}

</div>


{/* RIGHT */}

<div className="nira-top-right">

<button
className="nira-icon-btn"
onClick={() => router.push("/dashboard/image/history")}
>
<History size={20}/>
</button>

<button
className="nira-icon-btn"
onClick={()=>setMode("settings")}
>
<Settings size={20}/>
</button>

<button
className="nira-icon-btn"
onClick={()=>setMode("profile")}
>
<User size={20}/>
</button>

</div>

</header>
)

}