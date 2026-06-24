'use client'

import SidePage from '../../components/SidePage'

const TRANSLATIONS = {
  en: {
    back: '← Back',
    lang: 'ML',
    invitation_prefix: 'With the blessings of Allah ﷻ',
    invitation_body: 'We joyfully invite you to celebrate the',
    event_name: 'Wedding Reception',
    groom_name: 'Fahad P N',
    bride_name: 'Nadha Shirin K N',
    quran_en:
      'And of His signs is that He created for you from yourselves mates that you may find tranquility in them; and He placed between you affection and mercy. Indeed in that are signs for a people who give thought.',
    quran_ref: 'Surah Ar-Rum · 30:21',
    date_label: 'Date',
    date_val: '26th July 2026',
    time_label: 'Time',
    time_val: '7:00 PM – 10:00 PM',
    venue_label: 'Venue',
    venue_val: 'SB Convention Center',
    map_btn: 'View on Google Maps',
    side_label: "Groom's Side · وليمة",
    countdown_label: 'Until the Reception',
    days: 'Days', hours: 'Hours', minutes: 'Minutes', seconds: 'Seconds',
    dua_arabic: 'بَارَكَ اللهُ لَكَ وَبَارَكَ عَلَيْكَ وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ',
    dua_en:
      'May Allah bless you and shower His blessings upon you, and may He unite you both in goodness.',
    footer: 'May Allah fill your home with love, laughter, and His boundless mercy.',
  },
  ml: {
    back: '← മടങ്ങുക',
    lang: 'EN',
    invitation_prefix: 'അല്ലാഹുവിന്റെ ﷻ അനുഗ്രഹത്തോടെ',
    invitation_body: 'ഞങ്ങൾ സന്തോഷത്തോടെ നിങ്ങളെ ക്ഷണിക്കുന്നു',
    event_name: 'വിവാഹ റിസപ്ഷൻ',
    groom_name: 'Fahad P N',
    bride_name: 'Nadha Shirin K N',
    quran_en:
      'അവന്റെ ദൃഷ്ടാന്തങ്ങളിൽ പെട്ടതത്രേ, നിങ്ങൾ അവരോടൊത്ത് ശാന്തി കണ്ടെത്തുന്നതിന് നിങ്ങളിൽ നിന്ന് തന്നെ ഇണകളെ അവൻ സൃഷ്ടിച്ചതും, നിങ്ങൾക്കിടയിൽ സ്നേഹവും കരുണയും ഉണ്ടാക്കിയതും. ചിന്തിക്കുന്ന ജനങ്ങൾക്ക് ഇതിൽ ദൃഷ്ടാന്തങ്ങൾ ഉണ്ട്.',
    quran_ref: 'സൂറഃ അർ-റൂം · 30:21',
    date_label: 'തീയതി',
    date_val: '2026 ജൂലൈ 26',
    time_label: 'സമയം',
    time_val: 'വൈകിട്ട് 7:00 – 10:00',
    venue_label: 'വേദി',
    venue_val: 'എസ്ബി കൺവൻഷൻ സെന്റർ',
    map_btn: 'ഗൂഗിൾ മാപ്പിൽ കാണുക',
    side_label: "വരൻ ഭാഗം · وليمة",
    countdown_label: 'റിസപ്ഷൻ വരെ',
    days: 'ദിവസം', hours: 'മണിക്കൂർ', minutes: 'മിനിറ്റ്', seconds: 'സെക്കൻഡ്',
    dua_arabic: 'بَارَكَ اللهُ لَكَ وَبَارَكَ عَلَيْكَ وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ',
    dua_en:
      'അല്ലാഹു നിങ്ങളെ അനുഗ്രഹിക്കട്ടെ, നിങ്ങൾക്ക് അനുഗ്രഹം ചൊരിയട്ടെ, ഇരുവരെയും നന്മയിൽ ഒന്നിപ്പിക്കട്ടെ.',
    footer: 'അല്ലാഹു ഈ ഭവനം സ്നേഹം, ആനന്ദം, അനന്തമായ കരുണ കൊണ്ട് നിറക്കട്ടെ.',
  },
}

const MAPS_URL = 'https://maps.google.com/?q=10.265722812145379,76.15753406102841'
const RECEPTION_DATE = '2026-07-26T19:00:00+05:30'

export default function GroomPage() {
  return <SidePage side="groom" T={TRANSLATIONS} mapsUrl={MAPS_URL} targetDate={RECEPTION_DATE} />
}
