import './ui.css';

window.addEventListener('load', () => {
  const create = document.getElementById('create')!;
  const cancel = document.getElementById('cancel')!;

  create.onclick = () => {
    const tamtamType = (<HTMLInputElement>document.getElementById('tamtamType')).value;
    const tamtamColor = (<HTMLInputElement>document.getElementById('tamtamColor')).value;
    const tamtamSize = (<HTMLInputElement>document.getElementById('tamtamSize')).value;
    parent.postMessage({ pluginMessage: { type: 'create-tamtam', tamtamType, tamtamColor, tamtamSize } }, '*')
  }

  cancel.onclick = () => {
    parent.postMessage({ pluginMessage: { type: 'cancel' } }, '*')
  }
  
})