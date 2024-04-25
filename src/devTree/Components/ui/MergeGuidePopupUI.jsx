import React, {useState} from "react";
import styles from "../../styles/styles.module.css";
import MergeCrashModalLayout from "../layout/MergeCrashModalLayout";
import SuccessModalLayout from "../../../project/components/layout/SuccessModalLayout";

const MergeGuidePopupUI = ({ isOpen, onClose, onCrashOpen, onSuccessOpen, onErrorOpen, selectedCommitId, selectedProjectId }) => {

    if (!isOpen) return null;

    const mergeData = async () => {
        try {
            if (!selectedCommitId) {
                onErrorOpen("선택한 커밋이 없습니다.")
                return
            }
            const response = await fetch(`http://localhost:8080/api/merge/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    targetCommitId: selectedCommitId,
                    projectId: selectedProjectId,
                    crashTargetList: [],
                    crashCheckList: []
                }),
            });
            const responseData = await response.json();

            if (responseData.number === 1) {
                console.log('병합 성공:', responseData);
                onSuccessOpen() // 성공 모달창 열기
            } else if(responseData.number === 0) {
                console.log('병합 실패:', responseData);
                onErrorOpen("같은 커밋끼리 병합할 수 없습니다.") // 실패 모달창 열기
            } else {
                console.log('응답 데이터가 JSON입니다:', responseData);
                await onCrashOpen(responseData) // 충돌 모달창 열기
            }
        } catch (error) {
            console.error('Error fetching data:', error.message);
        }
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                    <div className={styles.commentBox}>
                        <p className={styles.madalCommet}>선택된 커밋의 변경사항을</p>
                        <p className={styles.madalCommet}>현재 분기와 병합하시겠습니까?</p>
                    </div>
                {/*버튼 footer*/}
                <div className={styles.modalBtnBox}>
                    <button onClick={mergeData} className={styles.modalConfirmBtn}> merge </button>
                    <button onClick={onClose} className={styles.modalCloseBtn}> 취소 </button>
                </div>
            </div>
        </div>
    );
};

export default MergeGuidePopupUI;
