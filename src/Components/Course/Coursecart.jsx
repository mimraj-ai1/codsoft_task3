import React from 'react';

// Extract YouTube video ID from any YouTube URL format
function getYouTubeId(url) {
    if (!url) return null;
    const match = url.match(
        /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    return match ? match[1] : null;
}

export default function Coursecart({ link, title, desc, isCompleted, onComplete, isEnrolled }) {
    const videoId = getYouTubeId(link);
    const thumbnailUrl = videoId
        ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
        : null;
    const embedUrl = videoId
        ? `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`
        : null;

    return (
        <div className="col-lg-4 col-md-6 wow fadeInUp">
            <div className="course-item bg-light text-center">
                <div className="position-relative overflow-hidden" style={{ width: '100%', height: '240px' }}>
                    {isEnrolled ? (
                        /* ── Enrolled: show real video ── */
                        embedUrl ? (
                            <iframe
                                width="100%"
                                height="240px"
                                src={embedUrl}
                                title={title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                style={{ display: 'block' }}
                            />
                        ) : (
                            <div style={{ width: '100%', height: '240px', background: '#1a1a2e', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa' }}>
                                Video unavailable
                            </div>
                        )
                    ) : (
                        /* ── Not enrolled: blurred thumbnail + lock overlay ── */
                        <div style={{ width: '100%', height: '240px', position: 'relative', overflow: 'hidden' }}>
                            {/* Blurred thumbnail background */}
                            {thumbnailUrl && (
                                <img
                                    src={thumbnailUrl}
                                    alt={title}
                                    style={{
                                        width: '100%', height: '100%',
                                        objectFit: 'cover',
                                        filter: 'blur(4px) brightness(0.4)',
                                        transform: 'scale(1.08)',
                                    }}
                                />
                            )}
                            {/* Lock overlay */}
                            <div style={{
                                position: 'absolute', inset: 0,
                                display: 'flex', flexDirection: 'column',
                                alignItems: 'center', justifyContent: 'center',
                                background: thumbnailUrl ? 'transparent' : 'linear-gradient(135deg,#1a1a2e,#16213e)',
                                gap: '8px',
                            }}>
                                <div style={{
                                    fontSize: '2.2rem',
                                    background: 'rgba(255,255,255,0.12)',
                                    borderRadius: '50%',
                                    width: '60px', height: '60px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    backdropFilter: 'blur(6px)',
                                    border: '2px solid rgba(255,255,255,0.25)',
                                }}>🔒</div>
                                <p style={{
                                    color: '#fff', fontWeight: 700,
                                    fontSize: '0.85rem', margin: 0,
                                    textShadow: '0 1px 4px rgba(0,0,0,0.8)',
                                }}>Enroll to Watch</p>
                                <p style={{
                                    color: 'rgba(255,255,255,0.7)',
                                    fontSize: '0.72rem', margin: 0,
                                    textShadow: '0 1px 4px rgba(0,0,0,0.8)',
                                }}>Click "Enroll Now" above</p>
                            </div>
                        </div>
                    )}
                </div>
                <div className="text-center p-4">
                    <h3 className="mb-0">{title}</h3>
                    <p className="mb-4">{desc}</p>
                    {isEnrolled && (
                        isCompleted ? (
                            <button className="btn btn-success btn-sm w-100" disabled>Completed ✅</button>
                        ) : (
                            <button className="btn btn-outline-primary btn-sm w-100" onClick={onComplete}>Mark as Done</button>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}


