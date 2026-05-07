import Hero from '@/components/landing/Hero'
import HowItWorks from '@/components/landing/HowItWorks'
import ProfessionPreview from '@/components/landing/ProfessionPreview'
import Testimonials from '@/components/landing/Testimonials'
import ForSchools from '@/components/landing/ForSchools'
import FinalCTA from '@/components/landing/FinalCTA'
import Footer from '@/components/landing/Footer'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'КемСтать',
  url: 'https://kemstat.ru',
  description: 'Платформа профориентации для школьников 13–17 лет на основе теста RIASEC и AI-анализа',
  applicationCategory: 'EducationalApplication',
  inLanguage: 'ru',
  audience: {
    '@type': 'EducationalAudience',
    educationalRole: 'student',
  },
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'RUB',
  },
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        <Hero />
        <HowItWorks />
        <ProfessionPreview />
        <Testimonials />
        <ForSchools />
        <FinalCTA />
        <Footer />
      </main>
    </>
  )
}
