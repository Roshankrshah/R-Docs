const Document = require('../models/documentSchema');

const getDocument = async (id)=>{
    if(id === null) return;
    console.log(id);
    const document = await Document.findById(id);
    console.log('d',document);

    if(document) return document;

    return await Document.create({_id:id,data:''});
};

const updateDocument = async(id,data)=>{
    return await Document.findByIdAndUpdate(id,{data});
}

module.exports = {
    getDocument,
    updateDocument
};