const path = require("path");
const os = require("os");
const { ipcRenderer } = require("electron");

const form = document.getElementById("image-form");
const slider = document.getElementById("slider");
const img = document.getElementById("img");
const imgs = document.getElementById("imgs");

const spinner = document.getElementById("spinner-container")

const validExtensions = ["image/png", "image/jpeg", "image/jpg"]
document.getElementById("validExts").innerText = validExtensions.join(" - ").replaceAll("image/", "")

const output = document.getElementById("outputDirPath")
output.value = path.join(os.homedir(), "imageshrinker");


form.addEventListener("submit", (e) => {
  e.preventDefault();
  const imgPaths = [];
  for (index in img.files) {
    if (img.files[index].path) {
      if (validExtensions.includes(img.files[index].type)) {
        imgPaths.push(img.files[index].path)
      }
    }
  }
  for (index in imgs.files) {
    if (imgs.files[index].path) {
      if (validExtensions.includes(imgs.files[index].type)) {
        imgPaths.push(imgs.files[index].path)
      }
    }
  }
  const quality = slider.value;
  ipcRenderer.send("image:minimize", { imgPaths, quality, dest: output.value })
})

ipcRenderer.on("image:done", () => {
  M.toast({
    html: `Images resized to ${slider.value}%`
  })
  toggleSpinnerVisibility()
})
ipcRenderer.on("image:start", () => {
  M.toast({
    html: `Images are being resized`
  })
  toggleSpinnerVisibility()
})
function toggleSpinnerVisibility() {
  if (spinner.classList.contains("hidden")) {
    spinner.classList.remove("hidden")
    spinner.classList.add("visible")
  } else {
    spinner.classList.add("hidden")
    spinner.classList.remove("visible")
  }
}