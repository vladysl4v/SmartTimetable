import React from 'react';
import NoteItem from "../NoteItem/NoteItem.jsx";

import styles from './DropDownLesson.module.css';
import {useCookies} from "react-cookie";

const DropDownLesson = ({item, isMobile, msalClient}) => {
    const [cookies] = useCookies(['outageGroup'])
    return (
        <tr >
            <td colSpan="20" style={{paddingTop:'0px'}}>
                <table className={["table mb-0 table-sm table-light text-center align-middle", styles.mainTable].join(' ')}>
                    <tbody className={[styles.reallyBordered, styles.leader].join(' ')}>
                    {
                        (isMobile) ? (
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
                        ) : null
                    }
                    {
                        (item.notes !== undefined)
                            ? (
                                <tr>
                                    <td className="fw-bold">Групові нотатки</td>
                                    <NoteItem item={item} msalClient={msalClient}/>
                                </tr>
                            )
                            : null
                    }
                    </tbody>
                </table>
            </td>
        </tr>
    );
};

export default DropDownLesson;