import React, { useEffect, useState } from 'react';

const ChangeAvatar = ({ handleExportAvatar, show }) => {
    const [fetchApis, setFetchApi] = useState([]);

    const [stateUpdAvatar, setStateUpdAvatar] = useState('');
    useEffect(() => {
        fetch('https://be-intern.onrender.com/api/v2/employee/information', {
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`${response.status} ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                setFetchApi(data.data)
            })
    }, [])

    useEffect(() => {
        // setStateUpdAvatar(fetchApis.employeeAvatar)
    }, [fetchApis])

    useEffect(() => {
        handleExportAvatar(stateUpdAvatar)
        // console.log(fetchApis.employeeAvatar);
        return () => {
            stateUpdAvatar && URL.revokeObjectURL(stateUpdAvatar.preview)
        }
    }, [stateUpdAvatar])
    const handleAvatar = (e) => {
        const file = e.target.files[0]
        file.preview = URL.createObjectURL(file)
        setStateUpdAvatar(file.preview)
        console.log(stateUpdAvatar);

        fetch('https://be-intern.onrender.com/api/v2/employee/self-update',
            {
                method: 'PUT',
                body: JSON.stringify({
                    employeeName: fetchApis.name,
                    accountEmail: fetchApis.email,
                    employeeAddress: fetchApis.address,
                    employeeGender: fetchApis.gender,
                    // employeeAvatar: file.preview,
                    employeePhone: fetchApis.phone
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
            .then(response => {
                if (response.ok) {
                    console.log('PUT request succeeded');
                    // console.log(stateUpdAvatar);
                } else {
                    console.error('PUT request failed with status:', response.status);
                }
            })
            .catch(error => {
                console.error(error);
            });

    }
    return (
        <div>
            <div className="profile_avater">
                <div className="profile_ava_cover">
                    <label htmlFor="avatar">
                        <input type="file" name="avatar" id="avatar" style={{ display: 'none' }} onChange={handleAvatar} accept="image/*" />
                        <img src={stateUpdAvatar} alt="" srcSet="" id="avatar_img" />
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