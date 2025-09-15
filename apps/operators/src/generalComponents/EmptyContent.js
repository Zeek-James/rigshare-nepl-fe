import React from 'react'
import { VscEmptyWindow } from 'react-icons/vsc'


const EmptyContent = ({ content, className }) => {
    return (
        <div className={`flex items-center justify-center w-full flex-col border-black border-1 rounded-lg border p-4 ${className}`}>
            <VscEmptyWindow />
            <p>{content ?? 'No content'}</p>
        </div>
    )
}

export default EmptyContent