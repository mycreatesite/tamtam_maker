import {tamtam_default} from './components/plugin/01_tamtam_default';
import {tamtam_excited} from './components/plugin/02_tamtam_excited';
import {tamtam_crying} from './components/plugin/03_tamtam_crying';
import {tamtam_ochobo} from './components/plugin/04_tamtam_ochobo';
import {tamtam_sour} from './components/plugin/05_tamtam_sour';

figma.showUI(__html__);
figma.ui.resize(300,580);

figma.ui.onmessage = msg => {

  if (msg.type === 'create-tamtam') {
    const nodes: SceneNode[] = [];
    //SVGの用意
    let vector;
    switch(msg.tamtamType) {
      case 'default':
        vector = figma.createNodeFromSvg(tamtam_default);
        break;
      case 'excited':
        vector = figma.createNodeFromSvg(tamtam_excited);
        break;
      case 'crying':
        vector = figma.createNodeFromSvg(tamtam_crying);
        break;
      case 'ochobo':
        vector = figma.createNodeFromSvg(tamtam_ochobo);
        break;
      case 'sour':
        vector = figma.createNodeFromSvg(tamtam_sour);
        break;
      default:
        console.log('そんなたむたむはいませんよ');
    }

    if(vector) {
      //サイズの設定
      const sizeNum = parseInt(msg.tamtamSize);
      vector.resize(sizeNum,sizeNum);
      //色の設定
      const rgb = hexToRgb(msg.tamtamColor);
      let baseLayer = vector.findOne(n => n.name === "baseLayer") as VectorNode;
      const fills = clone(baseLayer.fills);
      fills.color = {
        r: rgb.r,
        g: rgb.g,
        b: rgb.b,
      }
      baseLayer.fills = fills;
      //ページに挿入
      figma.currentPage.appendChild(vector);
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

//baseLayerの色を変更するためにfillsをクローンする必要がある
function clone(val: readonly Paint[] | typeof figma.mixed) {
  return JSON.parse(JSON.stringify(val));
}
//hex→rgbに変換
function hexToRgb(hex: String) {
  const r = parseInt(hex.substring(1,3), 16);
  const g = parseInt(hex.substring(3,5), 16);
  const b = parseInt(hex.substring(5,7), 16);
  return { r: r / 255, g: g / 255, b: b / 255 };
}