const setButton = document.getElementById('set');
const titleInput = document.getElementById('title');
setButton.addEventListener('click', () => {
    const title = titleInput.value;
    window.electronAPI.setTitle(title);     //使用函数
});

const btn = document.getElementById('btn');
const filePathElement = document.getElementById('filePath');

btn.addEventListener('click', async () => {
const filePath = await window.electronAPI.openFile();   //获取返回的文件路径值
filePathElement.innerText = filePath;   //显示文件名
})

const counter = document.getElementById('counter')

window.electronAPI.handleCounter((event, value) => {
  const oldValue = Number(counter.innerText)
  const newValue = oldValue + value
  counter.innerText = newValue
  event.sender.send('counter-value', newValue)
})
