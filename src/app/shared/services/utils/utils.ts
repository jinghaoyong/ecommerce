export function scrollToTop(): void {
    console.log("scrollToTop()")
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Optional: makes the scroll smooth
    });
}