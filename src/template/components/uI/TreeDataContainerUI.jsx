import styles from "../../styleModule/sidebarStyle.module.css";
import ButtonUI from "../../../project/components/uI/ButtonUI";
import {useState} from "react";

export default function TreeDataContainerUI({columnList , fetchTreeData}){
    const [checkedItems, setCheckedItems] = useState([]);
    const [toggleOff , setToggleOff] = useState(false)

    const handleCheckboxChange = (columnName) => {
        if (checkedItems.includes(columnName)) {
            setCheckedItems(prevState => prevState.filter(item => item !== columnName));
        } else {
            setCheckedItems(prevState => [...prevState, columnName]);
        }
    };

    const buttonClickAction = () => {
        fetchTreeData(checkedItems)
    };

    return(
        <div>
                <div className={toggleOff ? styles.CardControlBoxOff : styles.CardControlBox}>
                    <div className={styles.checkBox}>
                        {columnList.map((column, index) => (
                            <div key={index}>
                                <p className={styles.checkBoxTitle}>{column.name}</p>
                                <input
                                    type={"checkbox"}
                                    value={column.name}
                                    checked={checkedItems.includes(column.name)}
                                    onChange={() => handleCheckboxChange(column.name)}
                                />
                            </div>
                        ))}
                    </div>
                    <button className={styles.toggleButton} onClick={() => setToggleOff(!toggleOff)}>
                        {toggleOff ? "<<" : " >> "}
                    </button>
                <ButtonUI className={styles.button} children={"실행"} onClick={buttonClickAction}/>
            </div>
        </div>
    )
}