import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faFacebookF, faXTwitter, faYoutube, faInstagram} from '@fortawesome/free-brands-svg-icons';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false

const address = "เลขที่ 2 ชั้น 3 อาคารเพลินจิตเซ็นเตอร์ \nถนนสุขุมวิท แขวงคลองเตย \nเขตคลองเตย กรุงเทพฯ 10110";
const tel = "00 000 0000";
const email = "mitrcareer@mitrphol.com";

interface item {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  href: string|null;
  items: item[];
}

interface NavItemDict {
  [key: string]: NavItem;
}

const navItemDict: NavItemDict = {
  "Home": {
    'label' : "Home",
    'href': '/',
    'items': [
      { label: "Home", href: "/" },
    ]
  },
  "About Us": {
    'label' : "About Us",
    'href': '/about-us',
    'items': [
      { label: "What we do", href: "/about-us#what-we-do" },
      { label: "Vision", href: "/about-us#vision" },
      { label: "Philosophy", href: "/about-us#philosophy" },
      { label: "Culture", href: "/about-us#culture" },
      { label: "Award", href: "/about-us#award" },
    ],
  },
  "Why Join?": {
    'label' : "Why Join?",
    'href': '/why-join',
    'items': [
      { label: "Life @ Mitrphol", href: "/why-join#life@mitrphol" },
      { label: "Career Growth", href: "/why-join#career-growth" },
      { label: "Benefits", href: "/why-join#benefit" },
    ],
  },
  "Job" : {
    'label' : "Job",
    'href': '/job',
    'items': [
      { label: "Job Opening", href: "/job#job-opening" },
      { label: "How To Apply", href: "/job#how-to-apply" },
    ]
  }
}

const navItems = ["Home", "About Us", "Why Join?", "Job"]

const Footer = () => {
  
  return (
    <div className='relative bottom-0 h-[70dvh] w-[100%] bg-(--footer-blue) p-10 pr-15 flex flex-col justify-between'>
      <div className='flex flex-row justify-between relative'>
        <div className='flex flex-col'>
          <Image
            src={"/logoWhite.png"}
            alt="logo"
            width={120}
            height={0}
            objectFit="contain"
            className="relative"
          />
          <p className='text-white whitespace-pre-line mt-5 font-(family-name:--font-thai)'>{address}</p>
          <p className='text-white whitespace-pre-line mt-2 font-(family-name:--font-thai)'>{tel}</p>
          <p className='text-white whitespace-pre-line mt-2 font-(family-name:--font-thai)'>{email}</p>
        </div>
        <div className='flex w-fit'>
          { navItems.map((item)=> (
            <div className='flex flex-col ml-10 mt-10 w-35' key={`footer-${item}`}>
              <Link href={navItemDict[item].href??"/"} className='text-white pl-2 font-(family-name:--font-thai)'>{navItemDict[item].label}</Link>
              <hr className='border-white my-4'></hr>
              <ul className='list-inside'>
                {navItemDict[item].items.map((subitem) => (
                  <li key={subitem.label} className='mb-2'>
                    <Link href={subitem.href} className='text-white pl-2 '>{subitem.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className='flex flex-row justify-between relative'>
        <p className='text-white font-(family-name:--font-thai)'>© 2023 Mitrphol Group. All rights reserved.</p>
        <div className='flex flex-row h-fit gap-4 absolute w-full justify-center'>
          <Link href="/">
            <FontAwesomeIcon icon={faLinkedin} className='text-white' />
          </Link>
          <Link href="/">
            <FontAwesomeIcon icon={faFacebookF} className='text-white' />
          </Link>
          <Link href="/">
            <FontAwesomeIcon icon={faXTwitter} className='text-white' />
          </Link>
          <Link href="/">
            <FontAwesomeIcon icon={faYoutube} className='text-white' />
          </Link>
          <Link href="/">
            <FontAwesomeIcon icon={faInstagram} className='text-white' />
          </Link>
        </div>
        <Link href="/terms" className='text-white font-(family-name:--font-thai)'>Privacy & Terms</Link>
      </div>
    </div>
  )
}

export default Footer