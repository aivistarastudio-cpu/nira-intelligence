"use client"

export default function ProfilePanel({close}:any){

return(

<div className="nira-overlay" onClick={close}>

<div
className="nira-panel"
onClick={(e)=>e.stopPropagation()}
>

<div className="nira-panel-title">
Account
</div>

<div className="nira-profile-block">

<div>Email</div>
<div>user@email.com</div>

</div>

<button className="nira-logout">

Logout

</button>

</div>

</div>

)

}