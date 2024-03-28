export function hideScrollbar() {
  if (typeof window !== "undefined") {
    // Check if the code is running on the client-side
    const style = document.createElement("style");
    style.innerHTML = `
            /* Hide scrollbar for Chrome, Safari and Opera */
            // ::-webkit-scrollbar {
            //     display: none;
            // }
             body{
              overflow: hidden;
            }
        `;
    style.classList.add("check");

    document.head.appendChild(style);
  }
}
export function showScrollbar() {
  if (typeof window !== "undefined") {
    // Check if the code is running on the client-side
    const style = document.querySelector(".check");
    style?.remove();
  }
}
