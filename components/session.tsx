"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import styles from "./session.module.scss";

export function Session(props: {
  onClick?: () => void;
  onDelete?: () => void;
  title: string;
  info?: string;
  time: string;
  selected: boolean;
}) {
  return (
    <div
      className={`${styles["chat-item"]} ${
        props.selected && styles["chat-item-selected"]
      } bg-white shadow`}
      onClick={props.onClick}
    >
      <div className={styles["chat-item-title"]}>{props.title}</div>
      <div className={styles["chat-item-info"]}>
        <div className={styles["chat-item-count"]}>{props.info}</div>
        <div className={styles["chat-item-date"]}>{props.time}</div>
      </div>
      <div className={styles["chat-item-delete"]} onClick={props.onDelete}>
        {/* <DeleteIcon /> */}
        <span>delete</span>
      </div>
    </div>
  );
}

export function SessionList() {
  // const [sessions, selectedIndex, selectSession, removeSession] = useChatStore(
  //   (state) => [
  //     state.sessions,
  //     state.currentSessionIndex,
  //     state.selectSession,
  //     state.removeSession,
  //   ],
  // );

  const [selected, setSelected] = useState(0);

  const [sessions, setSessions] = useState([
    {
      topic: "this is a test",
      lastUpdate: new Date().toISOString().substring(0, 10),
    },
    {
      topic: "another test",
      lastUpdate: new Date().toISOString().substring(0, 10),
    },
  ]);

  return (
    <div className={"p-4 flex-1 flex flex-col bg-[#9dd9d260]"}>
      <div className={"flex-1 overflow-auto"}>
        {sessions.map((item, i) => (
          <Session
            title={item.topic}
            time={item.lastUpdate}
            // count={item.messages.length}
            key={i}
            selected={i === selected}
            onClick={() => setSelected(i)}
            onDelete={() =>
              setSessions([...sessions.filter((s, si) => si !== i)])
            }
          />
        ))}
      </div>

      <div className={"flex justify-between pt-5"}>
        <Button
          // icon={<SettingsIcon />}
          text="setting"
          onClick={() => {}}
        />
        <Button
          // icon={<AddIcon />}
          text={"new chat"}
          onClick={() => {
            setSessions([
              ...sessions,
              {
                topic: "new session",
                lastUpdate: new Date().toISOString().substring(0, 10),
              },
            ]);
            // createNewSession();
            // setShowSideBar(false);
          }}
        />
      </div>
    </div>
  );
}
