
import { 
    Geometry, 
    BufferGeometry,
    Float32BufferAttribute,
    // Vector2,
    Vector3
} from 'three';


class PathGeometry extends Geometry {
	constructor( points, radius, radialSegments ) {
		super();

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
}


class PathBufferGeometry extends BufferGeometry {

	constructor( points, radius, radialSegments ) {
		// BufferGeometry.call( this );
		super();

		this.type = 'PathBufferGeometry';

		this.parameters = {
			points: points,
			radius: radius,
			radialSegments: radialSegments
		};
		// buffer
		this.vertices = [];
		this.normals = [];
		// var uvs = [];
		this.indices = [];

		this.radius = radius || 1;
		this.radialSegments = radialSegments || 8;



		// create buffer data
		this.generateBufferData(points);
		

		// build geometry
		this.setIndex( this.indices );
		this.setAttribute( 'position', new Float32BufferAttribute( this.vertices, 3 ) );
		this.setAttribute( 'normal', new Float32BufferAttribute( this.normals, 3 ) );
		// this.setAttribute( 'uv', new Float32BufferAttribute( uvs, 2 ) );
	}

	addLine(posArray1, posArray2) {
		let P0 = new Vector3().fromArray(posArray1);
		let P1 = new Vector3().fromArray(posArray2);


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


		let norm0 = new Vector3();
		let norm1 = new Vector3();
		
		let vert0 = new Vector3();
		let vert1 = new Vector3();


		for ( let j = 0; j < this.radialSegments; j ++ ) {

			let start = (this.vertices.length / 3);

			let v = j / this.radialSegments * Math.PI * 2;

			let sin = Math.sin( v );
			let cos = - Math.cos( v );

			// normal

			norm0.x = ( cos * N.x + sin * B.x );
			norm0.y = ( cos * N.y + sin * B.y );
			norm0.z = ( cos * N.z + sin * B.z );
			norm0.normalize();

			norm1.x = ( cos * N.x + sin * B.x );
			norm1.y = ( cos * N.y + sin * B.y );
			norm1.z = ( cos * N.z + sin * B.z );
			norm1.normalize();
			

			// vertex
			vert0.x = P0.x + this.radius * norm0.x;
			vert0.y = P0.y + this.radius * norm0.y;
			vert0.z = P0.z + this.radius * norm0.z;

			vert1.x = P1.x + this.radius * norm1.x;
			vert1.y = P1.y + this.radius * norm1.y;
			vert1.z = P1.z + this.radius * norm1.z;				
			
			this.vertices.push( vert0.x, vert0.y, vert0.z );
			this.vertices.push( vert1.x, vert1.y, vert1.z );
			
			this.normals.push( norm0.x, norm0.y, norm0.z );
			this.normals.push( norm1.x, norm1.y, norm1.z );

			if (j == this.radialSegments-1) {
				this.indices.push( start + 0, start + 1, (start + 2) - (this.radialSegments*2) );
				this.indices.push( (start + 3) - (this.radialSegments*2), (start + 2) - (this.radialSegments*2), start + 1 );
			} else {
				this.indices.push( start + 0, start + 1, start + 2 );
				this.indices.push( start + 3, start + 2, start + 1 );
			}
			
		}
	}

	generateBufferData(points) {
		points.forEach(lineSet => {
			this.addLine(lineSet[0], lineSet[1]);
		});
	}


	toJSON() {

		let data = super.toJSON();
		data.points = this.parameters.points.toJSON();
		return data;
	
	}


	// generateUVs() {

	// 	for ( let i = 0; i <= this.points.length; i ++ ) {

	// 		for ( let j = 0; j <= this.radialSegments; j ++ ) {

	// 			uv.x = i / points.length;
	// 			uv.y = j / radialSegments;

	// 			uvs.push( uv.x, uv.y );

	// 		}

	// 	}

	// }


}


export { PathGeometry, PathBufferGeometry };