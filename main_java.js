const objects = [
    { width: 50, height: 40 },
    { width: 100, height: 60 },
    { width: 70, height: 90 },
    { width: 120, height: 50 },
    { width: 80, height: 80 }
];
const root_container = document.getElementById('wrapper');
for (let i = 0; i < objects.length; i++) {
    const currentObject = objects[i];
    const div = document.createElement('div');
    div.classList.add('item');
    div.style.width = `${currentObject.width}px`;
    div.style.height = `${currentObject.height}px`;
    root_container.appendChild(div);
}