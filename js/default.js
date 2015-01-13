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
        compFac:_depthCompressionFactor,
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

     for (var i = 0; i < meshArray.length; i++) {
         var curMeshGroup = meshArray[i].meshGroup;
         switch (meshArray[i].name) {
             case 'TheTip':
               //  curMeshGroup.rotation.set(0, 0, Math.PI / 2 * LEIA.time);
              curMeshGroup.rotation.set(0, Math.PI / 2 * LEIA.time *0.1, 0);
                 break;
             default:
                // curMeshGroup.rotation.set(0, 0, Math.PI / 2 * LEIA.time *0.2);
              curMeshGroup.rotation.set(0, Math.PI / 2 * LEIA.time *0.2, 0);
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
   
   //add Text
    addTextMenu({
      text: "Menu 1",
      name: "menu1",
      positionX: -5,
      positionY: 0,
      positionZ: 13,
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0
      
    });
   
    addTextMenu({
      text: "Menu 3",
      name: "menu3",
      positionX: 5,
      positionY: 0,
      positionZ: -13,
      rotateX: 0,
      rotateY: -Math.PI,
      rotateZ: 0
      
    });
   
   addTextMenu({
      text: "Menu 2",
      name: "menu2",
      positionX: -13,
      positionY: 0,
      positionZ: -5,
      rotateX: 0,
      rotateY: -Math.PI / 2,
      rotateZ: 0
    });
   
   addTextMenu({
      text: "Menu 4",
      name: "menu4",
      positionX: 13,
      positionY: 0,
      positionZ: 5,
      rotateX: 0,
      rotateY: Math.PI / 2,
      rotateZ: 0
    });

     //  LEIA_setBackgroundPlane('resource/brickwall_900x600_small.jpg');
 }

 function addLights() {
     //Add Lights Here
     var light = new THREE.SpotLight(0xffffff);
     //light.color.setHSL( Math.random(), 1, 0.5 );
     light.position.set(0, 100, 200);
     light.shadowCameraVisible = false;
     light.castShadow = true;
     light.shadowMapWidth = light.shadowMapHeight = 256;
     light.shadowDarkness = 0.7;
     scene.add(light);

     var ambientLight = new THREE.AmbientLight(0x222222);
     scene.add(ambientLight);
 }

 function addTextMenu(parameters){
    parameters = parameters || {};
   
   var strText = parameters.text;
   var posX = parameters.positionX;
   var posY = parameters.positionY;
   var posZ = parameters.positionZ;
   var rotateX = parameters.rotateX;
   var rotateY = parameters.rotateY;
   var rotateZ = parameters.rotateZ;
   var name = parameters.name;
   if(posX === undefined || posY === undefined || posZ === undefined){
     posX = 0;
     posY = 0;
     posZ = 0;
   }
   if(rotateX === undefined || rotateY === undefined || rotateZ === undefined){
     rotateX = 0;
     rotateY = 0;
     rotateZ = 0;
   }
   var menuGeometry = new THREE.TextGeometry(
        strText, {
            size: 3,
            height: 1,
            curveSegments: 4,
            font: "helvetiker",
            weight: "normal",
            style: "normal",
            bevelThickness: 0.5,
            bevelSize: 0.25,
            bevelEnabled: true,
            material: 0,
            extrudeMaterial: 1
        }
    ); 
    var menuMaterial = new THREE.MeshFaceMaterial(
        [
            new THREE.MeshPhongMaterial({
                color: 0xffffff,
                shading: THREE.FlatShading
            }), // front
            new THREE.MeshPhongMaterial({
                color: 0xffffff,
                shading: THREE.SmoothShading
            }) // side
        ]
    );
    var menuMesh = new THREE.Mesh(menuGeometry, menuMaterial);
    menuMesh.position.set(posX, posY, posZ);
    menuMesh.rotation.set(rotateX, rotateY, rotateZ);
    var group = new THREE.Object3D();
    group.add(menuMesh);
    scene.add(group);
    meshArray.push({meshGroup:group,name:"menu1"});
   
 }
 function addSTLModel(parameters) { //(filename, meshName, meshSize) {
     parameters = parameters || {};
     var path = parameters.path;
     var meshSizeX = parameters.meshSizeX;
     var meshSizeY = parameters.meshSizeY;
     var meshSizeZ = parameters.meshSizeZ;
     var tx = parameters.translateX;
     var ty = parameters.translateY;
     var tz = parameters.translateZ;
     var meshName = parameters.meshGroupName;
     if (parameters.meshSizeX === undefined || parameters.meshSizeY === undefined || parameters.meshSizeZ === undefined) {
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
                 mesh1.name = "LeiaMesh";
                 mesh1.scale.set(meshSizeX, meshSizeY, meshSizeZ);
                 mesh1.position.set(tx, ty, tz);
                 var group = new THREE.Object3D();
                 group.add(mesh1);
                 scene.add(group);
                 meshArray.push({
                     meshGroup: group,
                     name: meshName
                 });
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