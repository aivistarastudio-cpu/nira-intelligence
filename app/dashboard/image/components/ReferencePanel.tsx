"use client"

import { useRef, useMemo, useEffect } from "react"

type Props = {
images: File[]
index: number
onClose: () => void
onDelete: (index: number) => void
onReplace: (index: number, file: File) => void
}

export default function ReferenceViewer({
images,
index,
onClose,
onDelete,
onReplace
}: Props){

const fileRef = useRef<HTMLInputElement>(null)

const img = images[index]

/* safety guard (important) */

if(!img) return null

/* stable object url */

const url = useMemo(()=>{

```
return URL.createObjectURL(img)
```

},[img])

/* cleanup url to prevent memory leak */

useEffect(()=>{

```
return ()=>{

  URL.revokeObjectURL(url)

}
```

},[url])

function openReplace(){
fileRef.current?.click()
}

function handleReplace(
e: React.ChangeEvent<HTMLInputElement>
){

```
const file = e.target.files?.[0]

if(!file) return

onReplace(index,file)
```

}

return(

```
<div
  className="nira-ref-viewer"
  onClick={onClose}
>

  {/* image */}

  <img
    className="nira-view-img"
    src={url}
    alt="reference"
    onClick={(e)=>e.stopPropagation()}
  />

  {/* actions */}

  <div
    className="nira-ref-actions"
    onClick={(e)=>e.stopPropagation()}
  >

    <button
      className="nira-ref-delete"
    >
      Delete
    </button>

    <button
      className="nira-ref-replace"
      onClick={openReplace}
    >
      Replace
    </button>

    <button
      className="nira-ref-close"
      onClick={onClose}
    >
      Close
    </button>

  </div>

  {/* hidden replace input */}

  <input
    ref={fileRef}
    type="file"
    accept="image/*"
    style={{display:"none"}}
    onChange={handleReplace}
  />

</div>
```

)

}
