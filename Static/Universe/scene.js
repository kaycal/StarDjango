/*
	Three.js "tutorials by example - remixed to fit needs"
	Author: Kay Dermody-Williams
    Original Author: Lee Stemkoski
	Date: July 2013 (three.js v59dev)
 */

	
//////////	
// MAIN //
//////////

// standard global variables
var container, scene, camera, renderer, controls, stats;
var clock = new THREE.Clock(autoStart=true);
var objects = [];


///////////////
// FUNCTIONS //
///////////////
			
function init(CallMe) {
	///////////
	// SCENE //
	///////////
	scene = new THREE.Scene();

	////////////
	// CAMERA //
	////////////
	
	// set the view size in pixels (custom or according to window size)
	// var SCREEN_WIDTH = 400, SCREEN_HEIGHT = 300;
	var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;	
	// camera attributes
	var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;
	// set up camera
	camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
	// add the camera to the scene
	scene.add(camera);
	// the camera defaults to position (0,0,0)
	// 	so pull it back (z = 400) and up (y = 100) and set the angle towards the scene origin
	camera.position.set(-350,200,400);
	camera.lookAt(scene.position);	
	
	//////////////
	// RENDERER //
	//////////////
	
    renderer = new THREE.WebGLRenderer( {antialias:true} );
	
	renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);


	container = document.createElement( 'div' );
	document.body.appendChild( container );
	
	// attach renderer to the container div
	container.appendChild( renderer.domElement );
	
	////////////
	// EVENTS //
	////////////

	
	//////////////
	// CONTROLS //
	//////////////
	
	///////////
	// STATS //
	///////////
		
	///////////
	// LIGHT //
	///////////
	
	// create a light
	var ambientLight = new THREE.AmbientLight(0x404040);
	scene.add(ambientLight);
	
	//////////////
	// GEOMETRY //
	//////////////


	// create a set of coordinate axes to help orient user
	//    specify length in pixels in each direction
	var axes = new THREE.AxisHelper(100);
	scene.add( axes );
	
	////////////////
	// BACKGROUND //
	////////////////
	
	// recommend either a skybox or fog effect (can't use both at the same time) 
	// without one of these, the scene's background color is determined by webpage background

    controls = new THREE.TrackballControls(camera);	
}

function prePos() {
    for (var i=0; i<objects.length; i++) {
        // Set object position based on birthday
        // for now, just gonna set it based on asymptotes
        objects[i].update(0);
    }
}

function animate() {
    requestAnimationFrame( animate );
    controls.update();
    delta = clock.getDelta();
    theta = clock.getElapsedTime();
    for (var i=0; i<objects.length; i++) {
        objects[i].update(delta);
    }
	renderer.render( scene, camera );
}

function render() {	
	renderer.render( scene, camera );
}



// Mod Three.EllipseCurve; later try to integrate full 3d

EllipseCurve = function ( aX, aY, xRadius, yRadius, aStartAngle, aEndAngle, aClockwise ) {

	this.aX = aX;
	this.aY = aY;

	this.xRadius = xRadius;
	this.yRadius = yRadius;

	this.aStartAngle = aStartAngle;
	this.aEndAngle = aEndAngle;

	this.aClockwise = aClockwise;

};

EllipseCurve.prototype = Object.create( THREE.Curve.prototype );

EllipseCurve.prototype.getPoint = function ( t ) {

	var angle;
	var deltaAngle = this.aEndAngle - this.aStartAngle;

	if ( deltaAngle < 0 ) deltaAngle += Math.PI * 2;
	if ( deltaAngle > Math.PI * 2 ) deltaAngle -= Math.PI * 2;

	if ( this.aClockwise === true ) {

		angle = this.aEndAngle + ( 1 - t ) * ( Math.PI * 2 - deltaAngle );

	} else {

		angle = this.aStartAngle + t * deltaAngle;

	}

	var tx = this.aX + this.xRadius * Math.cos( angle );
	var ty = this.aY + this.yRadius * Math.sin( angle );

	return new THREE.Vector3( tx, 0, ty );

};
