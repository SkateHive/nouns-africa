import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Nouns DAO Africa - Building Public Goods Across Africa',
    template: '%s | Nouns DAO Africa'
  },
  description:
    'Nouns DAO Africa builds a bridge from Nouns into Africa, providing a place where builders from different backgrounds and cultures work together to create and promote public goods in Africa. Funded by daily NFT auctions on Base.',
  keywords: [
    'Nouns DAO Africa',
    'NDAfrica',
    'Nounish',
    'Africa DAO',
    'public goods',
    'Base network',
    'NFT auctions',
    'governance',
    'African builders',
    'decentralized organization'
  ],
  metadataBase: new URL('https://www.nounsdaoafrica.wtf'),
  alternates: {
    canonical: 'https://www.nounsdaoafrica.wtf/'
  },
  authors: [{ name: 'Nouns DAO Africa Core Team', url: 'https://www.nounsdaoafrica.wtf' }],
  creator: 'Nouns DAO Africa',
  publisher: 'Nouns DAO Africa',
  category: 'social',
  robots: {
    index: true,
    follow: true,
    nocache: false
  },
  openGraph: {
    type: 'website',
    url: 'https://www.nounsdaoafrica.wtf',
    title: 'Nouns DAO Africa – Building Public Goods Across Africa',
    description:
      'A bridge from Nouns into Africa, where builders from different backgrounds and cultures work together to create and promote public goods. Funded by daily NFT auctions on Base.',
    siteName: 'Nouns DAO Africa',
    locale: 'en_US',
    images: [
      {
        url: '/images/nounsdao-africa-og.png',
        width: 1200,
        height: 630,
        alt: 'Nouns DAO Africa – Public Goods for Africa'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    site: '@nounsDAOAfrica',
    creator: '@nounsDAOAfrica',
    title: 'Nouns DAO Africa – Public Goods for Africa',
    description:
      'Building a bridge from Nouns into Africa. Builders from different cultures working together to create public goods. Daily NFT auctions on Base.',
    images: ['/images/nounsdao-africa-og.png']
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png'
  }
};
