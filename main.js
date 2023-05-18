const { app, BrowserWindow, Menu } = require("electron");
// 热加载
const reloader = require("electron-reloader");
reloader(module);

const createWindow = () => {
  //创建浏览器窗口指定高和宽度
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  });

  //加载文件
  win.loadFile("index.html");

  // 直接打开 调试 或者 ctrl+shift+i 、 mac 调试用 openDevTools
  // win.webContents.openDevTools();

  // 自定义模板 - 菜单栏
  // const template = [
  //   {
  //     label: "文件",
  //     submenu: [
  //       {
  //         label: "新建"
  //       },
  //     ],
  //   },
  //   {
  //     label: "关于",
  //   },
  // ];

  const isMac = process.platform === "darwin";

  const template = [
    // { role: 'appMenu' }
    ...(isMac
      ? [
          {
            label: app.name,
            submenu: [
              { role: "about" },
              { type: "separator" },
              { role: "services" },
              { type: "separator" },
              { role: "hide" },
              { role: "hideOthers" },
              { role: "unhide" },
              { type: "separator" },
              { role: "quit" },
            ],
          },
        ]
      : []),
    // { role: 'fileMenu' }
    {
      label: "File",
      submenu: [isMac ? { role: "close" } : { role: "quit" }],
    },
    // { role: 'editMenu' }
    {
      label: "Edit",
      submenu: [
        { role: "undo" },
        { role: "redo" },
        { type: "separator" },
        { role: "cut" },
        { role: "copy" },
        { role: "paste" },
        ...(isMac
          ? [
              { role: "pasteAndMatchStyle" },
              { role: "delete" },
              { role: "selectAll" },
              { type: "separator" },
              {
                label: "Speech",
                submenu: [{ role: "startSpeaking" }, { role: "stopSpeaking" }],
              },
            ]
          : [{ role: "delete" }, { type: "separator" }, { role: "selectAll" }]),
      ],
    },
    // { role: 'viewMenu' }
    {
      label: "View",
      submenu: [
        { role: "reload" },
        { role: "forceReload" },
        { role: "toggleDevTools" },
        { type: "separator" },
        { role: "resetZoom" },
        { role: "zoomIn" },
        { role: "zoomOut" },
        { type: "separator" },
        { role: "togglefullscreen" },
      ],
    },
    // { role: 'windowMenu' }
    {
      label: "Window",
      submenu: [
        { role: "minimize" },
        { role: "zoom" },
        ...(isMac
          ? [
              { type: "separator" },
              { role: "front" },
              { type: "separator" },
              { role: "window" },
            ]
          : [{ role: "close" }]),
      ],
    },
    {
      role: "help",
      submenu: [
        {
          label: "Learn More",
          click: async () => {
            const { shell } = require("electron");
            await shell.openExternal("https://electronjs.org");
          },
        },
        {
          label: "Console",
          accelerator:
            process.platform === "darwin" ? "Alt+Cmd+O" : "Alt+Shift+O",
          click: () => {
            console.log("Learn More");
          },
        },
      ],
    },
  ];

  // 编译模板
  const menu = Menu.buildFromTemplate(template);

  // 设置菜单
  Menu.setApplicationMenu(menu);
};

//这段程序将会在 Electron 结束化
//和创建浏览器窗口的时候调用
//部分 API 在 ready 事件触发后才使用
app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    // 在 macOS 系统内, 如果没有已开启的应用窗口
    // 点击托盘图标时通常会重新创建一个新窗口
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});
// 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 因此, 通常
// 对应用程序和它们的菜单栏来说应该时刻保持激活状态,
// 直到用户使用 Cmd + Q 明确退出
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
