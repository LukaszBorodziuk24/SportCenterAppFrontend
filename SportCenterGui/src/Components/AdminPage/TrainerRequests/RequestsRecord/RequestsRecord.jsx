import React, {useState} from "react";
import "./RequestsRecord.css";
import { FaCamera } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { adminAPI } from "../../../../services/api.js";

const RequestsRecord = ({request, onRequestUpdate}) =>{
    const [showPhotos, setShowPhotos] = useState(false);
    const [status, setStatus] = useState(request.status || 'Pending');
    const [photos, setPhotos] = useState(null);
    const [loadingPhotos, setLoadingPhotos] = useState(false);

    const handleShowPhotos = async () => {
        if (!showPhotos && !photos) {
            setLoadingPhotos(true);
            try {
                console.log('Fetching photos for request:', request.requestId);
                const photoData = await adminAPI.getTrainerRequestPhotos(request.requestId);
                console.log('Received photo data in component:', photoData);
                setPhotos(photoData);
            } catch (error) {
                console.error('Error fetching photos:', error);
                setPhotos({ error: 'Failed to load photos' });
            } finally {
                setLoadingPhotos(false);
            }
        }
        setShowPhotos(!showPhotos);
    };

    const handleAccept = async () => {
        try {
            await adminAPI.acceptTrainerRequest(request.requestId);
            setStatus('Accepted');
            // Notify parent to remove this item from the list
            if (onRequestUpdate) {
                onRequestUpdate(request.requestId, 'accepted');
            }
        } catch (error) {
            console.error('Error accepting request:', error);
        }
    };

    const handleDecline = async () => {
        try {
            await adminAPI.rejectTrainerRequest(request.requestId);
            setStatus('Rejected');
            // Notify parent to remove this item from the list
            if (onRequestUpdate) {
                onRequestUpdate(request.requestId, 'rejected');
            }
        } catch (error) {
            console.error('Error rejecting request:', error);
        }
    };

    return(
        <>
            <div className="justify-content-evenly align-items-center row text-black panelRecordBg m-3 rounded-3">
                <p className="col-3 m-0">{request.name}</p>
                <p className="col-3 m-0">{request.lastName}</p>
                <p className="col-3 m-0">{request.city} / {request.country}</p>
                <div className="col-3 d-flex justify-content-evenly m-0">
                    <div className="requestBtn neutral p-2 rounded-3 d-flex align-items-center justify-content-center" onClick={handleShowPhotos}>
                        <FaCamera color="white"/>
                    </div>
                    <div className="requestBtn accept p-2 rounded-3 d-flex align-items-center justify-content-center" onClick={handleAccept}>
                        <FaCheck color="white"/>
                    </div>
                    <div className="requestBtn decline p-2 rounded-3 d-flex align-items-center justify-content-center" onClick={handleDecline}>
                        <RxCross2 color="white"/>
                    </div>
                </div>
            </div>
            {showPhotos && (
                <div className="request-photos-card">
                    <div className="request-photos-header">
                        <span>Trainer Photos</span>
                        <button className="close-photos-btn" onClick={() => setShowPhotos(false)}>&times;</button>
                    </div>
                    <div className="request-photos-content">
                        {loadingPhotos ? (
                            <div>Loading photos...</div>
                        ) : photos?.error ? (
                            <div className="text-danger">{photos.error}</div>
                        ) : photos ? (
                            <>
                                {photos.coverPhotoUrl && (
                                    <div className="photo-item">
                                        <img src={photos.coverPhotoUrl} alt="Cover" className="request-photo-img"/>
                                        <small className="text-muted mt-1">Cover Photo</small>
                                    </div>
                                )}
                                {photos.avatarPhotoUrl && (
                                    <div className="photo-item">
                                        <img src={photos.avatarPhotoUrl} alt="Avatar" className="request-photo-img"/>
                                        <small className="text-muted mt-1">Avatar Photo</small>
                                    </div>
                                )}
                                {photos.trainerPhotoUrl && (
                                    <div className="photo-item">
                                        <img src={photos.trainerPhotoUrl} alt="Trainer" className="request-photo-img"/>
                                        <small className="text-muted mt-1">Trainer Photo</small>
                                    </div>
                                )}
                                {!photos.coverPhotoUrl && !photos.avatarPhotoUrl && !photos.trainerPhotoUrl && (
                                    <div>No photos available</div>
                                )}
                            </>
                        ) : (
                            <div>No photos available</div>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}

export default RequestsRecord


