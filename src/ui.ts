import './ui.css';

window.addEventListener('load', () => {
  const create = document.getElementById('create')!;
  const cancel = document.getElementById('cancel')!;
  const tamtamTypeInput = document.getElementById('tamtamType') as HTMLSelectElement;
  const tamtamColorInput = document.getElementById('tamtamColor') as HTMLInputElement;
  const tamtamColorDefaultBtn = document.getElementById('tamtamColorDefault') as HTMLButtonElement;
  const tamtamSizeInput = document.getElementById('tamtamSize') as HTMLInputElement;
  const defaultColor = '#D3D3D3';

  tamtamColorDefaultBtn.onclick = () => {
    tamtamColorInput.value = defaultColor;
  }

  create.onclick = () => {
    const tamtamType = tamtamTypeInput.value;
    const tamtamColor = tamtamColorInput.value;
    const tamtamSize = tamtamSizeInput.value;
    parent.postMessage({ pluginMessage: { type: 'create-tamtam', tamtamType, tamtamColor, tamtamSize } }, '*')
  }

  cancel.onclick = () => {
    parent.postMessage({ pluginMessage: { type: 'cancel' } }, '*')
  }
})