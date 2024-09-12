import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaypal } from '@fortawesome/free-brands-svg-icons'
import { faCoffee, faHeart } from '@fortawesome/free-solid-svg-icons'

import siteConfig from '../../config/site.config'
import { useTranslation } from 'next-i18next'

const iconMapping: { [key: string]: any } = {
  buymeacoffee: faCoffee,
  'ko-fi': faHeart,
  paypal: faPaypal,
}

export const TopBanner = () => {
  const { t } = useTranslation()
  return (
    <div className="mb-4 justify-between rounded-lg border-b border-gray-900/10 bg-white bg-opacity-80 bg-gradient-to-r p-4 text-black backdrop-blur-md md:flex dark:border-gray-500/30  dark:bg-gray-900 dark:text-white">
      <div>{t("If you like this project, consider supporting it by buying me a coffee!")}</div>
      <div className="flex items-center justify-around space-x-4 pt-4 md:py-0">
        <span className="hidden text-sm font-medium sm:block md:inline-block">{t('Donate')}</span>
        {siteConfig.donationSettings.donationLinks.length !== 0 &&
          siteConfig.donationSettings.donationLinks.map((l: { name: string; link: string }) => {
            const iconName = l.name.toLowerCase()
            const icon = iconMapping[iconName] ?? ['fab', iconName]
            return (
              <a
                key={l.name}
                href={l.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2  hover:opacity-80"
              >
                <FontAwesomeIcon icon={icon} />
              </a>
            )
          })}
      </div>
    </div>
  )
}
