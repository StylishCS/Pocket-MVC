// slider function
let currentIndex = 0;
const slides = document.querySelectorAll(".slide");
const indicators = document.querySelectorAll(".indicator");

function showSlide(index) {
  // Remove active classes
  slides[currentIndex].classList.remove("active");
  indicators[currentIndex].classList.remove("active");

  // Update currentIndex and add active classes
  currentIndex = index;
  slides[currentIndex].classList.add("active");
  indicators[currentIndex].classList.add("active");

  // Move slides container to show the selected slide
  document.querySelector(".slides").style.transform = `translateX(-${
    currentIndex * 100
  }%)`;
}
setInterval(() => {
  let nextIndex = (currentIndex + 1) % slides.length;
  showSlide(nextIndex);
}, 3000);
