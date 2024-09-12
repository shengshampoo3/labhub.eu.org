'use client'
import siteConfig from '../../config/site.config'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useLocalStorage from '../utils/useLocalStorage'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Image from 'next/image'

export const Notification = () => {
  const initialShow = {
    show: true,
    expires: 0,
  }
  const [showInfo, setShowInfo] = useLocalStorage('showNotification', initialShow)
  const [isClient, setIsClient] = useState(false)
  // Ensure this component is only rendered on the client side
  useEffect(() => {
    setIsClient(true) // This will trigger the component to re-render on the client
  }, [])

  // Check if the notification should be reset
  useEffect(() => {
    if (Date.now() > showInfo.expires && !showInfo.show) {
      setShowInfo({ show: true, expires: 0 }) // Reset showInfo if the expiration has passed
    }
  }, [showInfo, setShowInfo])

  const hideFor = 1000 * 60 * 60 * 24 // 24 hours

  // Check if the notification should be reset
  if (Date.now() > showInfo.expires && !showInfo.show) {
    setShowInfo({ show: true, expires: 0 }) // Reset showInfo if the expiration has passed
  }

  const closeNotification = () => {
    setShowInfo({ show: false, expires: Date.now() + hideFor })
  }

  const { t } = useTranslation()

  // Render notification only on the client and if it should be visible
  if (!isClient || !siteConfig.notification.show || !showInfo.show) {
    return null // Render nothing during SSR or when notification is hidden
  }

  // Render notification only if it should be visible
  return siteConfig.notification.show && showInfo.show ? (
    <div
      className={`fixed bottom-0 right-0 z-50 mb-2 mr-2 min-w-[200px] max-w-sm transform rounded-lg border border-gray-300 bg-white bg-opacity-80 bg-gradient-to-r
      p-4 text-black shadow-md transition-transform duration-500 ease-in-out dark:border-gray-700 dark:bg-gray-900 dark:bg-opacity-80 dark:text-white dark:shadow-lg
    `}
    >
      <div className="flex items-center justify-between">
        <button
          className="mr-4 flex aspect-square h-full cursor-pointer items-center justify-center rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
          onClick={() => closeNotification()}
        >
          <FontAwesomeIcon icon={faClose} className="aspect-square text-lg text-black dark:text-white" />
        </button>
        <div className="flex-1">
          <strong>{t('Welcome to LabHub!')}</strong>
          <br />
          {t('Join our Telegram Channel for updates and discussions.')}
          <br />
          <a
            href="https://t.me/NetLabHub"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex items-center space-x-2 hover:opacity-80"
          >
            <Image
              width={150}
              height={150}
              src="https://img.shields.io/badge/Join-Channel-blue?style=for-the-badge&logo=telegram"
              alt="Join Telegram"
            />
          </a>
        </div>
      </div>
    </div>
  ) : (
    <></>
  )
}
