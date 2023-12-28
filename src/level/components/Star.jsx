import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Star(props) {
  const { nodes, materials } = useGLTF("./models/star.glb");
  // console.log(nodes, "nodes")
  // console.log(materials, "materials")
  return (
    <group {...props} dispose={null}>
      <mesh
        name="pCylinder3"
        castShadow
        receiveShadow
        geometry={nodes.pCylinder3.geometry}
        // geometry={nodes.Object_4.geometry}
        // geometry={nodes.Object_4.geometry}
        material={materials.blinn2SG}
        // material={materials['scoreboard_logos.001']}
        // material={materials['scoreboard_logos.001']}
      />
    </group>
  );
}

useGLTF.preload("./models/star.glb");
