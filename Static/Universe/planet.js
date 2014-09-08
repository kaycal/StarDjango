//
// SceneObject Parent Class
//
function SceneObject(dbID) {
    this.dbID = dbID;
    this.origin = (0,0,0) //anotherSceneObject || (0,0,0); <-- can use this to inherit origin for special effects etc
}

//
// Planet constructor
//
function Planet() {
    // basic stats
    this.asymptotes = (0,0,0);
    this.tilt = (0,0,0);

    this.object = {
        main: null,
        extra: null,
    };
}

// Constructor assignment
Planet.prototype = Object.create(SceneObject.prototype);
Planet.prototype.constructor = Planet;

Planet.prototype.update = function(delta) {
    console.log(this.object);
    this.object.main.position.set(this.asymptotes[0],0,0); // For now, just line up

    // Spin spin spin
    this.object.main.rotation.y += 1/32 * delta;
    this.object.extra.rotation.x += 1/16 * delta;
    this.object.extra.rotation.z -= 1/16 * delta;
};


// var obj = new Planet(dbid)
