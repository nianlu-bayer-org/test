'use client'

import { useState, useRef, useEffect, useLayoutEffect } from 'react'

import { Button } from './ui/button'
import styles from './chatbox.module.scss'
import { Markdown } from './markdown'

export function Chat(props: {
  showSideBar?: () => void
  sideBarShowing?: boolean
}) {
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const [userInput, setUserInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  // const { submitKey, shouldSubmit } = useSubmitHandler();

  const messages = [
    {
      role: 'system',
      content: 'contentherererererererererere',
      date: new Date(),
    },
    {
      role: 'user',
      content: 'contentherererererererererere',
      date: new Date(),
    },
    {
      role: 'assisstant',
      content: 'contentherererererererererere',
      date: new Date(),
    },
  ]

  const scrollInput = () => {
    const dom = inputRef.current
    if (!dom) return
    const paddingBottomNum: number = parseInt(
      window.getComputedStyle(dom).paddingBottom,
      10
    )
    dom.scrollTop = dom.scrollHeight - dom.offsetHeight + paddingBottomNum
  }

  // only search prompts when user input is short
  const SEARCH_TEXT_LIMIT = 30
  const onInput = (text: string) => {
    scrollInput()
    setUserInput(text)
    const n = text.trim().length
  }

  // submit user input
  const onUserSubmit = () => {
    if (userInput.length <= 0) return
    setIsLoading(true)
    // chatStore.onUserInput(userInput).then(() => setIsLoading(false));
    setUserInput('')
    // setPromptHints([]);
    inputRef.current?.focus()
  }

  // stop response
  const onUserStop = (messageIndex: number) => {
    // console.log(ControllerPool, sessionIndex, messageIndex);
    // ControllerPool.stop(sessionIndex, messageIndex);
  }

  // check if should send message
  const onInputKeyDown = (e: KeyboardEvent) => {
    // if (shouldSubmit(e)) {
    //   onUserSubmit();
    //   e.preventDefault();
    // }
  }
  // const onRightClick = (e: any, message: Message) => {
  //   // auto fill user input
  //   if (message.role === "user") {
  //     setUserInput(message.content);
  //   }

  //   // copy to clipboard
  //   if (selectOrCopy(e.currentTarget, message.content)) {
  //     e.preventDefault();
  //   }
  // };

  const onResend = (botIndex: number) => {
    // find last user input message and resend
    for (let i = botIndex; i >= 0; i -= 1) {
      if (messages[i].role === 'user') {
        setIsLoading(true)
        // chatStore
        //   .onUserInput(messages[i].content)
        //   .then(() => setIsLoading(false));
        inputRef.current?.focus()
        return
      }
    }
  }

  // for auto-scroll
  const latestMessageRef = useRef<HTMLDivElement>(null)
  const [autoScroll, setAutoScroll] = useState(true)

  // auto scroll
  useLayoutEffect(() => {
    setTimeout(() => {
      const dom = latestMessageRef.current
      const inputDom = inputRef.current

      // only scroll when input overlaped message body
      let shouldScroll = true
      if (dom && inputDom) {
        const domRect = dom.getBoundingClientRect()
        const inputRect = inputDom.getBoundingClientRect()
        shouldScroll = domRect.top > inputRect.top
      }

      if (dom && autoScroll && shouldScroll) {
        dom.scrollIntoView({
          block: 'end',
        })
      }
    }, 500)
  })

  return (
    // <div className={styles.chat} key={session.id}>
    // <div className={styles.chat}>
    <div className="flex flex-col h-full">
      <div className={styles['window-header']}>
        <div
          className={styles['window-header-title']}
          onClick={props?.showSideBar}
        >
          <div
            className={`${styles['window-header-main-title']} ${styles['chat-body-title']}`}
            onClick={() => {
              // const newTopic = prompt(Locale.Chat.Rename, session.topic);
              // if (newTopic && newTopic !== session.topic) {
              //   chatStore.updateCurrentSession(
              //     (session) => (session.topic = newTopic!),
              //   );
              // }
            }}
          >
            {/* {session.topic} */}
            {'session topic'}
          </div>
          <div className={styles['window-header-sub-title']}>
            {/* {Locale.Chat.SubTitle(session.messages.length)} */}
            {'session message '}
          </div>
        </div>
        <div className={styles['window-actions']}>
          <div className={styles['window-action-button'] + ' ' + styles.mobile}>
            <Button
              // icon={<MenuIcon />}
              bordered
              // title={Locale.Chat.Actions.ChatList}
              title={'chatlist'}
              onClick={props?.showSideBar}
            />
          </div>
          <div className={styles['window-action-button']}>
            <Button
              // icon={<BrainIcon />}
              bordered
              // title={Locale.Chat.Actions.CompressedHistory}
              title={'prompt history'}
              onClick={() => {
                // showMemoryPrompt(session);
              }}
            />
          </div>
          <div className={styles['window-action-button']}>
            <Button
              // icon={<ExportIcon />}
              bordered
              // title={Locale.Chat.Actions.Export}
              title="export"
              onClick={() => {
                // exportMessages(session.messages, session.topic);
              }}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col grow gap-2 p-4">
        {messages.map((message, i) => {
          const isUser = message.role === 'user'

          return (
            <div key={i} className="flex gap-2 group">
              <div className="mt-1 cursor-default">
                <span className={'rounded-md p-1 border box-border'}>
                  {message.role.substring(0, 3)}
                </span>
              </div>
              <div
                className={
                  styles['chat-message-item'] +
                  ` grow ${isUser ? 'bg-primary-100' : 'bg-gray-100'}`
                }
              >
                <div className="flex">
                  <div className="flex gap-2 ml-auto text-xs">
                    {!isUser && (
                      <div
                        className={
                          'opacity-0 group-hover:opacity-80 hover:cursor-pointer transition'
                        }
                        onClick={() => onResend(i)}
                      >
                        retry
                      </div>
                    )}
                    <div
                      className={
                        'opacity-0 group-hover:opacity-80 hover:cursor-pointer transition mr-4'
                      }
                      onClick={() => copyToClipboard(message.content)}
                    >
                      copy
                    </div>
                    <div className="text-gray-400">
                      {message.date.toLocaleString()}
                    </div>
                  </div>
                </div>
                {(message.preview || message.content.length === 0) &&
                !isUser ? (
                  // <LoadingIcon />
                  <span>loding</span>
                ) : (
                  <div
                    className="markdown-body"
                    onContextMenu={(e) => onRightClick(e, message)}
                    onDoubleClickCapture={() => setUserInput(message.content)}
                  >
                    <Markdown content={message.content} />
                    {/* <p>{message.content}</p> */}
                  </div>
                )}
              </div>
            </div>
          )
        })}
        <div ref={latestMessageRef} style={{ opacity: 0, height: '4em' }}>
          -
        </div>
      </div>

      <div className="flex p-4">
        {/* <PromptHints prompts={promptHints} onPromptSelect={onPromptSelect} /> */}
        <div className={styles['chat-input-panel-inner'] + ' relative'}>
          <textarea
            ref={inputRef}
            className={
              'w-full pl-2 pt-2 pr-4 pb-6 shadow-sm border rounded-md resize-none border-gray-300 focus:outline-primary-500'
            }
            rows={4}
            onInput={(e) => onInput(e.currentTarget.value)}
            value={userInput}
            onKeyDown={(e) => onInputKeyDown(e as any)}
            onFocus={() => setAutoScroll(true)}
            onBlur={() => {
              setAutoScroll(false)
              // setTimeout(() => setPromptHints([]), 500);
            }}
            autoFocus={!props?.sideBarShowing}
          />
          <Button
            // icon={<SendWhiteIcon />}
            // text={Locale.Chat.Send}
            text="send"
            className="absolute bottom-4 right-4 bg-primary-100 border"
            onClick={onUserSubmit}
          />
        </div>
      </div>
    </div>
  )
}

const useHasHydrated = () => {
  const [hasHydrated, setHasHydrated] = useState<boolean>(false)

  useEffect(() => {
    setHasHydrated(true)
  }, [])

  return hasHydrated
}

export function ChatBox() {
  const loading = !useHasHydrated()
  const [showSideBar, setShowSideBar] = useState(true)

  if (loading) {
    // return <Loading />;
    return <span>loading</span>
  }

  return (
    <div className={'flex flex-col flex-grow'}>
      <Chat
        key="chat"
        showSideBar={() => setShowSideBar(true)}
        sideBarShowing={showSideBar}
      />
    </div>
  )
}
