"use client"

export default function SettingsPanel({close}:any){

return(

<div className="nira-overlay" onClick={close}>

<div
className="nira-panel"
onClick={(e)=>e.stopPropagation()}
>

<div className="nira-panel-title">
Image Settings
</div>

<div className="nira-settings-row">

<label>Image Size</label>

<select>

<option>1024 x 1024</option>
<option>768 x 768</option>
<option>512 x 512</option>

</select>

</div>

<div className="nira-settings-row">

<label>Steps</label>

<input type="number" defaultValue={30}/>

</div>

</div>

</div>

)

}