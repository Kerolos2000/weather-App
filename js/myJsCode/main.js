let dataNow = new Date();
// change theme color based on time now if am run light mode else run dark mode
let circle = document.querySelector(".circle");
if (dataNow.getHours() >= 0 && dataNow.getHours() < 12) {
  changeClassLight(true);
} else {
  changeClassLight(false);
}
// change theme color by toggle button
circle.onclick = function () {
  if (document.body.classList.contains("light")) {
    changeClassLight(false);
  } else {
    changeClassLight(true);
  }
};
function changeClassLight(el) {
  if (el) {
    document.body.classList.add("light");
    circle.classList.add("light");
  } else {
    document.body.classList.remove("light");
    circle.classList.remove("light");
  }
}
