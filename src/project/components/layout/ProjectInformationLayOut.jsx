import styles from "../styles.module.css";
import ProjectViewCardUI from "../uI/ProjectViewCardUI";
import {Image} from "react-bootstrap";
import {useEffect} from "react";
import {Link} from "react-router-dom";
import ViewCardIcon from "../uI/ViewCardIcon";
import ViewCardTitle from "../uI/ViewCardTitle";

export default function ProjectInformationLayOut({project}) {

    return(
        <>
            <div className={styles.InformationInput}>
                {/*상단*/}
                <ViewCardTitle link={`/history`} title={"히스토리 접속하기"}/>
                {/*아이콘*/}
                <ViewCardIcon src={"../image/Information.png"} />
                {/*내용*/}
                <div className={styles.ProjectViewCard}>
                    <div className={styles.projectInformationBox}>
                        <label className={styles.ProjectViewCardLabel}>
                            <span className={styles.ProjectViewCardSpan}>만든 사람</span>
                            <input type="text" readOnly value={project.createProfileName} className={styles.ProjectViewCardInput}/>
                        </label> <br/>
                        <label className={styles.ProjectViewCardLabel}>
                            <span className={styles.ProjectViewCardSpan}>설 명</span>
                            <textarea type="text" readOnly value={project.comment} className={styles.ProjectViewCardInput}/>
                        </label><br/>
                        <label className={styles.ProjectViewCardLabel}>
                            <span className={styles.ProjectViewCardSpan}>생성 날짜</span>
                            <input type="text" readOnly value={project.createTime ? String(project.createTime).slice(0, 10) : ''} className={styles.ProjectViewCardInput}/>
                        </label>
                    </div>
                </div>
            </div>
        </>
    )
}