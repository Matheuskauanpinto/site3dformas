document.addEventListener('DOMContentLoaded', function () {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 800 / 600, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(800, 600);
    document.getElementById('scene-container').appendChild(renderer.domElement);

    const light = new THREE.AmbientLight(0x404040);
    scene.add(light);

    camera.position.z = 5;

    const objects = [];

    function createShape(shape) {
        let geometry;
        switch (shape) {
            case 'cube':
                geometry = new THREE.BoxGeometry();
                break;
            case 'sphere':
                geometry = new THREE.SphereGeometry(1, 32, 32);
                break;
            case 'triangle':
                geometry = new THREE.TetrahedronGeometry();
                break;
        }

        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
        const mesh = new THREE.Mesh(geometry, material);
        return mesh;
    }

    document.getElementById('add-shape').addEventListener('click', function () {
        const shape = document.getElementById('shape-selector').value;
        const mesh = createShape(shape);
        mesh.position.x = (Math.random() - 0.5) * 10;
        mesh.position.y = (Math.random() - 0.5) * 10;
        mesh.position.z = (Math.random() - 0.5) * 10;
        scene.add(mesh);
        objects.push(mesh);
    });

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false;
    controls.minDistance = 2;
    controls.maxDistance = 500;

    const dragControls = new THREE.DragControls(objects, camera, renderer.domElement);
    dragControls.addEventListener('dragstart', function (event) {
        controls.enabled = false;
        event.object.material.color.set(0xff0000);
    });
    dragControls.addEventListener('dragend', function (event) {
        controls.enabled = true;
        event.object.material.color.set(0x00ff00);
    });

    function animate() {
        requestAnimationFrame(animate);
        controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true
        renderer.render(scene, camera);
    }

    animate();
});
