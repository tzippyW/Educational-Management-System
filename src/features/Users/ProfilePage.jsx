import React, { useEffect } from 'react';  // הייבוא של useEffect מ-React
import { useDispatch } from 'react-redux';  // useDispatch נשאר מ-React Redux
import { addActivity } from './userActivity/userActivitySlice'; 
import ActivityChart from './userActivity/ActivityChart';  // ייבוא הגרף
import { formatISO, subDays } from 'date-fns';


const ProfilePage = ({ currentUser }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (currentUser?.id) {  
            dispatch(addActivity({
                id: Date.now(),
                userId: currentUser.id,
                type: 'כניסה לפרופיל',
                url: window.location.href,
                date: new Date().toISOString()
            }));
        }
    }, [currentUser]);
    

    return (
        <div>
            <h1>שלום, {currentUser ? currentUser.name : 'אורח'}</h1>
        </div>
    );
};

export default ProfilePage;  // הוספת export default
