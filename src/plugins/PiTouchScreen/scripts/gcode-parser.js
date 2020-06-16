/* eslint-disable no-unused-vars */
/**
 * @fileoverview GCODE parser
 * Based on https://github.com/mrdoob/three.js/blob/dev/examples/js/loaders/GCodeLoader.js
 * @author tentone
 * @author joewalnes
 * @author wakeful-cloud
 */

import {
	// LineBasicMaterial,
	// BufferGeometry,
	// Float32BufferAttribute,
	// Line,
	// CatmullRomCurve3,
	// TubeBufferGeometry,
	// Vector3,
	Mesh,
	MeshToonMaterial,
	// BufferGeometryLoader,
	// ObjectLoader,
	// LineCurve3,
	// BufferGeometry
} from 'three';


// import BufferGeometryUtils from './BufferGeometryUtils'
// import { LinearCurve3 } from './LinearCurve3.js'
// import { PathBufferGeometry } from './PathBufferGeometry'
import { PathBufferGeometry } from './PathGeometry'
// import { CubeTestBufferGeometry } from './CubeTestGeo'

// import * as GcodeParser from './cncjs-gcode-parser'

/**
 * @class GCodeParser GCODE parser
 */
export default class GCodeParser {
	/**
	 * @param {Color} extrusionColor
	 * @param {Color} pathColor
	 */
	constructor(extrusionColor, pathColor) {
		// this.extrusionMaterial = new LineBasicMaterial({
		// 	color: extrusionColor
		// });
		// this.pathMaterial = new LineBasicMaterial({
		// 	color: pathColor
		// });
		this.tubeMaterial = new MeshToonMaterial({
			color: extrusionColor
		});

		this.extrusionColor = extrusionColor;
		this.pathColor = pathColor;
	}

	/**
	 * Parse GCODE
	 * @param {String} gcode The raw GCODE
	 * @returns {Promise<Object>}
	 */
	async parse(gcode) {


		//Parse asynchronously and without blocking Three.JS
		return new Promise(resolve => {
			//Variables
			// const extrusionVertices = [];
			const extrusionPaths = [];
			// const pathVertices = [];
			let state = {
				x: 0,
				y: 0,
				z: 0,
				e: 0,
				f: 0
			};
			let relative = false;


			// console.time("cnc parser: ");
			// GcodeParser.parseString(gcode, (err, results) => {
			// 	console.log(err);
			// 	console.log(results);
			// 	console.timeEnd("cnc parser: ");
			// });

			//Remove comments
			console.time("Split Lines: ");
			gcode = gcode.replace(/;.+/g, '').split('\n');
			console.timeEnd("Split Lines: ");
			console.time("Parse Loop: ");
			//Parse commands
			let lastVec;
			for (let i = 0; i < gcode.length; i++) {
				//Parse tokens
				let tokens = gcode[i].split(' ');
				const command = tokens.shift().toUpperCase();
				const args = {};
				// tokens = tokens.splice(1);

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
							// extrusionVertices.push(line.x, line.y, line.z);	
							extrusionPaths.push([lastVec, [line.x, line.y, line.z]]);
							// extrusionPaths.push([lastVec, new Vector3(line.x, line.y, line.z)]);
						}
						//Path
						else {
							// pathVertices.push(line.x, line.y, line.z);
						}

						lastVec = [line.x, line.y, line.z]
						// lastVec = new Vector3(line.x, line.y, line.z);
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
			console.timeEnd("Parse Loop: ");

			//Object generation
			// const extrusionBuffer = new BufferGeometry();
			// const pathBuffer = new BufferGeometry();

			// extrusionBuffer.setAttribute(
			// 	'position',
			// 	new Float32BufferAttribute(extrusionVertices, 3)
			// );
			// pathBuffer.setAttribute(
			// 	'position',
			// 	new Float32BufferAttribute(pathVertices, 3)
			// );

			// const extrusionObject = new Line(extrusionBuffer, this.extrusionMaterial);
			// const pathObject = new Line(pathBuffer, this.pathMaterial);



			// let pathGroups = [];
			// let currentGroup = [];
			// extrusionPaths.forEach((path, index) => {
			// 	if (index == 0) {
			// 		if (!path[0].equals(path[1]))
			// 			currentGroup.push(path[0], path[1]);
			// 		else
			// 			currentGroup.push(path[1]);
			// 	} 
			// 	else if (path[0].equals(extrusionPaths[index-1][1])) {
			// 		currentGroup.push(path[1]);
			// 	} else {
			// 		pathGroups.push(currentGroup);
			// 		currentGroup = [];
			// 		if (!path[0].equals(path[1]))
			// 			currentGroup.push(path[0], path[1]);
			// 		else
			// 			currentGroup.push(path[1]);
			// 	}
			// });
			// pathGroups.push(currentGroup);

			// console.log(pathGroups);
			


			// let meshGeo = [];
			// let meshes = [];
			
			console.time("Geo Loop: ");
			// extrusionPaths.forEach(path => {
			// 	let buffer = new TubeBufferGeometry(new LineCurve3(path[0], path[1]), 2, 0.1, 4, false)
			// 	meshGeo.push(buffer);
			// });

			// pathGroups.forEach(path => {
			// 	// console.log(path);
			// 	let buffer;
			// 	if (path.length > 1) {
			// 		if (path.length > 2) {
			// 			// let curve = new LinearCurve3(path);
			// 			buffer = new PathBufferGeometry(path, 0.1, 4, false);
			// 			meshes.push(new Mesh(buffer, this.tubeMaterial));
			// 			meshGeo.push(buffer);
			// 		} else {
			// 			buffer = new TubeBufferGeometry(new LineCurve3(path[0], path[1]), 2, 0.1, 4, false)
			// 		}

			// 	}
			// 	// let bufferHack = new BufferGeometry().merge(buffer, 0); // hack to get around merging dissimilar Geos
				
			// 	// let buffer = new TubeBufferGeometry(new CatmullRomCurve3(path, false), path.length, 0.1, 4, false);
			// });

			let geo = new PathBufferGeometry(extrusionPaths, 0.1, 3, false);

			// let geo = new PathBufferGeometry([[new Vector3(0,0,0), new Vector3(20,0,0)]], 5, 4, false);
			// let geo2 = new CubeTestBufferGeometry([[new Vector3(0,0,0), new Vector3(20,0,0)]], 0.1, 4, false);

			// geo.computeVertexNormals();
			// geo2.dispose();



			console.timeEnd("Geo Loop: ");

			console.time("Combine: ");
			// let combined = BufferGeometryUtils.mergeBufferGeometries(meshGeo);
			console.timeEnd("Combine: ");
			console.time("Mesh: ");
			let tubeMesh = new Mesh(geo, this.tubeMaterial);
			console.timeEnd("Mesh: ");
			
			
			//Cleanup
			// this.extrusionMaterial.dispose();
			// this.pathMaterial.dispose();
			this.tubeMaterial.dispose();
			// extrusionBuffer.dispose();
			// pathBuffer.dispose();
			// meshGeo.forEach(buf => {buf.dispose();});
			// combined.dispose();

			return resolve({
				// path: pathObject,
				extrusion: tubeMesh,
				// meshes: meshes
			});
		});
	}
}

//Calculate the delta between 2 vertices
function delta(relative, vertex1, vertex2) {
	return relative ? vertex2 : vertex2 - vertex1;
}

//Calculate the absolute value between 2 vertices
function absolute(relative, vertex1, vertex2) {
	return relative ? vertex1 + vertex2 : vertex2;
}