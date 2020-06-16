import { Vector3, Curve } from 'three';


function LinearCurve3( points ) {

	Curve.call( this );

	this.type = 'LinearCurve3';

	this.points = points || [];

}

LinearCurve3.prototype = Object.create( Curve.prototype );
LinearCurve3.prototype.constructor = LinearCurve3;

LinearCurve3.prototype.isLinearCurve3 = true;

LinearCurve3.prototype.getPoint = function ( t, optionalTarget ) {

	var point = optionalTarget || new Vector3();

	var points = this.points;
	var l = points.length;

	var p = ((l-1) * t);

	// console.log("length: " + l + " T: " + t + " P: " + p);
	
	// console.log(p);
	
    var intPoint = Math.floor( p );
    var nextPoint = Math.ceil( p );
    // var roundPoint = Math.round( p );
	var weight = p - intPoint;

	if ( weight === 0 && intPoint === l - 1 ) {

		intPoint = l - 2;
		weight = 1;

    }
    
    // point.copy(points[intPoint]);

    point.lerpVectors(points[intPoint], points[nextPoint], weight)

	return point;

};

LinearCurve3.prototype.getPointAbs = function ( index, optionalTarget ) {

	var point = optionalTarget || new Vector3();

	var points = this.points;

	if (index > points.length -1)
		index = points.length -1
	else if (index < 0) 
		index = 0

    point.copy(points[index]);

	return point;

};

LinearCurve3.prototype.copy = function ( source ) {

	Curve.prototype.copy.call( this, source );

	this.points = [];

	for ( var i = 0, l = source.points.length; i < l; i ++ ) {

		var point = source.points[ i ];

		this.points.push( point.clone() );

	}

	return this;

};

LinearCurve3.prototype.toJSON = function () {

	var data = Curve.prototype.toJSON.call( this );

	data.points = [];

	for ( var i = 0, l = this.points.length; i < l; i ++ ) {

		var point = this.points[ i ];
		data.points.push( point.toArray() );

	}

	return data;

};

LinearCurve3.prototype.fromJSON = function ( json ) {

	Curve.prototype.fromJSON.call( this, json );

	this.points = [];

	for ( var i = 0, l = json.points.length; i < l; i ++ ) {

		var point = json.points[ i ];
		this.points.push( new Vector3().fromArray( point ) );

	}

	return this;

};


export { LinearCurve3 };