import Image from 'next/image'
import { Inter } from 'next/font/google'
import { ChatBox } from '@/components/chatbox'
import { SessionList } from '@/components/session'
import { PromptLibrary } from '@/components/prompt'

const fontInter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className={`${fontInter.className} h-screen flex flex-col`}>
      <div className={'flex flex-grow'}>
        <div className={'flex flex-col w-1/4 bg-[#9dd9d220]'}>
          <div className={'relative p-5 flex'}>
            <Image
              alt="logo"
              width="40"
              height="40"
              src="/hypatia_square.jpg"
            />
            <div className="pl-2">
              <div className={'text-xl font-bold'}>Hypatia</div>
              <div className={'text-xs font-normal'}>
                Boosting Productivity with Language AI
              </div>
            </div>
          </div>
          <SessionList />
        </div>
        <ChatBox />
        <PromptLibrary />
      </div>
    </div>
  )
}
