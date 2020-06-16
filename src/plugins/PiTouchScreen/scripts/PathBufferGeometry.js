
import { 
    Geometry, 
    BufferGeometry,
    Float32BufferAttribute,
    Vector2,
    Vector3
} from 'three';

import { LinearCurve3 } from './LinearCurve3'

// PathGeometry

function PathGeometry( points, radius, radialSegments, closed ) {

	Geometry.call( this );

	this.type = 'PathGeometry';

	this.parameters = {
		points: points,
		radius: radius,
		radialSegments: radialSegments,
		closed: closed
	};


	var bufferGeometry = new PathBufferGeometry( points, radius, radialSegments, closed );

	// expose internals

	this.tangents = bufferGeometry.tangents;
	this.normals = bufferGeometry.normals;
    this.binormals = bufferGeometry.binormals;
    this.curve = bufferGeometry.curve;

	// create geometry

	this.fromBufferGeometry( bufferGeometry );
	this.mergeVertices();

}

PathGeometry.prototype = Object.create( Geometry.prototype );
PathGeometry.prototype.constructor = PathGeometry;

// PathBufferGeometry

function PathBufferGeometry( points, radius, radialSegments, closed ) {

	BufferGeometry.call( this );

    this.type = 'PathBufferGeometry';
    
    this.path = new LinearCurve3(points);

	this.parameters = {
		points: points,
		radius: radius,
		radialSegments: radialSegments,
		closed: closed
	};

	radius = radius || 1;
	radialSegments = radialSegments || 8;
    closed = closed || false;

	var frames = this.path.computeFrenetFrames( points.length*3, closed );

	// expose internals

	this.tangents = frames.tangents;
	this.normals = frames.normals;
	this.binormals = frames.binormals;

	// helper variables

	var vertex = new Vector3();
	var normal = new Vector3();
	var uv = new Vector2();
	var P = new Vector3();

	var i, j;

	// buffer

	var vertices = [];
	var normals = [];
	var uvs = [];
	var indices = [];

	// create buffer data

	generateBufferData(this.path);

	// build geometry

	this.setIndex( indices );
	this.setAttribute( 'position', new Float32BufferAttribute( vertices, 3 ) );
	this.setAttribute( 'normal', new Float32BufferAttribute( normals, 3 ) );
	this.setAttribute( 'uv', new Float32BufferAttribute( uvs, 2 ) );

	// functions

	function generateBufferData(path) {

		for ( i = 0; i <= points.length; i ++ ) {
            generateSegment( i, path );
		}

		// if the geometry is not closed, generate the last row of vertices and normals
		// at the regular position on the given path
		//
		// if the geometry is closed, duplicate the first row of vertices and normals (uvs will differ)

		//generateSegment( ( closed === false ) ? points.length : 0, path );

		// uvs are generated in a separate function.
		// this makes it easy compute correct values for closed geometries

		generateUVs();

		// finally create faces

		generateIndices();

	}

	function generateSegment( i, path ) {

		// we use getPointAt to sample evenly distributed points from the given path

		P = path.getPointAbs( i , P );

		// retrieve corresponding normal and binormal

		// var N = frames.normals[ i ];
		// var B = frames.binormals[ i ];

		// generate normals and vertices for the current segment

		for ( j = 0; j <= radialSegments; j ++ ) {

			// var v = j / radialSegments * Math.PI * 2;

			// var sin = Math.sin( v );
			// var cos = - Math.cos( v );

			// normal

			// normal.x = ( cos * N.x + sin * B.x );
			// normal.y = ( cos * N.y + sin * B.y );
			// normal.z = ( cos * N.z + sin * B.z );
			// normal.normalize();

			// normals.push( normal.x, normal.y, normal.z );

			// vertex

			vertex.x = P.x + radius * normal.x;
			vertex.y = P.y + radius * normal.y;
			vertex.z = P.z + radius * normal.z;

			vertices.push( vertex.x, vertex.y, vertex.z );

		}

	}

	function generateIndices() {

		for ( j = 1; j <= points.length; j ++ ) {

			for ( i = 1; i <= radialSegments; i ++ ) {

				var a = ( radialSegments + 1 ) * ( j - 1 ) + ( i - 1 );
				var b = ( radialSegments + 1 ) * j + ( i - 1 );
				var c = ( radialSegments + 1 ) * j + i;
				var d = ( radialSegments + 1 ) * ( j - 1 ) + i;

				// faces

				indices.push( a, b, d );
				indices.push( b, c, d );

			}

		}

	}

	function generateUVs() {

		for ( i = 0; i <= points.length; i ++ ) {

			for ( j = 0; j <= radialSegments; j ++ ) {

				uv.x = i / points.length;
				uv.y = j / radialSegments;

				uvs.push( uv.x, uv.y );

			}

		}

	}

}

PathBufferGeometry.prototype = Object.create( BufferGeometry.prototype );
PathBufferGeometry.prototype.constructor = PathBufferGeometry;

PathBufferGeometry.prototype.toJSON = function () {

	var data = BufferGeometry.prototype.toJSON.call( this );

	data.path = this.parameters.path.toJSON();

	return data;

};

export { PathGeometry, PathBufferGeometry };