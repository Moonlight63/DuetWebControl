
import { 
    Geometry, 
    BufferGeometry,
    Float32BufferAttribute,
    // Vector2,
    Vector3
} from 'three';

// PathGeometry
function PathGeometry( points, radius, radialSegments ) {

	Geometry.call( this );

	this.type = 'PathGeometry';

	this.parameters = {
		points: points,
		radius: radius,
		radialSegments: radialSegments
	};


	let bufferGeometry = new PathBufferGeometry( points, radius, radialSegments );

	// create geometry
	this.fromBufferGeometry( bufferGeometry );
	this.mergeVertices();

}

PathGeometry.prototype = Object.create( Geometry.prototype );
PathGeometry.prototype.constructor = PathGeometry;

// PathBufferGeometry
function PathBufferGeometry( points, radius, radialSegments ) {

	BufferGeometry.call( this );

    this.type = 'PathBufferGeometry';

	this.parameters = {
		points: points,
		radius: radius,
		radialSegments: radialSegments
	};

	radius = radius || 1;
	radialSegments = radialSegments || 8;

	// var i;
	var j;

	// buffer

	var vertices = [];
	var normals = [];
	// var uvs = [];
	var indices = [];
	
	// create buffer data
	generateBufferData();

	// console.log(vertices);
	// console.log(indices);
	

	// build geometry
	this.setIndex( indices );
	this.setAttribute( 'position', new Float32BufferAttribute( vertices, 3 ) );
	this.setAttribute( 'normal', new Float32BufferAttribute( normals, 3 ) );
	// this.setAttribute( 'uv', new Float32BufferAttribute( uvs, 2 ) );

	// functions

	function generateBufferData() {

		let P0 = new Vector3();
		let P1 = new Vector3();

		points.forEach(lineSet => {

			P0 = new Vector3().fromArray(lineSet[0]);
			P1 = new Vector3().fromArray(lineSet[1]);


			let normal = new Vector3();
			let tangent = new Vector3().copy( P1 ).sub( P0 ).normalize();

			let N = new Vector3();
			let B = new Vector3();

			let vec = new Vector3();

			let min = Number.MAX_VALUE;
			let tx = Math.abs( tangent.x );
			let ty = Math.abs( tangent.y );
			let tz = Math.abs( tangent.z );

			if ( tx <= min ) {
				min = tx;
				normal.set( 1, 0, 0 );
			}

			if ( ty <= min ) {
				min = ty;
				normal.set( 0, 1, 0 );
			}

			if ( tz <= min ) {
				normal.set( 0, 0, 1 );
			}
			
			vec.crossVectors( tangent, normal ).normalize();
			N.crossVectors( tangent, vec );
			B.crossVectors( tangent, N );


			// let N = norm;
			// let B = binorm;


			let norm0 = new Vector3();
			let norm1 = new Vector3();
			// let norm2 = new Vector3();
			// let norm3 = new Vector3();
			
			let vert0 = new Vector3();
			let vert1 = new Vector3();
			// let vert2 = new Vector3();
			// let vert3 = new Vector3();


			for ( j = 0; j < radialSegments; j ++ ) {

				let start = (vertices.length / 3);

				let v = j / radialSegments * Math.PI * 2;
				// let v2 = (j+1) / radialSegments * Math.PI * 2;
	
				let sin = Math.sin( v );
				let cos = - Math.cos( v );

				// let sin2 = Math.sin( v2 );
				// let cos2 = - Math.cos( v2 );
	
				// normal
	
				norm0.x = ( cos * N.x + sin * B.x );
				norm0.y = ( cos * N.y + sin * B.y );
				norm0.z = ( cos * N.z + sin * B.z );
				norm0.normalize();

				norm1.x = ( cos * N.x + sin * B.x );
				norm1.y = ( cos * N.y + sin * B.y );
				norm1.z = ( cos * N.z + sin * B.z );
				norm1.normalize();

				// norm2.x = ( cos2 * N.x + sin2 * B.x );
				// norm2.y = ( cos2 * N.y + sin2 * B.y );
				// norm2.z = ( cos2 * N.z + sin2 * B.z );
				// norm2.normalize();

				// norm3.x = ( cos2 * N.x + sin2 * B.x );
				// norm3.y = ( cos2 * N.y + sin2 * B.y );
				// norm3.z = ( cos2 * N.z + sin2 * B.z );
				// norm3.normalize();
				
	
				// vertex
	
				vert0.x = P0.x + radius * norm0.x;
				vert0.y = P0.y + radius * norm0.y;
				vert0.z = P0.z + radius * norm0.z;

				vert1.x = P1.x + radius * norm1.x;
				vert1.y = P1.y + radius * norm1.y;
				vert1.z = P1.z + radius * norm1.z;

				// vert2.x = P0.x + radius * norm2.x;
				// vert2.y = P0.y + radius * norm2.y;
				// vert2.z = P0.z + radius * norm2.z;

				// vert3.x = P1.x + radius * norm3.x;
				// vert3.y = P1.y + radius * norm3.y;
				// vert3.z = P1.z + radius * norm3.z;
				
				
				vertices.push( vert0.x, vert0.y, vert0.z );
				vertices.push( vert1.x, vert1.y, vert1.z );
				// vertices.push( vert2.x, vert2.y, vert2.z );
				// vertices.push( vert3.x, vert3.y, vert3.z );
				
				normals.push( norm0.x, norm0.y, norm0.z );
				normals.push( norm1.x, norm1.y, norm1.z );
				// normals.push( norm2.x, norm2.y, norm2.z );
				// normals.push( norm3.x, norm3.y, norm3.z );

				if (j == radialSegments-1) {
					indices.push( start + 0, start + 1, (start + 2) - (radialSegments*2) );
					indices.push( (start + 3) - (radialSegments*2), (start + 2) - (radialSegments*2), start + 1 );
				} else {
					indices.push( start + 0, start + 1, start + 2 );
					indices.push( start + 3, start + 2, start + 1 );
				}
				
			}


		});
		
		// for ( i = 0; i < (vertices.length / 3) / 4; i++) {
		// 	let start = i * 4;
		// 	indices.push( start + 0, start + 1, start + 2 );
		// 	indices.push( start + 3, start + 2, start + 1 );
		// }

		// uvs are generated in a separate function.
		// this makes it easy compute correct values for closed geometries

		// generateUVs();


	}


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

PathBufferGeometry.prototype = Object.create( BufferGeometry.prototype );
PathBufferGeometry.prototype.constructor = PathBufferGeometry;

PathBufferGeometry.prototype.toJSON = function () {

	let data = BufferGeometry.prototype.toJSON.call( this );

	data.path = this.parameters.path.toJSON();

	return data;

};

export { PathGeometry, PathBufferGeometry };