import React, { useState } from 'react';
import './TikTokVideoDownloader.css';

function TikTokVideoDownloader() {
    const [input, setInput] = useState("");
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const url = 'https://tiktok-video-no-watermark2.p.rapidapi.com/';
        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'X-RapidAPI-Key': '1526a07e77msh8e85f3abfa458bcp1cf15djsn8400d4456de9',
                'X-RapidAPI-Host': 'tiktok-video-no-wate rmark2.p.rapidapi.com'
            },
            body: new URLSearchParams({
                url: input,
                hd: '1'
            })
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            if (result.code === 0) {
                setData(result.data);
            }
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    }

    return (
        <div className="container">
            <h1 className="title">TikTok Video Downloader No Watermark</h1>
            <form className="form" onSubmit={handleSubmit}>
                <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter TikTok Video URL" required className="input" />
                <button type="submit" className="button">Download</button>
            </form>
            {loading &&  <img src="https://verboencarnadobrasil.org/wp-content/uploads/2019/04/loader.gif" alt="Loading...."/>}
            {data && (
                <div>
                    {/*<h2>{data.title}</h2>*/}
                    <video controls src={data.play} className="video" />
                    <a href={data.play} download className="button download-button">Download Video</a>
                </div>
            )}
            <footer className="footer">Created by David Gondo. © SMT 2023</footer>
        </div>
    )
}

export default TikTokVideoDownloader;
