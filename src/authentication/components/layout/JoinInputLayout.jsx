import InputBoxUI from "../uI/InputBoxUI";
import {useState} from "react";
import styles from '../styleModule/joinStyles.module.css'
import ErrorModal from "../../../project/components/layout/ErrorModalLayOut";
import SuccessModalLayout from "../../../project/components/layout/SuccessModalLayout";

export default function JoinInputLayout(){
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isErrorModalOpen , setIsErrorModalOpen] = useState(false);
    const [errorMessage , setErrorMessage] = useState("");
    const [isSuccessModalOpen , setIsSuccessModalOpen] = useState(false);
    const [successMessage , setSuccessMessage] = useState("");

    function checkPassword() {
        return password === confirmPassword;
    }

    const handleSubmit = async (e) => {
        e.preventDefault(); // preventDefault를 호출하여 폼 제출 기본 동작을 막음

        if (checkPassword()){
            // 회원가입 데이터를 JSON 형식으로 만듦
            const userData = {
                name: name,
                phoneNumber: phoneNumber,
                email: email,
                password: password
            };

            try {
                const apiUrl = process.env.REACT_APP_API_URL;
                // fetch를 사용하여 POST 요청을 보냄
                const response = await fetch(`${apiUrl}/api/auth/join`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(userData)
                });

                if (response.ok) {
                    const responseData = await response.json();
                    console.log('회원가입 성공:', responseData);
                    setIsSuccessModalOpen(true);
                    setSuccessMessage("회원가입에 성공하셨습니다");
                    // 성공적으로 가입되면 다음 페이지로 이동하거나 로직을 처리할 수 있음
                } else {
                    // 오류 응답 처리
                    const errorData = await response.json();
                    console.error('회원가입 실패:', errorData);
                    setErrorMessage(errorData.message);
                    setIsErrorModalOpen(true);
                }
            } catch (error) {
                console.error('회원가입 실패:', error);
                setErrorMessage(error.message);
                setIsErrorModalOpen(true);
            }
        } else {
            setErrorMessage("비밀번호가 일치하지 않습니다.");
            setIsErrorModalOpen(true);
        }
    };

    return(
        <div>
            <div className={styles.joinContainer} onKeyPress={(e) => { if (e.key === "Enter") handleSubmit(e); }}>
                <h1 className={styles.joinTitle}>회원 가입</h1>
                <InputBoxUI label={"이름"} onChange={setName} value={name} type={"text"}/>
                <InputBoxUI label={"전화번호"} onChange={setPhoneNumber} value={phoneNumber} type={"text"}/>
                <InputBoxUI label={"이메일"} onChange={setEmail} value={email} type={"text"}/>
                <InputBoxUI label={"비밀번호"} onChange={setPassword} value={password} type={"password"}/>
                <InputBoxUI label={"비밀번호 확인"} onChange={setConfirmPassword} value={confirmPassword} type={"password"}/>
                <button onClick={handleSubmit} className={styles.joinBtn} type="submit">가입하기</button>
            </div>
            <ErrorModal
                error={errorMessage}
                isOpen={isErrorModalOpen}
                onClose={() => setIsErrorModalOpen(false)}
            />
            <SuccessModalLayout
                isOpen={isSuccessModalOpen}
                onClose={() => setIsSuccessModalOpen(false)}
                data={successMessage}
                clickLink={'/auth/login'}
            />
        </div>
    )
}
