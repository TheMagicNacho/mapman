import { useEffect, useState, useRef } from "react";
import { Cartesian2, Cartesian3, Color, ScreenSpaceEventHandler, ScreenSpaceEventType } from "cesium";
import Cesium from "cesium";
import { Viewer, Entity, Scene, Globe, Camera, CesiumMovementEvent, CesiumComponentRef, Callback } from 'resium';
import { Button, Card, Elevation, FormGroup, InputGroup } from "@blueprintjs/core";
import { invoke } from "@tauri-apps/api/tauri";

import "./App.css";

function Data(setUserPoint: any, value: string) {
  return (
    <FormGroup
    label="X"
    labelFor="text-input"
    inline={true}
  >
    <InputGroup 
      id="text-input"
      defaultValue={value}
      onChange={(e) => {
        setUserPoint(new Cartesian3(Number(e.target.value), userPoint.y, userPoint.z));
      }}
    />
  </FormGroup>
  )
}
    
function App() {
  let start = Cartesian3.fromDegrees(-74.0707383, 40.7117244, 1000);
  const viewerRef = useRef<CesiumComponentRef<Cesium.Viewer>>(null);

  // create a state that stores the mouse position
  const [userPoint, setUserPoint] = useState(start);

  function handleClick(event: CesiumMovementEvent) {
    const point: Cartesian2 = event.position ?? new Cartesian2(0, 0);
    const cartesian = viewerRef.current?.cesiumElement.scene.camera.pickEllipsoid(point);
    if (cartesian) {
      setUserPoint(cartesian);
    }
  }


  return (
    <>

      <Card style={{
        zIndex: 1,
        position: "absolute",
        right: 0,
        margin: "5%",
      }} interactive={true} elevation={Elevation.TWO}>
        <h5>Card heading</h5>

      <Data setUserPoint={setUserPoint} value={userPoint.x.toString()} />
      <Data setUserPoint={setUserPoint} value={userPoint.y.toString()} />
      <Data setUserPoint={setUserPoint} value={userPoint.z.toString()} />

      </Card>
        <Viewer 
          style={{
            position: "absolute",
            zIndex: 0,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}

      ref={viewerRef}
      timeline={false}
      homeButton={false}
      animation={false}
      onClick={handleClick}
    
    >
      <Entity
        // name="Point"
        position={userPoint}
        point={{ pixelSize: 10, color: Color.WHITE }}
        
        // description="hoge"
        // custom icon
      > WEWRWERWWER</Entity>

      <Scene

      />
      <Globe />
      <Camera />

    </Viewer>
    </>

    
  );
}

export default App;
