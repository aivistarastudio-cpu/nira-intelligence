"use client"

import { useState } from "react"

type Props = {
 prompt:string
 references?:File[]
 onClose:()=>void
 onGenerate:(prompt:string, refs?:File[])=>void
}

export default function PromptEditorModal({
 prompt,
 references=[],
 onClose,
 onGenerate
}:Props){

 const [text,setText] = useState(prompt)
 const [refs,setRefs] = useState<File[]>(references)

 const addReference = (e:React.ChangeEvent<HTMLInputElement>)=>{
  const files = e.target.files
  if(!files) return
  setRefs(prev => [...prev, files[0]])
 }

 const removeReference = (index:number)=>{
  setRefs(prev => prev.filter((_,i)=>i!==index))
 }

 return(

  <div className="nira-editor-overlay">

   <div className="nira-editor-box">

    <h3>Edit Prompt</h3>

    <textarea
     value={text}
     onChange={(e)=>setText(e.target.value)}
     className="nira-editor-textarea"
    />

    <div className="nira-ref-list">

     {refs.map((file,i)=>(
      <div key={i} className="nira-ref-item">

       <img
        src={URL.createObjectURL(file)}
        className="nira-ref-thumb"
       />

       <button onClick={()=>removeReference(i)}>
        Remove
       </button>

      </div>
     ))}

    </div>

    <input type="file" onChange={addReference}/>

    <div className="nira-editor-actions">

     <button onClick={onClose}>Cancel</button>

     <button onClick={()=>onGenerate(text,refs)}>
      Generate
     </button>

    </div>

   </div>

  </div>

 )

}