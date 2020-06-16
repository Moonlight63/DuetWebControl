
import {
    TubeBufferGeometry, 
    LineCurve3, 
    // Mesh, 
    // MeshToonMaterial,
    // BufferGeometry,
    Vector3
} from 'three';

import BufferGeometryUtils from './BufferGeometryUtils'


self.addEventListener("message", ({ data }) => {
    
    let meshGeo = [];

    data.paths.forEach(path => {
        let buffer = new TubeBufferGeometry(new LineCurve3(new Vector3().fromArray(path[0]), new Vector3().fromArray(path[1])), 2, 0.1, 4, false)
        meshGeo.push(buffer);
    });

    let combined = BufferGeometryUtils.mergeBufferGeometries(meshGeo);



    const geo = combined.toJSON();
    meshGeo.forEach(buf => {buf.dispose();});
    combined.dispose();
    
    self.postMessage({
        geo: geo
    });

});