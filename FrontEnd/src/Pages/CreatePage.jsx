import React, {useState} from 'react'
import {Link, useNavigate} from "react-router";
import {ArrowLeftIcon} from "lucide-react";
import toast from "react-hot-toast";
import Api from "../lib/axios.js";

const CreatePage = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const Navigation = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        if (!title.trim() || !content.trim()){
            toast.error("All Field Is Required");
        }

        setLoading(true);
        try{
            await Api.post("/notes", {
                title,
                content
            });
            Navigation("/");
            toast.success("Note Created Successfully");
        }catch (e) {
            console.log("Error While saving", e)
            toast.error("Failed to Create Note")
        }finally{
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-base-200">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto">
                    <Link to={"/"} className="btn btn-ghost mb-6">
                        <ArrowLeftIcon className="size-5"/>
                        Back to Notes
                    </Link>

                    <div className="card bg-base-100">
                        <div className="card-body">
                            <h2 className="card-title text-2xl mb-4">Create New Note</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="form-control mb-4">
                                    <label className="label">
                                        <span className="label-text">Title</span>
                                    </label>
                                    <input type="text" placeholder="Note Title" className="input input-bordered" value={title} onChange={(e) => {setTitle(e.target.value)}} autoFocus/>
                                </div>
                                <div className="form-control mb-4">
                                    <label className="label">
                                        <span className="label-text">Content</span>
                                    </label>
                                    <textarea placeholder="Note Title" className="input input-bordered h-40" value={content} onChange={(e) => {setContent(e.target.value)}} />
                                </div>

                                <div className="card-actions justify-end">
                                    <button className="btn btn-primary" disabled={loading}>
                                        {loading ? "Creating..." : "Create Note"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CreatePage
