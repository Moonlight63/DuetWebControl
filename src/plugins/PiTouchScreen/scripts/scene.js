/**
 * @fileoverview ThreeJS scene management
 */

//Imports
import {
	Color,
	GammaEncoding,
	MOUSE,
	Mesh,
	MeshBasicMaterial,
	PerspectiveCamera,
	PlaneBufferGeometry,
	Scene,
	WebGLRenderer,
	// AmbientLight,
	HemisphereLight,
	ArrowHelper,
	Vector3,
	// Box3Helper,
	// SphereBufferGeometry,
	// WireframeGeometry,
	// LineSegments
} from 'three';
import {
	OrbitControls
} from 'three/examples/jsm/controls/OrbitControls';
import utils from './utils';

//State
const state = {
	camera: null,
	canvas: null,
	controls: null,
	destroyed: false,
	object: null,
	plane: null,
	renderer: null,
	scene: null
};

//Window resize event handler
const resize = () => {
	//Update renderer size
	state.renderer.setSize(
		state.canvas.clientWidth,
		state.canvas.clientHeight
	);

	//Update camera aspect ratio
	state.camera.aspect = state.canvas.clientWidth / state.canvas.clientHeight;
	state.camera.updateProjectionMatrix();
};

/**
 * @function Setup scene
 * @param {Element} canvas HTML canvas element
 * @param {Object} bed Bed dimensions
 * @param {Object} theme Theme
 * @param {String} gcode Raw GCODE
 * @param {Object} position Position
 * @param {Object} rotation Rotation
 * @param {Object} scale Scale
 */
const setup = async (canvas, bed, theme, gcode, position, rotation, scale) => {
	//Canvas
	state.canvas = canvas;

	//Renderer
	state.renderer = new WebGLRenderer({
		antialias: true
	});
	state.renderer.setPixelRatio(window.devicePixelRatio);
	state.renderer.setSize(
		state.canvas.clientWidth,
		state.canvas.clientHeight
	);
	state.renderer.encoding = GammaEncoding;
	state.renderer.outputEncoding = GammaEncoding;
	state.renderer.shadowMap.enabled = true;
	state.canvas.appendChild(state.renderer.domElement);

	//Camera
	state.camera = new PerspectiveCamera(
		50,
		state.canvas.clientWidth / state.canvas.clientHeight,
		0.1,
		200
	);
	// state.camera.position.set(-bed.X/2, 0, 2);

	state.camera.up = new Vector3(0, 0, 1);

	//Orbit controls
	state.controls = new OrbitControls(state.camera, state.canvas);
	state.controls.rotateSpeed = 0.7;
	state.controls.minDistance = 1;
	state.controls.maxDistance = 100;
	// state.controls.minPolarAngle = 0;
	state.controls.maxPolarAngle = Math.PI;
	state.controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
	state.controls.dampingFactor = 0.05;
	state.controls.screenSpacePanning = true;
	state.controls.mouseButtons = {
		LEFT: MOUSE.PAN,
		MIDDLE: MOUSE.DOLLY,
		RIGHT: MOUSE.ROTATE
	};

	//Scene
	state.scene = new Scene();
	state.scene.background = new Color(theme.backgroundColor);

	//Plane
	state.plane = new Mesh(
		new PlaneBufferGeometry(),
		new MeshBasicMaterial({
			color: new Color(theme.bedColor)
		})
	);
	//state.plane.rotation.x = -Math.PI / 2;
	state.plane.scale.set(bed.X, bed.Y, 1);
	//state.scene.add(state.plane);

	// var light = new AmbientLight( 0x404040 ); // soft white light
	//state.scene.add( light );

	// var light2 = new HemisphereLight( 0xffffbb, 0x080820, 1 );
	var light2 = new HemisphereLight(0xfaaffff, 0x330000, 1);
	state.scene.add(light2);

	// Make axis arrows for XYZ
	state.scene.add(new ArrowHelper(new Vector3(1, 0, 0), new Vector3(0, 0, 0), 5, 0xFF0000));
	state.scene.add(new ArrowHelper(new Vector3(0, 1, 0), new Vector3(0, 0, 0), 5, 0x00FF00));
	state.scene.add(new ArrowHelper(new Vector3(0, 0, 1), new Vector3(0, 0, 0), 5, 0x0000FF));

	//GCODE
	if (gcode != null) {

		utils.update.gcode(gcode, theme, state.scene).then(() => {

			//utils.update.position(position);
			//utils.update.rotation(rotation);
			utils.update.scale(scale);

			state.object.extrusion.geometry.computeBoundingSphere();
			state.object.extrusion.geometry.computeBoundingBox();

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

			// const size = boundingBox.getSize();

			// get the max side of the bounding box (fits to width OR height as needed )
			// const maxDim = Math.max( size.x, size.y, size.z )/2;
			const fov = state.camera.fov * (Math.PI / 180);
			// let cameraZ = Math.abs( maxDim / 4 * Math.tan( fov * 2 ) );
			// Calculate the camera distance
			let cameraZ = Math.abs(boundingSphere.radius / 4 * Math.tan(fov * 2));

			console.log(cameraZ);


			state.camera.position.set(-cameraZ * 1.1, -cameraZ * 1.1, cameraZ / 2);
		});

	}

	//Subscribe to resize event
	window.addEventListener('resize', resize);

	//Start
	const animate = () => {
		if (!state.destroyed) {
			// state.controls.update();
			requestAnimationFrame(animate);
			state.renderer.render(state.scene, state.camera);
		}
	};
	animate();

	//Environment
	if (process.env.NODE_ENV == 'development' || process.env.NODE_ENV == 'testing') {
		window.getVueGcodeViewerState = () => {
			return state;
		};
	}
};

/**
 * @function Tear down scene
 */
const teardown = () => {
	//Unsubscribe to resize event
	window.removeEventListener('resize', resize);

	//Clean everything in the scene
	state.scene.children.forEach(object => {
		//Geometry
		if (
			object.geometry != null &&
			typeof object.geometry.dispose == 'function'
		) {
			object.geometry.dispose();
		}

		//Material
		if (
			object.material != null &&
			typeof object.material.dispose == 'function'
		) {
			object.material.dispose();
		}
	});

	//Disable animation loop
	state.destroyed = true;

	//Delete scene and camera
	delete state.scene;
	delete state.camera;

	//Dispose of controls and renderer
	state.controls.dispose();
	state.renderer.dispose();
};

//Export
export {
	setup,
	teardown,
	state
};