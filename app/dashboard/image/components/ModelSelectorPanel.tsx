"use client"

/* MODEL ICON MAP */

const MODEL_ICONS:any = {

"Nano Banana":"/nano-banana.svg",
"Nano Banana Pro":"/nano-pro.svg",
"Imagen 4":"/imagen.svg",
"Imagen 4 Ultra":"/ultra.svg",
"Imagen 4 Fast":"/fast.svg"

}

export default function ModelSelectorPanel({model,setModel,close}:any){

const models = [

"Nano Banana",
"Nano Banana Pro",
"Imagen 4",
"Imagen 4 Ultra",
"Imagen 4 Fast",

]

return(

<div className="nira-model-overlay" onClick={close}>

<div
className="nira-model-panel"
onClick={(e)=>e.stopPropagation()}
>

<div className="nira-model-title">
Model Selection
</div>

{models.map((m)=>(

<div
key={m}
className={`nira-model-row ${model===m ? "active":""}`}

onClick={()=>{
setModel(m)
close()
}}
>

<img
src={MODEL_ICONS[m]}
className="nira-model-svg"
/>

<span>
{m}
</span>

{/* SELECTED CHECK */}

{model===m && (
<span className="nira-model-check">
✓
</span>
)}

</div>

))}

</div>

</div>

)

}