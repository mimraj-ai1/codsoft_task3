import React from 'react'

export default function Coursecart({ link, title, desc, isCompleted, onComplete, isEnrolled}) {

    return (
        <>
            <div className="col-lg-4 col-md-6 wow fadeInUp">
                <div className="course-item bg-light text-center">
                    <div className="position-relative overflow-hidden">
                        <video width="360" height="240" controls>
                            <source src={link} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
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
        </>
    )
}
