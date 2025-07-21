import React, {useEffect, useState} from 'react'
import {Link, useNavigate, useParams} from "react-router";
import toast from "react-hot-toast";
import Api from "../lib/axios.js";
import {ArrowLeftIcon, Trash2Icon} from "lucide-react";

const DetailsPage = () => {

    const [note, setNote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const navigation = useNavigate();

    const {id} = useParams();  //we're using is because we set path id like if we set ide or idex we have to write that

    console.log({id})

    useEffect(() => {
        const fetchNote = async() => {
            try {
                const res = await Api.get(`/notes/${id}`);
                setNote(res.data);
            }
            catch (e) {
                console.log("Error when fetching Notes", e);
                toast.error("Error occur! Please wait")
            }
            finally {
                setLoading(false)
            }
        }
        fetchNote();
    },[id])

    const handleDelete = () => {

    }

    if (loading){
        return (
            <div className="min-h-screen flex items-center justify-center">
                <span className="loading loading-spinner text-warning"></span>
                {/*<div className="spinner w-12 h-12 border-4 border-gray-300 border-t-orange-500 rounded-full mx-auto mb-4"></div>*/}
                <p className="text-lg text-gray-700 font-medium">Loading...</p>
            </div>
        )
    }


    return (
        <div className="min-h-screen bg-base-200">
            <div className=" container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto">
                    <div className="flex items-center justify-between mb-6">
                        <Link to={"/"} className="btn btn-ghost mb-6">
                            <ArrowLeftIcon className="size-5"/>
                            Back to Notes
                        </Link>
                        <button onClick={handleDelete} className="btn btn-error btn-outline">
                            <Trash2Icon className="h-5 w-5" />
                            Delete Note
                        </button>
                    </div>
                    <div className="card bg-base-100">
                        <div className="card-body">
                            <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text">Title</span>
                                </label>
                                <input type="text" placeholder="Note Title" className="input input-bordered" value={note.title} onChange={(e) => setNote({...note, title: e.target.value})} autoFocus/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default DetailsPage;
