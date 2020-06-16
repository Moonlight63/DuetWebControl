
// import { Vector3 } from 'three';

//Variables
const extrusionVertices = [];
const extrusionPaths = [];
const pathVertices = [];
let state = {
    x: 0,
    y: 0,
    z: 0,
    e: 0,
    f: 0
};
let relative = false;
let lastVec;

self.addEventListener("message", ({ data }) => {

    //Remove comments and split
    let gcode = data.replace(/;.+/g, '').split('\n');
    
    
    console.time("Loop Time: "); //514ms
    for (let i = 0; i < gcode.length; i++) {
        //Parse tokens
        let tokens = gcode[i].split(' ');
        const command = tokens[0].toUpperCase();
        const args = {};
        tokens = tokens.splice(1);

        //Parse arguments
        for (let i = 0; i < tokens.length; i++) {
            //If not null, store argument
            if (tokens[i][0] != null) {
                const key = tokens[i][0].toLowerCase();
                const value = parseFloat(tokens[i].substring(1));
                args[key] = value;
            }
        }

        //Convert GCODE to Three.JS land

        //Linear move
        if (command == 'G0' || command == 'G1') {
            const line = {
                x: args.x != null ? absolute(relative, state.x, args.x) : state.x,
                y: args.y != null ? absolute(relative, state.y, args.y) : state.y,
                z: args.z != null ? absolute(relative, state.z, args.z) : state.z,
                e: args.e != null ? absolute(relative, state.e, args.e) : state.e,
                f: args.f != null ? absolute(relative, state.f, args.f) : state.f
            };

            //Only push valid coordinates/states
            if (!isNaN(line.x) &&
                !isNaN(line.y) &&
                !isNaN(line.z) &&
                !isNaN(line.e) &&
                !isNaN(line.f)
            ) {
                //Extruding
                if (delta(relative, state.e, line.e) > 0) {
                    extrusionVertices.push(line.x, line.y, line.z);							
                    extrusionPaths.push([lastVec, [line.x, line.y, line.z]]);
                }
                //Path
                else {
                    pathVertices.push([line.x, line.y, line.z]);
                }

                lastVec = [line.x, line.y, line.z];
            }

            //Update position
            state = line;
        }
        //Absolute positioning
        else if (command == 'G90') {
            relative = false;
        }
        //Relative positioning
        else if (command == 'G91') {
            relative = true;
        }
        //Set position
        else if (command == 'G92') {
            state = args;
        }
    }
    console.timeEnd("Loop Time: "); //514ms



    let chunkSize = Math.ceil(extrusionPaths.length / 4);
    let currentChunk = [];
    let chunks = [];
    extrusionPaths.forEach(path => {
        if(currentChunk.length === chunkSize) {
            chunks.push(currentChunk);
            currentChunk = [];
        }						
        currentChunk.push(path);
    })
    chunks.push(currentChunk);

    // self.postMessage(extrusionPaths);
    self.postMessage(chunks);
});


//Calculate the delta between 2 vertices
function delta(relative, vertex1, vertex2) {
	return relative ? vertex2 : vertex2 - vertex1;
}

//Calculate the absolute value between 2 vertices
function absolute(relative, vertex1, vertex2) {
	return relative ? vertex1 + vertex2 : vertex2;
}