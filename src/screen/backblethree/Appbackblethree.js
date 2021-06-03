import React, {
  useRef,
  Suspense,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  NativeEventEmitter,
  NativeModules,
  Platform,
  PermissionsAndroid,
  FlatList,
  ScrollView,
  AppState,
  Dimensions,
  Item,
} from 'react-native';
import Controls from './Controls'

import BleManager from 'react-native-ble-manager';
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

let wsPointData = [];
const SEPARATION = 30, AMOUNTX = 64, AMOUNTY = 64;
// const ws = new WebSocket('ws://127.0.0.1:9999');


let particles, count = 0;
let maxv = 0;
let minv = 100;
let dv = 0;
let pointArr = [];
let inputArr = [];
let smoothBig = [];
let bigArr = [];
let bigArrg = [];
let fixbigArrg = [];
let object;
let smoothdiff = 1;
let diffr;
let computeResult;
let shoe
let countDownNumber = 5;

import {Canvas, useFrame, useThree} from 'react-three-fiber';
import {loadDaeAsync, Renderer, THREE, utils} from 'expo-three';
import {ExpoWebGLRenderingContext, GLView} from 'expo-gl';
import {useSprings, useSpring, a} from 'react-spring/three';

global.THREE = global.THREE || THREE;

const number = 35;

const colors = [
  '#A2CCB6',
  '#FCEEB5',
  '#EE786E',
  '#e0feff',
  'lightpink',
  'lightblue',
];

const random = (i) => {
  const r = Math.random();
  return {
    position: [100 - Math.random() * 200, 100 - Math.random() * 200, i * 1.5],
    color: colors[Math.round(Math.random() * (colors.length - 1))],
    scale: [1 + r * 14, 1 + r * 14, 1],
    rotation: [0, 0, THREE.Math.degToRad(Math.round(Math.random()) * 45)],
  };
};

const data = new Array(number).fill().map(() => {
  return {
    color: colors[Math.round(Math.random() * (colors.length - 1))],
    args: [0.1 + Math.random() * 9, 0.1 + Math.random() * 9, 10],
  };
});



function Box(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef();
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    if (mesh && mesh.current) {
      mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
    }
  });
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? [60, 60, 60] : [60, 60, 60]}
      onClick={(e) => setActive(!active)}
      onPointerOver={(e) => setHover(true)}
      onPointerOut={(e) => setHover(false)}>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial
        attach="material"
        color={hovered ? 'hotpink' : 'hotpink'}
      />
    </mesh>
  );
}

function Lights() {
  return (
    <group>
      <pointLight intensity={0.3} />
      <ambientLight intensity={2} />
      <spotLight
        castShadow
        intensity={0.2}
        angle={Math.PI / 7}
        position={[150, 150, 250]}
        penumbra={1}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
    </group>
  );
}

class App extends React.Component {

  render() {
    return (
      <View style={{flexDirection: 'column', flex: 1}}>
        
        <View style={{flex: 5}}>
          <View style={styles.three}>
            <Canvas 
            shadowMap camera={{position: [0, 0, 100], fov: 100}}
            >
              {/* <Box position={[-1.2, 0, 0]} /> */}
              {/* <Controls /> */}
              <Particles pointCount={1024} />
              {/* <Lights /> */}
              {/*<Content />*/}
            </Canvas>
          </View>
        </View>
      </View>
    );
  }
}

function Particles(props) {


  const spite = new THREE.TextureLoader().load(require('./circle.png'));
  const attrib = useRef();


  //变量放到内存，高速调用
  const [positions, colors] = useMemo(() => {

    bigArrg = []
    bigArr = []
    let positions = [], colors = [];
    let i = 0, j = 0;
    for (let iy = 0; iy < AMOUNTX; iy++) {
      for (let ix = 0; ix < AMOUNTY; ix++) {
        positions[i] = ix * SEPARATION - ((AMOUNTX * SEPARATION) / 2) - 1000; // x
        positions[i + 1] = 0; // y
        positions[i + 2] = iy * SEPARATION - ((AMOUNTY * SEPARATION) / 2); // z


        bigArr.push(1);
        bigArrg.push(1);
        wsPointData.push(1);
        smoothBig.push(1);

        colors[i] = 1;
        colors[i + 1] = 0.1;
        colors[i + 2] = 0;

        i += 3;
        j++;
      }
    }
    return [new Float32Array(positions), new Float32Array(colors)];
    // }, [pointCount]);
  });

  return (
    <points>

      <bufferGeometry attach='geometry'>
        <bufferAttribute attachObject={['attributes', 'position']} count={positions.length / 3} array={positions}
          itemSize={3} />
        <bufferAttribute ref={attrib} attachObject={['attributes', 'color']} count={colors.length / 3} array={colors}
          itemSize={3} />
      </bufferGeometry>
      <pointsMaterial map={spite} attach='material' vertexColors size={25} sizeAttenuation={true} transparent={true}
        alphaTest={0.8} />
    </points>
  );
}

export default App;
const styles = StyleSheet.create({
  blue: {
    flex: 2,
  },
  three: {
    flex: 1,
  },
});
