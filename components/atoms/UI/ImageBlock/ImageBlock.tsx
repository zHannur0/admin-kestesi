import React from 'react';
import { MdClear } from 'react-icons/md';

interface FileItemProps {
    photo?: any;
    handleSetPhoto?: any;
}

const ImageBlock: React.FC<FileItemProps> = ({ photo, handleSetPhoto }) => {
    return (
        <div className="file-item">
            <div className="file-info">
                <p>{photo?.name ? photo.name.substring(0, 14) : ''}</p>
            </div>
            <div className="file-actions">
                <MdClear onClick={handleSetPhoto}/>
            </div>
        </div>
    );
}

export default ImageBlock;
