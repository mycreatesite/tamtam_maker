import { tamtam_default } from './components/plugin/01_tamtam_default';
import { tamtam_excited } from './components/plugin/02_tamtam_excited';
import { tamtam_crying } from './components/plugin/03_tamtam_crying';
import { tamtam_ochobo } from './components/plugin/04_tamtam_ochobo';
import { tamtam_sour } from './components/plugin/05_tamtam_sour';

const tamtamSVGs: { [key: string]: string } = {
  tamtam_default,
  tamtam_excited,
  tamtam_crying,
  tamtam_ochobo,
  tamtam_sour,
};

figma.showUI(__html__);
figma.ui.resize(300, 610);

figma.ui.onmessage = msg => {
  if (msg.type === 'create-tamtam') {
    const nodes: SceneNode[] = [];

    //SVGの用意
    const selectedSVG = tamtamSVGs[msg.tamtamType];
    if (!selectedSVG) {
      showError('そんなたむたむはいませんよ');
      return;
    }
    const vector = createAndResizeTamtam(selectedSVG, msg.tamtamColor, msg.tamtamSize);
    if (vector) {
      //フレームもしくはページに挿入
      const selectedNode = figma.currentPage.selection[0];
      if(selectedNode && selectedNode.type === 'FRAME') {
        selectedNode.appendChild(vector);
      } else {
        figma.currentPage.appendChild(vector);
      }
      nodes.push(vector);
    }
    //選択状態にしてviewport内に移動
    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);

    figma.closePlugin('たむたむが爆誕しました。');
  }
  if (msg.type === 'cancel') {
    figma.closePlugin('またつかってね！');
  }
};

function createAndResizeTamtam(svg: string, hex: string, size: string) {
  //SVG画像の用意
  const vector = figma.createNodeFromSvg(svg);
  //サイズの設定
  const sizeNum = parseInt(size);
  vector.resize(sizeNum, sizeNum);
  //色の設定
  const rgb = hexToRgb(hex);
  let baseLayer = vector.findOne(n => n.name === "baseLayer") as VectorNode;
  const fills = clone(baseLayer.fills);
  fills[0].color = {
    r: rgb.r,
    g: rgb.g,
    b: rgb.b,
  }
  baseLayer.fills = fills;

  return vector;
}

//baseLayerの色を変更するためにfillsをクローンする必要がある
function clone(val: readonly Paint[] | typeof figma.mixed) {
  return JSON.parse(JSON.stringify(val));
}

//hex→rgbに変換
function hexToRgb(hex: string) {
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);
  return { r: r / 255, g: g / 255, b: b / 255 };
}

//エラー関数
function showError(message: string) {
  figma.notify(message);
}