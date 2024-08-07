document.addEventListener('DOMContentLoaded', function () {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 800 / 600, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(800, 600);
    document.getElementById('scene-container').appendChild(renderer.domElement);

    const light = new THREE.AmbientLight(0x404040); // soft white light
    scene.add(light);

    camera.position.z = 5;

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
        scene.add(mesh);
    });

    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }

    animate();
});
