import Note from "../models/Note.js";

export async function getAllNotes(req,res) {
    try{
        const notes = await Note.find().sort({createdAt: -1}); // sort -1 will show in desc (new first)
        res.status(200).json(notes);
    }
    catch (e){
        console.error("Error from getAllNotes", e);
        res.status(500).json({message: "Internal server error"})
    }
}
export async function createNewNotes(req,res) {
    try{
        const {title, content} = req.body;
        const newNotes = new Note({title, content});
        await newNotes.save();
        res.status(201).json({message: "Note Created successfully"});
    }
    catch (e) {
        console.error("Error from createNewNotes", e);
        res.status(500).json({message: "Internal server error"})
    }
}
export async function updateNotes(req,res) {
    try{
        const {title, content} = req.body;
        await Note.findByIdAndUpdate(req.params.id,{title, content});
        res.status(200).json({message: "Note Updated successfully"});
    }
    catch (e) {
        console.error("Error from createNewNotes", e);
        res.status(500).json({message: "Internal server error"})
    }
}
export async function deleteNotes(req,res) {
    try{
        const {title, content} = req.body;
        await Note.findByIdAndDelete(req.params.id,{title, content});
        res.status(201).json({message: "Note Deleted successfully"});
    }
    catch (e) {
        console.error("Error from createNewNotes", e);
        res.status(500).json({message: "Internal server error"})
    }
}