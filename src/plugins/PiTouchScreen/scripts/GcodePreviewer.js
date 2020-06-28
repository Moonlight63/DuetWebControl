

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
	// ArrowHelper,
	Vector3,
    MeshToonMaterial,
    GridHelper,
    // CubeTextureLoader,
    // SphereBufferGeometry,
    VertexColors,
    BackSide,
    SphereGeometry,
	// Box3Helper,
	// SphereBufferGeometry,
	// WireframeGeometry,
	// LineSegments
} from 'three';
import {
	OrbitControls
} from 'three/examples/jsm/controls/OrbitControls';
import { PathBufferGeometry } from './PathGeometry'


export default class GcodePreviewer {

    constructor(canvas, bed, theme, gcode) {

        //Canvas
        this.canvas = canvas;


        //Renderer
        this.renderer = new WebGLRenderer({
            antialias: true
        });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(
            this.canvas.clientWidth,
            this.canvas.clientHeight
        );
        this.renderer.encoding = GammaEncoding;
        this.renderer.outputEncoding = GammaEncoding;
        this.renderer.shadowMap.enabled = true;
        this.canvas.appendChild(this.renderer.domElement);


        //Camera
        this.camera = new PerspectiveCamera(
            50,
            this.canvas.clientWidth / this.canvas.clientHeight,
            0.1,
            700
        );
        // this.camera.position.set(-bed.X/2, 0, 2);
        this.camera.up = new Vector3(0, 0, 1);


        //Orbit controls
        this.controls = new OrbitControls(this.camera, this.canvas);
        this.controls.rotateSpeed = 0.7;
        this.controls.minDistance = 1;
        this.controls.maxDistance = 300;
        // this.controls.minPolarAngle = 0;
        this.controls.maxPolarAngle = Math.PI;
        //this.controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
        //this.controls.dampingFactor = 0.05;
        this.controls.screenSpacePanning = true;
        this.controls.mouseButtons = {
            LEFT: MOUSE.PAN,
            MIDDLE: MOUSE.DOLLY,
            RIGHT: MOUSE.ROTATE
        };
        this.controls.addEventListener( 'change', this.render.bind(this) );


        //Scene
        this.scene = new Scene();
        // this.scene.background = new Color(theme.backgroundColor);
        // this.scene.background = new Color('#888888');

        let envrad = 1;

        this.envSphere = new Mesh(
            new SphereGeometry(envrad, 32, 32),
            new MeshBasicMaterial({ vertexColors: VertexColors, side: BackSide })
            );

        this.envSphere.renderOrder = -1;

        let getColorByZ = (z) => {
            // Terrain color scheme (i.e. from blue to red, asymmetric)
            z = Math.max(Math.min(z, envrad), -envrad);
            const hue = ((z + envrad) / envrad) / 2;
            return new Color(hue/1.2, hue/1.1, hue);
        };
        
        // Apply colors to the faces
        let setFaceColors = (geometry) => {
            for (let i = 0; i < geometry.faces.length; i++) {
                const face = geometry.faces[i];
                const a = getColorByZ(geometry.vertices[face.a].z);
                const b = getColorByZ(geometry.vertices[face.b].z);
                const c = getColorByZ(geometry.vertices[face.c].z);
        
                if (face.vertexColors.length < 3) {
                    face.vertexColors = [a, b, c];
                } else {
                    face.vertexColors[0].copy(a);
                    face.vertexColors[1].copy(b);
                    face.vertexColors[2].copy(c);
                }
            }
            geometry.colorsNeedUpdate = true;
        }

        setFaceColors(this.envSphere.geometry);

        this.scene.add(this.envSphere);




        //Plane
        this.plane = new Mesh(
            new PlaneBufferGeometry(),
            new MeshBasicMaterial({
                color: new Color(theme.bedColor)
            })
        );
        //this.plane.rotation.x = -Math.PI / 2;
        this.plane.scale.set(bed.X, bed.Y, 1);
        //this.scene.add(this.plane);

        let grid = new GridHelper(300, 30);
        grid.rotation.x = -Math.PI / 2;
        this.scene.add(grid);

        grid.renderOrder = 998;
        grid.onBeforeRender = function( renderer ) { renderer.clearDepth(); };


        // Lights
        // var light = new AmbientLight( 0x404040 ); // soft white light
        //this.scene.add( light );

        // var light2 = new HemisphereLight( 0xffffbb, 0x080820, 1 );
        // var light2 = new HemisphereLight(0xfaaffff, 0x330000, 1);
        var light2 = new HemisphereLight(0xfffffff, 0x000000, 1);
        this.scene.add(light2);


        // Materials
        this.extrusionMaterial = new MeshToonMaterial({
			color: theme.extrusionColor
		});


        // Helper
        // Make axis arrows for XYZ
        // this.scene.add(new ArrowHelper(new Vector3(1, 0, 0), new Vector3(0, 0, 0), 5, 0xFF0000));
        // this.scene.add(new ArrowHelper(new Vector3(0, 1, 0), new Vector3(0, 0, 0), 5, 0x00FF00));
        // this.scene.add(new ArrowHelper(new Vector3(0, 0, 1), new Vector3(0, 0, 0), 5, 0x0000FF));

        this.mesh = null;

        //GCODE
        if (gcode != null) {
            this.loadGcode(gcode);
        }

        //Subscribe to resize event
        window.addEventListener('resize', this.resize);

        //Start
        // const animate = () => {
        //     if (!this.destroyed) {
        //         // this.controls.update();
        //         requestAnimationFrame(animate);
        //         this.renderer.render(this.scene, this.camera);
        //     }
        // };
        // animate();

        //Environment
        if (process.env.NODE_ENV == 'development' || process.env.NODE_ENV == 'testing') {
            window.getVueGcodeViewerState = () => {
                return this;
            };
        }

    }

    redraw() {
        //Update renderer size
        this.renderer.setSize(
            this.canvas.clientWidth,
            this.canvas.clientHeight
        );

        //Update camera aspect ratio
        this.camera.aspect = this.canvas.clientWidth / this.canvas.clientHeight;
        this.camera.updateProjectionMatrix();
    }

    render() {
        // requestAnimationFrame(this.render);
        // console.log(this);
        this.envSphere.position.copy(this.camera.position);
        this.renderer.render(this.scene, this.camera);
    }

    resize() {
        //Update renderer size
        this.renderer.setSize(
            this.canvas.clientWidth,
            this.canvas.clientHeight
        );
    
        //Update camera aspect ratio
        this.camera.aspect = this.canvas.clientWidth / this.canvas.clientHeight;
        this.camera.updateProjectionMatrix();
    }


    loadGcode(raw) {
        if (raw != null && raw != undefined && raw != "") {
            
            if ( this.mesh != null ) {
                this.scene.remove(this.mesh);
                // this.render();
            }

			console.log('got gcode');
				
			console.time("Parse: ");
			return this.parse(raw).then((object) => {
                console.timeEnd("Parse: ");
                
                this.mesh = new Mesh(object.geo, this.extrusionMaterial);

                this.mesh.renderOrder = 999;

				this.scene.add(this.mesh);

				this.mesh.geometry.computeBoundingSphere();
			
                let boundingSphere = this.mesh.geometry.boundingSphere;
                
                this.mesh.geometry.translate(-boundingSphere.center.x, -boundingSphere.center.y, 0);
				
				const fov = this.camera.fov * (Math.PI / 180);
				let cameraZ = Math.abs(boundingSphere.radius / 4 * Math.tan(fov * 2));

				this.camera.position.set(-cameraZ * 1.1, -cameraZ * 1.1, cameraZ / 2);
				this.controls.target = boundingSphere.center;
				this.camera.position.add(boundingSphere.center);
                this.camera.lookAt(boundingSphere.center);
                
                this.render();
			});
		}

    }

    parse(gcode) {

        //Calculate the delta between 2 vertices
        const delta = (relative, vertex1, vertex2) => {
            return relative ? vertex2 : vertex2 - vertex1;
        }

        //Calculate the absolute value between 2 vertices
        const absolute = (relative, vertex1, vertex2) => {
            return relative ? vertex1 + vertex2 : vertex2;
        }


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

			//Remove comments
            gcode = gcode.replace(/;.+/g, '').split('\n');
            
			//Parse commands
			let lastVec;
			for (let i = 0; i < gcode.length; i++) {
				//Parse tokens
				let tokens = gcode[i].split(' ');
				const command = tokens.shift().toUpperCase();
				const args = {};

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
							extrusionPaths.push([lastVec, [line.x, line.y, line.z]]);
						}
						//Path
						else {
							// pathVertices.push(line.x, line.y, line.z);
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
			return resolve({
				geo: new PathBufferGeometry(extrusionPaths, 0.1, 3, false)
            });
            
        });

    }



    teardown() {
        //Unsubscribe to resize event
        window.removeEventListener('resize', this.resize);
    
        //Clean everything in the scene
        this.scene.children.forEach(object => {
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

            this.scene.remove(object);
        });
    
        //Disable animation loop
        this.destroyed = true;
    
        //Delete scene and camera
        delete this.scene;
        delete this.camera;
    
        //Dispose of controls and renderer
        this.controls.dispose();
        this.renderer.dispose();
    }

}



