 var windowWidth = window.innerWidth,
     windowHeight = window.innerHeight;
 var camera, renderer, scene;
 //var mesh1;
 //var sizeM = 30;
 //var sizeMesh1 = sizeM;
 //var newMeshReady = false;
 var meshArray = [];
 head.ready(function() {
     Init();
     animate();
 });

 function Init() {
     scene = new THREE.Scene();

     //setup camera
     camera = new LeiaCamera({
         cameraPosition: new THREE.Vector3(_camPosition.x, _camPosition.y, _camPosition.z),
         targetPosition: new THREE.Vector3(_tarPosition.x, _tarPosition.y, _tarPosition.z)
     });
     scene.add(camera);


     //setup rendering parameter
     renderer = new LeiaWebGLRenderer({
         antialias: true,
         renderMode: _renderMode,
         shaderMode: _nShaderMode,
         colorMode: _colorMode,
         devicePixelRatio: 1
     });
     renderer.Leia_setSize({
         width: windowWidth,
         height: windowHeight,
         autoFit: true
     });
     renderer.shadowMapEnabled = true;
     renderer.shadowMapSoft = true;
     document.body.appendChild(renderer.domElement);

     //add object to Scene
     addObjectsToScene();

     //add Light
     addLights();

     //add Gyro Monitor
     //addGyroMonitor();
 }

 function animate() {
     requestAnimationFrame(animate);
    // renderer.setClearColor(new THREE.Color().setRGB(1.0, 1.0, 1.0));

     for(var i = 0;i < meshArray.length;i++){
       var curMeshGroup = meshArray[i].meshGroup;
       switch(meshArray[i].name){
        // case 'Cube':
          // curMesh.rotation.set(0.2 * Math.sin(3.2 * LEIA.time), 0 * Math.PI / 2, 0.25 * Math.sin(4 * LEIA.time));
        //   break;
          case 'TheTip':
           // curMesh.translateY(0.2);
            
           
         //   curMeshGroup.rotation.set(0,  0, Math.PI / 2 * LEIA.time);
            break;
         default:
           //curMesh.rotation.set(0.2 * Math.sin(3.2 * LEIA.time),  Math.PI / 2, 0.25 * Math.sin(4 * LEIA.time));
          // curMesh.rotation.set(Math.PI / 2 ,  0, 0);
           break;
           
       }
     }
     renderer.Leia_render({
         scene: scene,
         camera: camera,
         holoScreenSize: _holoScreenSize,
         holoCamFov: _camFov,
         upclip: _up,
         downclip: _down,
         messageFlag: _messageFlag
     });
 }

 function addObjectsToScene() {
   
   //Add your objects here
   addSTLModel({
     path: 'resource/Cube.stl',
     meshGroupName: 'Cube',
     meshSizeX: 30,
     meshSizeY: 30,
     meshSizeZ: 30,
     translateX: 0,
     translateY: 0,
     translateZ: 0,
   });
   
   addSTLModel({
     path: 'resource/SmallerSquares.stl',
     meshGroupName: 'SmallerSquares',
     meshSizeX: 30,
     meshSizeY: 30,
     meshSizeZ: 30,
     translateX: 0,
     translateY: 0,
     translateZ: 0,
   });
   
    addSTLModel({
     path: 'resource/SmallestSquares.stl',
     meshGroupName: 'SmallestSquares',
     meshSizeX: 30,
     meshSizeY: 35,
     meshSizeZ: 30,
     translateX: 0,
     translateY: 0,
     translateZ: 0,
   });
   
   addSTLModel({
     path: 'resource/TheTip.stl',
     meshGroupName: 'TheTip',
     meshSizeX: 5,
     meshSizeY: 5,
     meshSizeZ: 5,
     translateX: 0,
     translateY: 22,
     translateZ: 0,
   });
   
   //  LEIA_setBackgroundPlane('resource/brickwall_900x600_small.jpg');
 }

 function addLights() {
     //Add Lights Here
     var light = new THREE.SpotLight(0xffffff);
    //light.color.setHSL( Math.random(), 1, 0.5 );
    light.position.set(0, 100, 200);
    light.shadowCameraVisible = true;
    light.castShadow = true;
    light.shadowMapWidth = light.shadowMapHeight = 256;
    light.shadowDarkness = 0.7;
    scene.add(light);

    var ambientLight = new THREE.AmbientLight(0x222222);
    scene.add(ambientLight);
 }

function addSTLModel(parameters){//(filename, meshName, meshSize) {
     parameters = parameters || {};
     var path = parameters.path;
     var meshSizeX = parameters.meshSizeX;
    var meshSizeY = parameters.meshSizeY;
    var meshSizeZ = parameters.meshSizeZ;
    var tx =  parameters.translateX;
    var ty =  parameters.translateY;
    var tz =  parameters.translateZ;
    var meshName = parameters.meshGroupName;
    if(parameters.meshSizeX === undefined || parameters.meshSizeY === undefined  || parameters.meshSizeZ === undefined ){
      meshSizeX = 1;
      meshSizeY = 1;
      meshSizeZ = 1;
    }
     var xhr1 = new XMLHttpRequest();
     xhr1.onreadystatechange = function() {
         if (xhr1.readyState == 4) {
             if (xhr1.status == 200 || xhr1.status === 0) {
                 var rep = xhr1.response;
                 var mesh1;
                 mesh1 = parseStlBinary(rep, 0xffffff);
                 mesh1.material.side = THREE.DoubleSide;
                 mesh1.castShadow = true;
                 mesh1.receiveShadow = true;
                 mesh1.material.metal = true;
        
                 mesh1.scale.set(meshSizeX, meshSizeY, meshSizeZ);
                 mesh1.position.set(tx, ty, tz);
                 var group = new THREE.Object3D();
                 group.add(mesh1);
                 scene.add(group);
                 meshArray.push({meshGroup:group,name:meshName});
                // newMeshReady = true;
             }
         }
     };
     xhr1.onerror = function(e) {
         console.log(e);
     };
     xhr1.open("GET", path, true);
     xhr1.responseType = "arraybuffer";
     xhr1.send(null);
 }

function LEIA_setBackgroundPlane(filename, aspect) {
    var foregroundPlaneTexture = new THREE.ImageUtils.loadTexture(filename);
    foregroundPlaneTexture.wrapS = foregroundPlaneTexture.wrapT = THREE.RepeatWrapping;
    foregroundPlaneTexture.repeat.set(1, 1);

    //
    var planeMaterial = new THREE.MeshPhongMaterial({
        map: foregroundPlaneTexture,
        color: 0xffdd99
    });
    var planeGeometry = new THREE.PlaneGeometry(80, 60, 10, 10);
    plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.position.z = -6;
    plane.castShadow = false;
    plane.receiveShadow = true;
    scene.add(plane);
}