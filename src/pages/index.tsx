import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import siteConfig from '../../config/site.config'
import Navbar from '../components/Navbar'
import FileListing from '../components/FileListing'
import Footer from '../components/Footer'
import Breadcrumb from '../components/Breadcrumb'
import SwitchLayout from '../components/SwitchLayout'
import { getBaseUrl } from '../utils/getBaseUrl'
import { useState, useEffect } from 'react'

export default function Home() {
  const [showPopup, setShowPopup] = useState(false)

  useEffect(() => {
    if (getBaseUrl().includes('unetlab.cloud')) {
      setShowPopup(true)
      let count = 5
      const countdown = setInterval(() => {
        count--
        const element = document.getElementById('countdown')
        if (element !== null) {
          element.innerHTML = count.toString()
        }
        if (count === 0) {
          clearInterval(countdown)
          window.location.href = 'https://labhub.eu.org'
        }
      }, 1000)
    }
  }, [])
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-gray-900">
      <Head>
        <title>{siteConfig.title}</title>
      </Head>

      <main className="flex w-full flex-1 flex-col bg-gray-50 dark:bg-gray-800">
        <Navbar />
        <div className="mx-auto w-full max-w-5xl py-4 sm:p-4">
          <nav className="mb-4 flex items-center justify-between px-4 sm:px-0 sm:pl-1">
            <Breadcrumb />
            <SwitchLayout />
          </nav>
          <FileListing />
        </div>
      </main>

      <Footer />
      {showPopup && (
        <div className="fixed top-0 left-0 flex h-full w-full items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="rounded-md bg-white p-8">
            <h1 className="text-2xl font-bold text-gray-800">We changed our domain name</h1>
            <p className="text-gray-800">labhub.eu.org is now the official domain name for LabHub.</p>
            <p className="text-gray-800">
              You will be redirected to labhub.eu.org in <span id="countdown">5</span> seconds...
            </p>
            <button
              className="mt-4 rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
              onClick={() => (window.location.href = 'https://labhub.eu.org')}
            >
              Redirect Now
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}
