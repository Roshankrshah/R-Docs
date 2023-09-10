
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
        .replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
}

const createBtn = document.getElementById('create');
const joinBtn = document.getElementById('join');

createBtn.addEventListener('click',()=>{
    const genId = uuidv4();
    window.location.href = `http://127.0.0.1:5500/client/editor.html?id=${genId}`;
});

joinBtn.addEventListener('click',()=>{
    const docId = document.getElementById('docId').value;
    window.location.href = `http://127.0.0.1:5500/client/editor.html?id=${docId}`;
})