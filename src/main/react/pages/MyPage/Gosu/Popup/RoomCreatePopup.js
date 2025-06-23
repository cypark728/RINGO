import React, {useState} from 'react';
import './RoomCreatePopup.css';

function RoomCreatePopup({onClose, onClassCreate}) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);

    // 방 비밀번호 만들기 ~~~ Vv
    const [usePassword, setUsePassword] = useState(false);
    const [password, setPassword] = useState('');


    const handleSubmit = async () => {
        if (isNaN(parseFloat(price)) || parseFloat(price) > 99999999.99) {
            alert("가격은 99999999.99 이하의 숫자여야 합니다.");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("price", parseFloat(price));
        formData.append("password", usePassword ? password : "");

        if (image) {
            formData.append("image", image);
        }

        try {
            const res = await fetch('/api/classes', {
                method: 'POST',
                body: formData // 헤더 설정 없이 FormData 그대로 보냄
            });

            if (res.ok) {
                const roomId = await res.text();
                const newClass = {
                    roomId,
                    title,
                    description,
                    price: parseFloat(price),
                    imageUrl: image ? URL.createObjectURL(image) : '/img/screen1.jpg',
                    password: usePassword ? password : null
                };

                onClassCreate(newClass);  // 프론트 상태 업데이트
                onClose();
            } else {
                alert("수업 생성 실패");
            }
        } catch (err) {
            console.error("요청 중 오류 발생:", err);
        }
    };



    return (
        <div className="ai-popup-overlay">
            <div className="ai-popup">
                <h3>방 만들기</h3>

                <label>방 제목</label>
                <input type="text" className="popup-input" value={title} onChange={e => setTitle(e.target.value)}
                       placeholder="방 제목을 입력하세요"/>

                <label>설명</label>
                <textarea className="popup-textarea" value={description} onChange={e => setDescription(e.target.value)}
                          placeholder="방에 대한 설명을 입력하세요" rows="4"></textarea>

                <label>가격</label>
                <input type="number" className="popup-input" value={price} onChange={e => setPrice(e.target.value)}
                       placeholder="가격을 입력하세요"/>

                <label>이미지</label>
                <input type="file" className="popup-input" accept="image/*"
                       onChange={e => setImage(e.target.files[0])}/>

                <label>비밀번호 설정</label>
                <div style={{display:"flex", gap:"30px"}}>
                    <label>
                        <input
                            type="radio"
                            name="passwordOption"
                            value="no"
                            checked={!usePassword}
                            onChange={() => {
                                setUsePassword(false);
                                setPassword('');
                            }}
                        /> 없음
                    </label>
                    <label style={{ marginLeft: '10px' }}>
                        <input
                            type="radio"
                            name="passwordOption"
                            value="yes"
                            checked={usePassword}
                            onChange={() => setUsePassword(true)}
                        /> 있음
                    </label>
                </div>

                {usePassword && (
                    <input
                        type="password"
                        className="popup-input"
                        placeholder="비밀번호를 입력하세요"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                )}


                <div className="okBtn">
                    <button onClick={handleSubmit}>확인</button>
                </div>
            </div>
        </div>
    );
}

export default RoomCreatePopup;
