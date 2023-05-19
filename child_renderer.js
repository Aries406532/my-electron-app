const maximize = document.getElementById("maximize");
const minimize = document.getElementById("minimize");
const colse = document.getElementById("colse");

maximize.addEventListener("click", () => {
  console.log("click maximize");
  window.electronAPI.windowOperate("maximize");
});

minimize.addEventListener("click", () => {
  console.log("click minimize");
  window.electronAPI.windowOperate("minimize");
});

colse.addEventListener("click", () => {
  console.log("click colse");
  window.electronAPI.windowOperate("colse");
});
