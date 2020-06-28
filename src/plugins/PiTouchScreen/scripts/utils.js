/**
 * @fileoverview ThreeJS scene utilities
 */

//Imports
import {
	state
} from './scene';
import GCodeParser from './gcode-parser';
// import { Vector3, Box3Helper, SphereBufferGeometry, WireframeGeometry, LineSegments } from 'three';

/**
 * Update various scene properties
 */
const update = {
	/**
	 * @function Update bed
	 */
	bed: bed => {
		const {
			X,
			Y
		} = bed;
		state.plane.scale.set(X, Y, 1);
	},

	/**
	 * @function Update GCODE
	 * @param {String} raw Raw GCODE
	 * @param {Object} theme Theme
	 * @returns {Promise<void>}
	 */
	// gcode: async (raw, theme) =>
	// {
	//   const parser = new GCodeParser(
	//     theme.extrusionColor,
	//     theme.pathColor
	//   );

	//   const object = await parser.parse(raw);

	//   //Add to scene
	//   state.scene.add(object.extrusion);
	//   //state.scene.add(object.path);

	//   //Save for later manipulation
	//   state.object = object;
	// },

	gcode: (raw, theme) => {
		if (raw != null && raw != undefined && raw != "") {
			console.log('got gcode');

			// state.scene.remove(state.scene.object.extrusion);

			const parser = new GCodeParser(
				theme.extrusionColor,
				theme.pathColor
				);
				
			console.time("Parse: ");
			return parser.parse(raw).then((object) => {
				console.timeEnd("Parse: ");
				state.scene.add(object.extrusion);

				// object.meshes.forEach(element => {
				// 	state.scene.add(element);
				// });

				state.object = object;

				state.object.extrusion.geometry.computeBoundingSphere();
				// state.object.extrusion.geometry.computeBoundingBox();

				let boundingSphere = state.object.extrusion.geometry.boundingSphere;
				// let boundingBox = state.object.extrusion.geometry.boundingBox;
				// let center = boundingSphere.center;
				// state.object.extrusion.geometry.translate(-center.x, -center.y, -center.z);

				// var helper = new Box3Helper( boundingBox, 0xffff00 );
				// state.scene.add( helper );
				// let sphereHelperGeo = new SphereBufferGeometry(boundingSphere.radius, 32, 32);
				// let sphereWire = new WireframeGeometry(sphereHelperGeo);
				// let sphereLines = new LineSegments(sphereWire);
				// state.scene.add( sphereLines );

				// let placeholderPosition = new Vector3(
				// 	-boundingSphere.radius,
				// 	-boundingSphere.radius,
				// 	boundingBox.getSize().z/2,
				// );

				// console.log("Placeholder: ");
				// console.log(placeholderPosition);
				
				// console.log("Axis: ");
				// console.log(axis);
				
				
				const fov = state.camera.fov * (Math.PI / 180);
				let cameraZ = Math.abs(boundingSphere.radius / 4 * Math.tan(fov * 2));
				
				// let axis = new Vector3().copy(placeholderPosition).normalize().multiplyScalar(cameraZ);
				// console.log(axis);
				// let newPos = boundingSphere.center.clone().add(axis);
				// console.log(newPos);
				
				
				// console.log(cameraZ);

				state.camera.position.set(-cameraZ * 1.1, -cameraZ * 1.1, cameraZ / 2);
				// state.controls.reset();
				state.controls.target = boundingSphere.center;
				state.camera.position.add(boundingSphere.center);
				state.camera.lookAt(boundingSphere.center);

				// state.camera.position.copy(newPos);
				// state.camera.translateOnAxis(axis, cameraZ);
				// state.camera.lookAt(boundingSphere.center);


			});
		}



		// const object = parser.parse(raw);

		//Add to scene
		// state.scene.add(object.extrusion);
		//state.scene.add(object.path);

		//Save for later manipulation
		// state.object = object;
	},

	/**
	 * @function Update object position
	 * @param {Object} position Position
	 */
	position: position => {
		const {
			X,
			Y,
			Z
		} = position;
		state.object.extrusion.position.set(X, Y, Z);
		state.object.path.position.set(X, Y, Z);
	},

	/**
	 * @function Update object rotation
	 * @param {Object} rotation Rotation
	 */
	rotation: rotation => {
		let {
			X,
			Y,
			Z
		} = rotation;
		X *= Math.PI / 180;
		Y *= Math.PI / 180;
		Z *= Math.PI / 180;
		state.object.extrusion.rotation.set(X, Y, Z);
		state.object.path.rotation.set(X, Y, Z);
	},

	/**
	 * @function Update object scale
	 * @param {Object} scale Scale
	 */
	scale: scale => {
		const {
			X,
			Y,
			Z
		} = scale;
		state.object.extrusion.geometry.scale(Z, X, Y);
		// state.object.path.scale.set(Z, X, Y);
	},

	/**
	 * @function Update scene theme
	 * @param {Object} theme Theme
	 */
	theme: theme => {
		state.object.extrusion.material.color.set(theme.extrusionColor);
		state.object.path.material.color.set(theme.pathColor);
		state.plane.material.color.set(theme.bedColor);
		state.scene.background.set(theme.backgroundColor);
	}
};

//Export
export default {
	update
};