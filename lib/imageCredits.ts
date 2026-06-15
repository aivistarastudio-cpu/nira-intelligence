export function getImageCredits(){
  return Number(localStorage.getItem("nira_image_credits") || 0)
}