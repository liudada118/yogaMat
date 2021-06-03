import {ExpoWebGLRenderingContext, GLView} from 'expo-gl';
import {Renderer, TextureLoader} from 'expo-three';
import * as React from 'react';
import {
  AmbientLight,
  BoxBufferGeometry,
  BufferAttribute,
  BufferGeometry,
  PointsMaterial,
  Fog,
  GridHelper,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  PointLight,
  Scene,
  SpotLight,
  Color,
  Points,
  WebGLRenderer,
  Group,
  Material,
  Colors,
} from 'three';
import {AsyncStorage, ToastAndroid} from 'react-native';
import {wsUrl} from '../http/axios';
//let pointArr = new Int32Array();

let pointArr = [];
let inputArr = [];
let smoothBig = [];
let bigArr = [];
let bigArrg = [];
let ws = null;
export default class App extends React.Component {
  state = {
    isConnected: false,
    data: null,
  };

  pointArr = [];
  inputArr = [];
  smoothBig = [];
  bigArr = [];
  bigArrg = [];

  componentWillUnmount() {
    if (ws != null) {
      ws.close();
    }
  }

  componentDidMount() {
    AsyncStorage.getItem('nowDeviceId', (error, result) => {
      if (!error) {
        const res = JSON.parse(result);
        console.log('AsyncStorage******************', res);
        const ws_sensor_url = wsUrl + 'sensor/' + res;
        ToastAndroid.show(ws_sensor_url, 4);
        ws = new WebSocket(ws_sensor_url);

        ws.onopen = () => {
          // connection opened
          console.info('websocket connect success');

        };

        ws.onmessage = (e) => {
          let jsonObject = JSON.parse(e.data);
          //处理空数组
          inputArr = new Int32Array(jsonObject.data);
          if (inputArr.length == 0) {
            //console.info("数组为空")
          } else {
            ToastAndroid.show('receive msg', 1);
            pointArr = new Int32Array(jsonObject.data);
            // console.info(pointArr);
          }
        };

        ws.onerror = (e) => {
          // an error occurred
          console.log(e);
        };

        ws.onclose = (e) => {
          // connection closed
          console.info('websocket close success');
          console.log(e.code, e.reason);
        };
      }
    });
  }

  onContextCreateFunction = async (gl: ExpoWebGLRenderingContext) => {
    let timeout;
    const SEPARATION = 50,
      AMOUNTX = 32,
      AMOUNTY = 32;
    let particles,
      count = 0;

    let mouseX = 0,
      mouseY = 0;

    const {drawingBufferWidth: width, drawingBufferHeight: height} = gl;

    const sprite = new TextureLoader().load(require('./circle.png'));
    // Create a WebGLRenderer without a DOM element
    const renderer = new Renderer({gl});
    renderer.setSize(width, height);
    renderer.setClearColor(1, 1);

    const camera = new PerspectiveCamera(1000, width / height, 1, 10000);
    camera.position.z = 1000;
    camera.position.y = 1500;
    camera.position.x = 0;

    const scene = new Scene();
    const numParticles = AMOUNTX * AMOUNTY;

    const positions = new Int32Array(numParticles * 3);
    const sizes = new Int32Array(numParticles);
    const colors = new Float32Array(numParticles * 3);

    let i = 0,
      j = 0;
    bigArr = [];
    bigArrg = [];
    pointArr = [];
    smoothBig = [];
    for (let ix = 0; ix < AMOUNTX; ix++) {
      for (let iy = 0; iy < AMOUNTY; iy++) {
        positions[i] = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2; // x
        positions[i + 1] = 0; // y
        positions[i + 2] = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2; // z

        bigArr.push(1);

        bigArrg.push(1);
        pointArr.push(1);
        smoothBig.push(1);

        sizes[j] = 1;
        i += 3;
        j++;
      }
    }
    const geometry = new BufferGeometry();

    //定义位置
    geometry.setAttribute('position', new BufferAttribute(positions, 3));
    //定义颜色
    geometry.setAttribute('color', new BufferAttribute(colors, 3));
    //定义单点大小
    geometry.setAttribute('size', new BufferAttribute(sizes, 1));
    const material = new PointsMaterial({
      size: 40,
      sizeAttenuation: true,
      map: sprite,
      vertexColors: 2,
      alphaTest: 0.5,
      transparent: true,
    });
    //
    //  material.color=new Color(0,0,255);
    particles = new Points(geometry, material);

    scene.add(particles);
    //矩阵插值这（小矩阵，大矩阵，小矩阵长度）
    function interp(smallMat, bigMat, Length) {
      for (let x = 1; x <= Length; x++) {
        for (let y = 1; y <= Length; y++) {
          bigMat[Length * 2 * (2 * y - 2) + (2 * x - 1) - 1] =
            smallMat[Length * (y - 1) + x - 1] * 10;
        }
      }
    }
    //高斯滤波
    function gaussBlur_1(scl, tcl, w, h, r) {
      var rs = Math.ceil(r * 2.57); // significant radius
      for (var i = 0; i < h; i++) {
        for (var j = 0; j < w; j++) {
          var val = 0,
            wsum = 0;
          for (var iy = i - rs; iy < i + rs + 1; iy++) {
            for (var ix = j - rs; ix < j + rs + 1; ix++) {
              var x = Math.min(w - 1, Math.max(0, ix));
              var y = Math.min(h - 1, Math.max(0, iy));
              var dsq = (ix - j) * (ix - j) + (iy - i) * (iy - i);
              var wght = Math.exp(-dsq / (2 * r * r)) / (Math.PI * 2 * r * r);
              val += scl[y * w + x] * wght;
              wsum += wght;
            }
          }
          tcl[i * w + j] = Math.round(val / wsum);
        }
      }
    }

    function jet(min, max, x) {
      let red, g, blue;
      let dv;
      red = 1.0;
      g = 1.0;
      blue = 1.0;
      if (x < min) {
        x = min;
      }
      if (x > max) {
        x = max;
      }
      dv = max - min;
      if (x < min + 0.25 * dv) {
        red = 0;
        g = (4 * (x - min)) / dv;
      } else if (x < min + 0.5 * dv) {
        red = 0;
        blue = 1 + (4 * (min + 0.25 * dv - x)) / dv;
      } else if (x < min + 0.75 * dv) {
        red = (4 * (x - min - 0.5 * dv)) / dv;
        blue = 0;
      } else {
        g = 1 + (4 * (min + 0.75 * dv - x)) / dv;
        blue = 0;
      }
      var rgb = new Array();
      rgb[0] = parseInt(255 * red + '');
      rgb[1] = parseInt(255 * g + '');
      rgb[2] = parseInt(255 * blue + '');
      return rgb;
    }

    function update() {
      scene.position.y = 1200;

      camera.position.x += (mouseX - camera.position.x) * 0.01;
      camera.position.y += (-mouseY - camera.position.y) * 0.01;
      camera.lookAt(scene.position);

      let positions = particles.geometry.attributes.position.array;
      let scales = particles.geometry.attributes.size.array;
      let colors = particles.geometry.attributes.color.array;
      //线性插值
      interp(pointArr, bigArr, 16);

      //高斯滤波
      gaussBlur_1(bigArr, bigArrg, 32, 32, 1);

      let i = 0,
        j = 0;

      for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
          //输入矩阵数据
          const value = bigArrg[j];
          //柔化处理smooth
          smoothBig[j] = smoothBig[j] + (value - smoothBig[j] + 0.5) / 10;

          //定义颜色（最小，最大，数据）
          const rgb = jet(0, 20, smoothBig[j]);

          //  positions[i +2] = - ((AMOUNTY * SEPARATION) / 2)+ iy * SEPARATION +value ; // y
          positions[i + 1] = -smoothBig[j] * 2;
          //单点大小

          // scales[j] = (Math.sin((ix + count) * 0.3) + 1) * 20 +
          //     (Math.sin((iy + count) * 0.5) + 1) * 20;
          sizes[j] =
            (Math.sin((ix + count) * 0.3) + 1) * 20 +
            (Math.sin((iy + count) * 0.5) + 1) * 20 +
            value * 50;
          //颜色R，G，B
          colors[i] = rgb[0] / 255;
          colors[i + 1] = rgb[1] / 255;
          colors[i + 2] = rgb[2] / 255;
          i += 3;
          j++;
        }
      }

      particles.geometry.attributes.position.needsUpdate = true;
      particles.geometry.attributes.size.needsUpdate = true;
      particles.geometry.attributes.color.needsUpdate = true;
      // particles.material.needsUpdate = true;
      renderer.render(scene, camera);
      count += 0.1;
    }

    // Setup an animation loop
    const render = () => {
      requestAnimationFrame(render);
      update();
      renderer.render(scene, camera);
      gl.endFrameEXP();
    };
    render();
  };

  render() {
    return (
      <GLView
        style={{flex: 1}}
        onContextCreate={this.onContextCreateFunction}
      />
    );
  }
}
