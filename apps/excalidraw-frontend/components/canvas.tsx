"use client"
import { MakeCanvas } from '@/draw/canvas';
import React, { useEffect, useRef, useState } from 'react'

interface CanvasPrps {
    roomId: string;
    socket: WebSocket
}

function Canvas({ roomId, socket }: CanvasPrps) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const selectedCanvasRef = useRef<MakeCanvas | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const selectedTextareaRef = useRef<HTMLTextAreaElement | null>(null);

    const [selectedShape, setSelectedShape] = useState<"circle" | "rectangle" | "line" | "pencil" | "text">("rectangle");
    const [selectedStrockColor, setSelectedStrockColor] = useState<"#f7f9f9" | "#cb4335" | "#a569bd" | "#58d68d">("#f7f9f9");


    useEffect(() => {
        const canvas = canvasRef.current
        const textarea = textareaRef.current;
        if (canvas && !selectedCanvasRef.current && textarea) {
            const newcanvas = new MakeCanvas(canvas, roomId, textarea, socket);
            selectedCanvasRef.current = newcanvas;
        }
    }, [roomId, socket])

    return (
        <div className='w-screen h-screen overflow-hidden'>
            <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight} className='block bg-neutral-900'></canvas>

            <div className='fixed top-4 left-1/2 flex gap-2 bg-zinc-800 rounded-md p-1'>
                <button className='p-1 rounded-md hover:bg-zinc-700 text-white ' onClick={() => {
                    if (selectedCanvasRef.current) {
                        selectedCanvasRef.current.setTool('circle');
                        setSelectedShape("circle")
                    }
                    console.log("clicked circle")
                }}>circle</button>
                <button className='p-1 rounded-md hover:bg-zinc-700 text-white' onClick={() => {
                    if (selectedCanvasRef.current) {
                        selectedCanvasRef.current.setTool("rectangle");
                        setSelectedShape("rectangle")

                    }
                    console.log("clicked rect")
                }}>rect</button>
                <button className='p-1 rounded-md hover:bg-zinc-700 text-white' onClick={() => {
                    if (selectedCanvasRef.current) {
                        selectedCanvasRef.current.setTool("line");
                        setSelectedShape("line")

                    }
                    console.log("clicked line")
                }}>line</button>
                <button className='p-1 rounded-md hover:bg-zinc-700 text-white' onClick={() => {
                    if (selectedCanvasRef.current) {
                        selectedCanvasRef.current.setTool("pencil");
                        setSelectedShape("pencil")

                    }
                    console.log("clicked pencil")
                }}>pencil</button>
                <button className='p-1 rounded-md hover:bg-zinc-700 text-white' onClick={() => {
                    if (selectedCanvasRef.current) {
                        selectedCanvasRef.current.setTool("text");
                        setSelectedShape("text")

                    }
                    console.log("clicked text")
                }}>text</button>
            </div>


            <div className='fixed flex flex-col text-white right-7 top-7 gap-3'>
                <div className='bg-[#f7f9f9] size-9 rounded-full' onClick={() => {
                    if (selectedCanvasRef.current) {
                        selectedCanvasRef.current.setStrockColor("#f7f9f9");
                        setSelectedStrockColor("#f7f9f9");
                    }
                }}></div>
                <div className='bg-[#cb4335] size-9 rounded-full' onClick={() => {
                    if (selectedCanvasRef.current) {
                        selectedCanvasRef.current.setStrockColor("#cb4335");
                        setSelectedStrockColor("#cb4335");
                    }
                }}></div>
                <div className='bg-[#a569bd] size-9 rounded-full' onClick={() => {
                    if (selectedCanvasRef.current) {
                        selectedCanvasRef.current.setStrockColor("#a569bd");
                        setSelectedStrockColor("#a569bd");
                    }
                }}></div>
                <div className='bg-[#58d68d] size-9 rounded-full' onClick={() => {
                    if (selectedCanvasRef.current) {
                        selectedCanvasRef.current.setStrockColor("#58d68d");
                        setSelectedStrockColor("#58d68d");
                    }
                }}></div>
                <p className='text-xl font-bold'>Text-size</p>
                <input type="range" min={1} max={5} defaultValue={2} onChange={(e) => {
                    if (selectedCanvasRef.current) {
                        console.log(e.target.value)
                        selectedCanvasRef.current.setTextSize(Number(e.target.value));
                    }
                }} />
                <div className='flex gap-2 bg-zinc-800 rounded-xl justify-center cursor-pointer'>
                    <div className='py-2 px-6 hover:bg-zinc-700 rounded-xl'>
                        <p className='text-xl'>+</p>
                        </div>
                    <div className='py-2 px-4 hover:bg-zinc-700 rounded-xl'>
                        <p className='text-xl'>100</p>
                    </div>
                    <div className='py-2 px-6 hover:bg-zinc-700 rounded-xl'>
                        <p className='text-xl'>-</p>
                    </div>
                </div>
            </div>
            <textarea ref={textareaRef} name="" id="" rows={1} cols={1} className='fixed top-0 left-0 p-0 h-auto resize-none  outline-none whitespace-nowrap font-serif'></textarea>


        </div>
    )
}

export default Canvas