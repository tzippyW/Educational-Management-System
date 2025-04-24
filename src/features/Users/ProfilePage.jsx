import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addActivity } from './userActivity/userActivitySlice'; 
import ActivityChart from './userActivity/ActivityChart';



const ProfilePage = ({ currentUser }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(addActivity({
            id: Date.now(),
            userId: currentUser.id,
            type: 'כניסה לפרופיל',
            url: window.location.href,
            date: new Date().toISOString()
        }));
    }, []);

    return (
        <div>
            <h1>שלום, {currentUser.name}</h1>
        </div>
    );
};

export default ProfilePage;
