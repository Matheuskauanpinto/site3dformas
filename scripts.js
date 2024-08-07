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

    const controls = new THREE.DragControls(objects, camera, renderer.domElement);
    controls.addEventListener('dragstart', function (event) {
        event.object.material.color.set(0xff0000);
    });
    controls.addEventListener('dragend', function (event) {
        event.object.material.color.set(0x00ff00);
    });

    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }

    animate();
});
