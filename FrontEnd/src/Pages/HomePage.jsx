import React, {useEffect, useState} from 'react'
import Api from "../lib/axios.js"
import NavaBar from "../component/navaBar.jsx";
import RateLimitedUI from "../component/rateLimit.jsx";
import '../style/loading.css'
import NoteCard from "../component/noteCard.jsx";
import NotesNotFound from "../component/NotesNotFound.jsx";
import toast from "react-hot-toast";

const HomePage = () => {
    const [isRateLimit, setIsRateLimit] = useState(false);
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotes = async () => {
            try{
                const res = await Api.get("/notes")
                console.log(res.data);
                setNotes(res.data);
                setIsRateLimit(false)
            }
            catch (e) {
                console.log("Error from fetching notes", e)
                if (e.response?.status === 429){
                    setIsRateLimit(true);
                }else{
                    toast.error("Failed to load notes");
                }
            }
            finally {
                setLoading(false);
            }
        }
        fetchNotes();
    }, [])
    return (
        <div className="min-h-screen">
            <NavaBar />
            {isRateLimit && <RateLimitedUI />}
            {notes.length === 0 && !isRateLimit && <NotesNotFound />}

            <div className="max-w-7xl mx-auto p-4 mt-6">
                {loading && <div className="text-center text-primary py-10">
                        <div className="text-center">
                            <span className="loading loading-spinner text-warning"></span>
                            {/*<div className="spinner w-12 h-12 border-4 border-gray-300 border-t-orange-500 rounded-full mx-auto mb-4"></div>*/}
                            <p className="text-lg text-gray-700 font-medium">Loading...</p>
                        </div>
                </div>}


                {notes.length > 0 && !isRateLimit && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {notes.map((note) => (
                            <NoteCard key={note._id} note={note} setNotes={setNotes} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
export default HomePage
