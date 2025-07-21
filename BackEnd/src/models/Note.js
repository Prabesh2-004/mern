import express from "express";
import mongoose from "mongoose";

// step 1: create a schema
// step 2: you will create a model based on that schema

const noteSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Note = mongoose.model("Notes", noteSchema);

export default Note;