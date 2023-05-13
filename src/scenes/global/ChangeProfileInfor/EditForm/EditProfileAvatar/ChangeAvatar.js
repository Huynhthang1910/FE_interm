import React, { useEffect, useState } from 'react';
import { useRef } from 'react';

const ChangeAvatar = ({ handleExportAvatar }) => {
    const [fetchAvaApis, setFetchAvaApi] = useState();
    const [stateUpdAvatar, setStateUpdAvatar] = useState(true);
    const [imgReF, setImgRef] = useState('');
    const tokenTaken = sessionStorage.getItem("token");
    const urlAllInforEmployee = `${process.env.REACT_APP_API_ENDPOINT}api/v2/employee/information`;
    const urlPostAvatarEmployee = `${process.env.REACT_APP_API_ENDPOINT}api/v2/employee/create-avatar`
    useEffect(() => {
        fetch(urlAllInforEmployee, {
            headers: {
                Authorization: `Bearer ${tokenTaken}`,
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`${response.status} ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                setFetchAvaApi(data.data.employeeId)
            })
    }, [])

    //! fetch POST
    const handleAvatar = (e) => {
        const fileAvatar = e.target.files[0]
        const formData = new FormData();
        formData.append('file', fileAvatar);
        fetch(urlPostAvatarEmployee,
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${tokenTaken}`
                },
                body: formData
            }
        )
            .then(response => response.json())
            .then(data => {
                console.log("Success POST: ", data);
                setStateUpdAvatar(pre => !pre)
            })
            .catch(error => {
                console.error("Error POST: ", error);
            });
    }

    //! fetch avatar
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_ENDPOINT}api/v2/employee/avatar/${fetchAvaApis}`, {
            headers: {
                Authorization: `Bearer ${tokenTaken}`,
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`${response.status} ${response.statusText}`);
                }
                return response.arrayBuffer();
            })
            .then(data => {
                const imgSrc = (data.byteLength === 0)
                    ?
                    ("../../../../assets/avatar_placeholder.png") :
                    (URL.createObjectURL(new Blob([data], { type: 'image/jpeg' })))
                // console.log("Success FETCH: ", imgSrc);
                setImgRef(imgSrc)
            })
            .catch(error => {
                console.error("Error FETCH: ", error);
            });
        return () => {
            URL.revokeObjectURL(imgReF);
        };
    }, [stateUpdAvatar, fetchAvaApis])

    useEffect(() => {
        handleExportAvatar(stateUpdAvatar)
        return () => {
            stateUpdAvatar && URL.revokeObjectURL(stateUpdAvatar.preview)
        }
    }, [stateUpdAvatar])
    return (
        <div>
            <div className="profile_avater">
                <div className="profile_ava_cover">
                    <label htmlFor="avatar">
                        <input type="file" name="avatar" id="avatar" style={{ display: 'none' }} onChange={handleAvatar} accept="image/*" />
                        <img src={imgReF} alt="" srcSet="" id="avatar_img" />
                        <div className="user_edit" name="avatar">
                            <i className="fa fa-camera"></i>
                        </div>
                    </label>
                </div>
            </div>
        </div>
    );
};

export default ChangeAvatar;