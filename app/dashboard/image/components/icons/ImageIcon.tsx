export default function ImageIcon({size=18}){

return(

<svg
width={size}
height={size}
viewBox="0 0 24 24"
fill="none"
stroke="currentColor"
strokeWidth="1.6"
strokeLinecap="round"
strokeLinejoin="round"
>

<rect x="3" y="3" width="18" height="18" rx="3"/>

<circle cx="8" cy="8" r="2"/>

<path d="M21 15l-5-5L5 21"/>

</svg>

)

}