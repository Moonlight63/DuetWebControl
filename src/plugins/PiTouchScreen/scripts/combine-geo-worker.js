
import {
    // TubeBufferGeometry, 
    // LineCurve3, 
    Mesh, 
    MeshToonMaterial,
    BufferGeometryLoader
} from 'three';

import BufferGeometryUtils from './BufferGeometryUtils'

let GeoLoader = new BufferGeometryLoader();
let geos = [];

self.addEventListener("message", ({ data }) => {

    let tubeMaterial = new MeshToonMaterial({
        color: data.extrusionColor
    });

    data.geoJson.forEach(geoString => {
        let geo = GeoLoader.parse(geoString);
        geo.computeVertexNormals();
        geos.push(geo);
    });

    let combined = BufferGeometryUtils.mergeBufferGeometries(geos);

    let tubeMesh = new Mesh(combined, tubeMaterial);
    const mesh = tubeMesh.toJSON();

    tubeMaterial.dispose();
    combined.dispose()
    geos.forEach(buf => {buf.dispose();});
    
    
    self.postMessage({
        mesh: mesh,
        // geo: mesh
    });

});