//预加载（preload）脚本
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  setTitle: (title) => ipcRenderer.send("set-title", title),
  openFile: () => ipcRenderer.invoke("dialog:openFile"),
  handleCounter: (callback) => ipcRenderer.on("update-counter", callback),
  create: () => ipcRenderer.send("create"),
});
