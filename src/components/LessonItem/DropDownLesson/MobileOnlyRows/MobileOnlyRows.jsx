import {useCookies} from "react-cookie";
import styles from "../DropDownLesson.module.css";
import React from "react";

const MobileOnlyRows = ({isMobile, item}) => {
    if (!isMobile) {
        return null;
    }

    const [cookies] = useCookies(['outageGroup'])

    return (
        <>
            <tr className={[styles.reallyBordered, styles.leader].join(' ')}>
                <td className="fw-bold">Час навчання</td>
                <td>{item.timePeriod}</td>
            </tr>
            {
                (cookies.outageGroup)
                    ? (
                        <tr className={styles.reallyBordered}>
                            <td className="fw-bold">Світло</td>
                            <td>
                                {
                                    item.outages?.map((outage, index) =>
                                        <span key={index}>
                                                    <b>{outage.start.slice(0, 5)}-{outage.end.slice(0, 5)}</b> {(outage.isDefinite ? "Не буде" : "Можливе")}<br/>
                                                  </span>
                                    )}
                            </td>
                        </tr>
                    ) : null
            }

            <tr className={styles.reallyBordered}>
                <td className="fw-bold">Дисципліна</td>
                <td>{item.discipline}</td>
            </tr>
            <tr className={styles.reallyBordered}>
                <td className="fw-bold">Тип заняття</td>
                <td>{item.studyType}</td>
            </tr>
            <tr className={styles.reallyBordered}>
                <td className="fw-bold">Аудиторія</td>
                <td>{item.cabinet}</td>
            </tr>
            <tr className={styles.reallyBordered}>
                <td className="fw-bold">Викладач</td>
                <td>{item.teacher}</td>
            </tr>
        </>
    );
};

export default MobileOnlyRows;