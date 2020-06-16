
import { 
    Geometry, 
    BufferGeometry,
    Float32BufferAttribute,
    // Vector2,
    // Vector3,
	// LineCurve3
} from 'three';

// import { LinearCurve3 } from './LinearCurve3'

// PathGeometry

function CubeTestGeometry( points, radius, radialSegments, closed ) {

	Geometry.call( this );

	this.type = 'CubeTestGeometry';

	this.parameters = {
		points: points,
		radius: radius,
		radialSegments: radialSegments,
		closed: closed
	};


	var bufferGeometry = new CubeTestBufferGeometry( points, radius, radialSegments, closed );

	// expose internals

	this.tangents = bufferGeometry.tangents;
	this.normals = bufferGeometry.normals;
    this.binormals = bufferGeometry.binormals;
    this.curve = bufferGeometry.curve;

	// create geometry

	this.fromBufferGeometry( bufferGeometry );
	this.mergeVertices();

}

CubeTestGeometry.prototype = Object.create( Geometry.prototype );
CubeTestGeometry.prototype.constructor = CubeTestGeometry;

// PathBufferGeometry

function CubeTestBufferGeometry( points, radius, radialSegments, closed ) {

	BufferGeometry.call( this );

    this.type = 'CubeTestBufferGeometry';
    
    //this.path = new LinearCurve3(points);

	this.parameters = {
		points: points,
		radius: radius,
		radialSegments: radialSegments,
		closed: closed
	};

	radius = radius || 1;
	radialSegments = radialSegments || 8;
    closed = closed || false;

	// var frames = this.path.computeFrenetFrames( points.length, closed );

	// expose internals

	// this.tangents = frames.tangents;
	// this.normals = frames.normals;
	// this.binormals = frames.binormals;

	// helper variables

	// var vertex = new Vector3();
	// var normal = new Vector3();
	// var uv = new Vector2();
	// var P = new Vector3();

	// var i, j;
	// var j;

	// buffer

	var vertices = [
		// front
		{ pos: [-1, -1,  1], norm: [ 0,  0,  1], uv: [0, 1], },
		{ pos: [ 1, -1,  1], norm: [ 0,  0,  1], uv: [1, 1], },
		{ pos: [-1,  1,  1], norm: [ 0,  0,  1], uv: [0, 0], },
	
		{ pos: [-1,  1,  1], norm: [ 0,  0,  1], uv: [0, 0], },
		{ pos: [ 1, -1,  1], norm: [ 0,  0,  1], uv: [1, 1], },
		{ pos: [ 1,  1,  1], norm: [ 0,  0,  1], uv: [1, 0], },
		// right
		{ pos: [ 1, -1,  1], norm: [ 1,  0,  0], uv: [0, 1], },
		{ pos: [ 1, -1, -1], norm: [ 1,  0,  0], uv: [1, 1], },
		{ pos: [ 1,  1,  1], norm: [ 1,  0,  0], uv: [0, 0], },
	
		{ pos: [ 1,  1,  1], norm: [ 1,  0,  0], uv: [0, 0], },
		{ pos: [ 1, -1, -1], norm: [ 1,  0,  0], uv: [1, 1], },
		{ pos: [ 1,  1, -1], norm: [ 1,  0,  0], uv: [1, 0], },
		// back
		{ pos: [ 1, -1, -1], norm: [ 0,  0, -1], uv: [0, 1], },
		{ pos: [-1, -1, -1], norm: [ 0,  0, -1], uv: [1, 1], },
		{ pos: [ 1,  1, -1], norm: [ 0,  0, -1], uv: [0, 0], },
	
		{ pos: [ 1,  1, -1], norm: [ 0,  0, -1], uv: [0, 0], },
		{ pos: [-1, -1, -1], norm: [ 0,  0, -1], uv: [1, 1], },
		{ pos: [-1,  1, -1], norm: [ 0,  0, -1], uv: [1, 0], },
		// left
		{ pos: [-1, -1, -1], norm: [-1,  0,  0], uv: [0, 1], },
		{ pos: [-1, -1,  1], norm: [-1,  0,  0], uv: [1, 1], },
		{ pos: [-1,  1, -1], norm: [-1,  0,  0], uv: [0, 0], },
	
		{ pos: [-1,  1, -1], norm: [-1,  0,  0], uv: [0, 0], },
		{ pos: [-1, -1,  1], norm: [-1,  0,  0], uv: [1, 1], },
		{ pos: [-1,  1,  1], norm: [-1,  0,  0], uv: [1, 0], },
		// top
		{ pos: [ 1,  1, -1], norm: [ 0,  1,  0], uv: [0, 1], },
		{ pos: [-1,  1, -1], norm: [ 0,  1,  0], uv: [1, 1], },
		{ pos: [ 1,  1,  1], norm: [ 0,  1,  0], uv: [0, 0], },
	
		{ pos: [ 1,  1,  1], norm: [ 0,  1,  0], uv: [0, 0], },
		{ pos: [-1,  1, -1], norm: [ 0,  1,  0], uv: [1, 1], },
		{ pos: [-1,  1,  1], norm: [ 0,  1,  0], uv: [1, 0], },
		// bottom
		{ pos: [ 1, -1,  1], norm: [ 0, -1,  0], uv: [0, 1], },
		{ pos: [-1, -1,  1], norm: [ 0, -1,  0], uv: [1, 1], },
		{ pos: [ 1, -1, -1], norm: [ 0, -1,  0], uv: [0, 0], },
	
		{ pos: [ 1, -1, -1], norm: [ 0, -1,  0], uv: [0, 0], },
		{ pos: [-1, -1,  1], norm: [ 0, -1,  0], uv: [1, 1], },
		{ pos: [-1, -1, -1], norm: [ 0, -1,  0], uv: [1, 0], },
	];

	const positions = [];
	const normals = [];
	const uvs = [];
	for (const vertex of vertices) {
		positions.push(...vertex.pos);
		normals.push(...vertex.norm);
		uvs.push(...vertex.uv);
	}
	// var normals = [];
	// var uvs = [];
	// var indices = [];

	// create buffer data

	//generateBufferData();

	console.log(positions);
	// console.log(indices);
	
	

	// build geometry

	// this.setIndex( indices );
	this.setAttribute( 'position', new Float32BufferAttribute( positions, 3 ) );
	// this.setAttribute( 'normal', new Float32BufferAttribute( normals, 3 ) );
	// this.setAttribute( 'uv', new Float32BufferAttribute( uvs, 2 ) );

	console.log(this.getAttribute('position'));
	

	// functions

	// function generateBufferData() {

	// 	var P0 = new Vector3();
	// 	var P1 = new Vector3();

	// 	points.forEach(lineSet => {
	// 		let line = new LineCurve3(lineSet[0], lineSet[1]);

	// 		var frames = line.computeFrenetFrames( 2, closed );

	// 		P0 = line.getPoint(0, P0);
	// 		P0 = line.getPoint(1, P1);

	// 		var N0 = frames.normals[ 0 ];
	// 		var B0 = frames.binormals[ 0 ];

	// 		var N1 = frames.normals[ 1 ];
	// 		var B1 = frames.binormals[ 1 ];

	// 		var norm0 = new Vector3();
	// 		var norm1 = new Vector3();
			
	// 		var vert0 = new Vector3();
	// 		var vert1 = new Vector3();

	// 		let vertLength = vertices.length;

	// 		for ( j = 0; j <= radialSegments; j ++ ) {

	// 			var v = j / radialSegments * Math.PI * 2;
	
	// 			var sin = Math.sin( v );
	// 			var cos = - Math.cos( v );
	
	// 			// normal
	
	// 			norm0.x = ( cos * N0.x + sin * B0.x );
	// 			norm0.y = ( cos * N0.y + sin * B0.y );
	// 			norm0.z = ( cos * N0.z + sin * B0.z );
	// 			norm0.normalize();

	// 			norm1.y = ( cos * N1.y + sin * B1.y );
	// 			norm1.z = ( cos * N1.z + sin * B1.z );
	// 			norm1.x = ( cos * N1.x + sin * B1.x );
	// 			norm1.normalize();
	
	// 			normals.push( norm0.x, norm0.y, norm0.z );
	// 			normals.push( norm1.x, norm1.y, norm1.z );
	
	// 			// vertex
	
	// 			vert0.x = P0.x + radius * norm0.x;
	// 			vert0.y = P0.y + radius * norm0.y;
	// 			vert0.z = P0.z + radius * norm0.z;

	// 			vert1.x = P1.x + radius * norm1.x;
	// 			vert1.y = P1.y + radius * norm1.y;
	// 			vert1.z = P1.z + radius * norm1.z;
				
	// 			vertices.push( vert0.x, vert0.y, vert0.z );
	// 			vertices.push( vert1.x, vert1.y, vert1.z );


	// 			// if(j == radialSegments){
	// 			// 	indices.push( vertLength, vertLength + 1, vertLength + 2 );
	// 			// 	indices.push( vertLength + 1, vertLength + 2, vertLength + 3 );	
	// 			// } else {
	// 				indices.push( vertLength + (j * 2), vertLength + (j * 2) + 1, vertLength + (j * 2) + 2 );
	// 				indices.push( vertLength + (j * 2) + 1, vertLength + (j * 2) + 2, vertLength + (j * 2) + 3 );
	// 			// }
				
	// 		}


	// 	});




		// for ( i = 0; i <= points.length; i ++ ) {
        //     generateSegment( i, path );
		// }

		// if the geometry is not closed, generate the last row of vertices and normals
		// at the regular position on the given path
		//
		// if the geometry is closed, duplicate the first row of vertices and normals (uvs will differ)

		//generateSegment( ( closed === false ) ? points.length : 0, path );

		// uvs are generated in a separate function.
		// this makes it easy compute correct values for closed geometries

		// generateUVs();

		// finally create faces

		// generateIndices();

	// }

	// function generateSegment( i, path ) {

	// 	// we use getPointAt to sample evenly distributed points from the given path

	// 	P = path.getPointAbs( i , P );

	// 	// retrieve corresponding normal and binormal

	// 	var N = frames.normals[ i ];
	// 	var B = frames.binormals[ i ];

	// 	// generate normals and vertices for the current segment

	// 	for ( j = 0; j <= radialSegments; j ++ ) {

	// 		var v = j / radialSegments * Math.PI * 2;

	// 		var sin = Math.sin( v );
	// 		var cos = - Math.cos( v );

	// 		// normal

	// 		normal.x = ( cos * N.x + sin * B.x );
	// 		normal.y = ( cos * N.y + sin * B.y );
	// 		normal.z = ( cos * N.z + sin * B.z );
	// 		normal.normalize();

	// 		normals.push( normal.x, normal.y, normal.z );

	// 		// vertex

	// 		vertex.x = P.x + radius * normal.x;
	// 		vertex.y = P.y + radius * normal.y;
	// 		vertex.z = P.z + radius * normal.z;

	// 		vertices.push( vertex.x, vertex.y, vertex.z );

	// 	}

	// }

	// function generateIndices() {

	// 	for ( j = 1; j <= points.length; j ++ ) {

	// 		for ( i = 1; i <= radialSegments; i ++ ) {

	// 			var a = ( radialSegments + 1 ) * ( j - 1 ) + ( i - 1 );
	// 			var b = ( radialSegments + 1 ) * j + ( i - 1 );
	// 			var c = ( radialSegments + 1 ) * j + i;
	// 			var d = ( radialSegments + 1 ) * ( j - 1 ) + i;

	// 			// faces

	// 			indices.push( a, b, d );
	// 			indices.push( b, c, d );

	// 		}

	// 	}

	// }

	// function generateUVs() {

	// 	for ( i = 0; i <= points.length; i ++ ) {

	// 		for ( j = 0; j <= radialSegments; j ++ ) {

	// 			uv.x = i / points.length;
	// 			uv.y = j / radialSegments;

	// 			uvs.push( uv.x, uv.y );

	// 		}

	// 	}

	// }

}

CubeTestBufferGeometry.prototype = Object.create( BufferGeometry.prototype );
CubeTestBufferGeometry.prototype.constructor = CubeTestBufferGeometry;

CubeTestBufferGeometry.prototype.toJSON = function () {

	var data = BufferGeometry.prototype.toJSON.call( this );

	data.path = this.parameters.path.toJSON();

	return data;

};

export { CubeTestGeometry, CubeTestBufferGeometry };