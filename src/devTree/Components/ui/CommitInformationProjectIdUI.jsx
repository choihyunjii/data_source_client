import styles from "../../styles/styles.module.css";
import {useEffect, useState} from "react";

export default function CommitInformationProjectIdUI({projectId, Status}){
    const [commit, setCommit] = useState(null);

    const checkoutCommit = async () => {
        try {
            if (!projectId) return
            const apiUrl = process.env.REACT_APP_API_URL;
            const response = await fetch(`${apiUrl}/api/commit/checkout/${projectId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const responseData = await response.json();
            setCommit(responseData);
            console.log(responseData)

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        setCommit(null)
        checkoutCommit();
    }, [projectId]);

    const formatDate = (dateString) => {
        const dateObject = new Date(dateString);
        const formattedDate = `${dateObject.getFullYear()}-${(dateObject.getMonth() + 1).toString().padStart(2, '0')}-${dateObject.getDate().toString().padStart(2, '0')} 오후 ${dateObject.getHours()}:${dateObject.getMinutes().toString().padStart(2, '0')}`;
        return formattedDate;
    };

    return (
        <>
            <div className={Status ? styles.smailSelectBoxStatus : styles.smailSelectBox}>
                <h5 className={styles.selectTitleBox}>현재 커밋 정보</h5>
                {commit && (
                    <ul className={`${styles.informationData} ${styles.scrollbar}`}>
                        <li>커밋 해시코드 : {commit.commitHashCode}</li>
                        <li>작성자 : {commit.createUsername}</li>
                        <li>날짜 : {formatDate(commit.createTime)}</li>
                        <li>커밋 메세지 : {commit.comment}</li>
                    </ul>
                )}
            </div>
        </>
    )
}