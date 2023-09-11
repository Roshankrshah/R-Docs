const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],

    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction

    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],

    ['clean']                                         // remove formatting button
];

var quill = new Quill('#editor', {
    theme: 'snow',
    modules: {
        toolbar: toolbarOptions
    }
});

const docId = (window.location.href.split('?')[1]).split('=')[1];
console.log(docId);

const socketServer = io('http://localhost:2200');

socketServer.emit('get-document', docId);

socketServer.on('load-document', document => {
    console.log('hi');
    console.log(document);
    quill.setContents(document);
    quill.enable();
});


quill.on('text-change', function (delta, oldDelta, source) {
    if (source == 'api') {
        console.log("An API call triggered this change.");
    } else if (source == 'user') {
        console.log("A user action triggered this change.");
        socketServer.emit('send-changes', delta);
    }
});


socketServer.on('recieve-changes', delta => {
    quill.updateContents(delta);
});

setInterval(() => {
    socketServer.emit('save-document',quill.getContents())
}, 2000);


//socketServer.disconnect();